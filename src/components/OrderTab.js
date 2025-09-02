import React, { useState } from 'react';
import { callGenerativeAI } from '../services/geminiAPI';

const OrderTab = ({ type, state, updateState, setLoading, setLoadingText, setCaseContentParts }) => {
  const [orderText, setOrderText] = useState('');

  const getCommonOrders = () => {
    switch (type) {
      case 'labs':
        return ['CBC', 'CMP', 'UA', 'Troponin', 'TSH'];
      case 'imaging':
        return ['CXR', 'CT chest', 'CT AB/PEL', 'CTPA', 'MRI', 'US', 'TTE'];
      case 'management':
        return ['Medication: ', 'Procedure: ', 'Consultation: ', 'Disposition: '];
      default:
        return [];
    }
  };

  const handlePillClick = (order) => {
    setOrderText(prev => prev + (prev ? '\n' : '') + order);
  };

  const submitOrders = async () => {
    if (!orderText.trim()) return;

    setLoading(true);
    setLoadingText(`Processing ${type}...`);

    try {
      // Process orders similar to original logic
      const allSubmittedOrdersLower = orderText.split('\n').map(o => o.trim().toLowerCase()).filter(o => o);
      const previouslySubmittedLower = state.submittedOrders[type].map(o => o.toLowerCase());
      const uniqueNewOrdersLower = allSubmittedOrdersLower.filter(order => !previouslySubmittedLower.includes(order));
      const uniqueNewOrdersOriginalCase = orderText.split('\n').map(o => o.trim()).filter(o => o && uniqueNewOrdersLower.includes(o.toLowerCase()));

      if (uniqueNewOrdersOriginalCase.length === 0) {
        setOrderText('');
        return;
      }

      const caseHistory = state.caseParts.flat().filter(p => p.text).map(p => p.text).join(' ');
      const results = await callGenerativeAI(null, false, {
        type: 'orders',
        orderType: type,
        newOrders: uniqueNewOrdersOriginalCase.join('\n'),
        previousOrders: state.submittedOrders[type].join(', '),
        caseHistory
      });

      const formattedResults = `<div class="my-4 p-4 bg-gray-900/50 rounded-lg border border-teal-500">
        <h4 class="font-bold text-teal-300">Results for New ${type.charAt(0).toUpperCase() + type.slice(1)}:</h4>
        <p class="mt-2">${results.replace(/\n/g, '<br>')}</p>
      </div>`;

      // Update submitted orders
      const newSubmittedOrders = {
        ...state.submittedOrders,
        [type]: [...state.submittedOrders[type], ...uniqueNewOrdersOriginalCase]
      };
      updateState({ submittedOrders: newSubmittedOrders });

      // Add results to case content
      setCaseContentParts(prev => [...prev, [{ text: formattedResults }]]);
      
      setOrderText('');
    } catch (error) {
      console.error('Error submitting orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Common {type.charAt(0).toUpperCase() + type.slice(1)} Orders:</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {getCommonOrders().map((order, index) => (
          <span
            key={index}
            className="pill bg-gray-700/50 p-2 rounded-full text-sm"
            onClick={() => handlePillClick(order)}
          >
            {order}
          </span>
        ))}
      </div>
      <textarea
        value={orderText}
        onChange={(e) => setOrderText(e.target.value)}
        rows="8"
        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-2"
        placeholder={`Enter ${type} orders here...`}
      />
      <button
        onClick={submitOrders}
        className="glass-button w-full mt-2 py-2 px-4 rounded-lg font-semibold"
      >
        Submit {type.charAt(0).toUpperCase() + type.slice(1)} Orders
      </button>
    </div>
  );
};

export default OrderTab;
