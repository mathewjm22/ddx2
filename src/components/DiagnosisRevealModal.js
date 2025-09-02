import React, { useState, useEffect } from 'react';
import { callGenerativeAI } from '../services/geminiAPI';

const DiagnosisRevealModal = ({ show, state, setLoading, setLoadingText, onClose }) => {
  const [debriefContent, setDebriefContent] = useState('');

  useEffect(() => {
    if (show && !debriefContent) {
      generateDebrief();
    }
  }, [show]);

  const generateDebrief = async () => {
    setLoadingText('Generating Case Debrief...');
    setLoading(true);

    try {
      const caseHistory = state.caseParts.flat().filter(p => p.text).map(p => p.text).join(' ');
      const content = await callGenerativeAI(null, false, {
        type: 'debrief',
        caseHistory,
        finalDiagnosis: state.finalDiagnosis,
        userDifferential: state.differentialList,
        submittedOrders: state.submittedOrders
      });
      
      setDebriefContent(content);
    } catch (error) {
      console.error('Error generating debrief:', error);
      setDebriefContent('Error generating case debrief. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="glass-modal-content p-8 rounded-lg max-w-3xl w-full h-[90vh] flex flex-col">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Case Debrief</h2>
        <div className="flex-grow overflow-y-auto pr-2">
          <div dangerouslySetInnerHTML={{ __html: debriefContent }} />
        </div>
        <div className="flex justify-center mt-6">
          <button 
            onClick={onClose}
            className="glass-button py-2 px-8 rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisRevealModal;
