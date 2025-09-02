import React, { useState } from 'react';
import DifferentialTab from './DifferentialTab';
import OrderTab from './OrderTab';

const InteractionPanel = ({ state, updateState, setLoading, setLoadingText, setCaseContentParts }) => {
  const [activeTab, setActiveTab] = useState('differential');

  const tabs = [
    { id: 'differential', label: 'Differential' },
    { id: 'labs', label: 'Labs' },
    { id: 'imaging', label: 'Imaging' },
    { id: 'management', label: 'Management' }
  ];

  return (
    <div className="glass-panel p-6 flex flex-col h-[90vh]">
      <div className="flex border-b border-gray-600 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`p-3 border-b-2 ${
              activeTab === tab.id 
                ? 'text-white border-purple-500' 
                : 'text-gray-400 border-transparent'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-grow overflow-y-auto">
        {activeTab === 'differential' && (
          <DifferentialTab 
            differentialList={state.differentialList}
            updateState={updateState}
          />
        )}
        
        {(activeTab === 'labs' || activeTab === 'imaging' || activeTab === 'management') && (
          <OrderTab 
            type={activeTab}
            state={state}
            updateState={updateState}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
            setCaseContentParts={setCaseContentParts}
          />
        )}
      </div>
    </div>
  );
};

export default InteractionPanel;
