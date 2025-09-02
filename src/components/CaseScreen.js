import React, { useState, useEffect, useRef } from 'react';
import CaseContent from './CaseContent';
import InteractionPanel from './InteractionPanel';

const CaseScreen = ({ state, updateState, setLoading, setLoadingText, setShowDiagnosisModal }) => {
  const [caseContentParts, setCaseContentParts] = useState([]);

  const advanceCase = () => {
    if (state.currentPartIndex < state.caseParts.length) {
      const phaseParts = state.caseParts[state.currentPartIndex];
      setCaseContentParts(prev => [...prev, phaseParts]);
      updateState({ currentPartIndex: state.currentPartIndex + 1 });
    }
  };

  const revealDiagnosis = () => {
    setShowDiagnosisModal(true);
  };

  const isLastPart = state.currentPartIndex >= state.caseParts.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Left Panel: Case Information */}
      <div className="glass-panel p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-white">Case Presentation</h2>
        <CaseContent parts={caseContentParts} />
        {!isLastPart ? (
          <button 
            onClick={advanceCase}
            className="glass-button w-full mt-4 py-2 px-4 rounded-lg font-semibold"
          >
            Advance Case
          </button>
        ) : (
          <button 
            onClick={revealDiagnosis}
            className="glass-button bg-green-500/50 hover:bg-green-500/80 w-full mt-4 py-2 px-4 rounded-lg font-semibold"
          >
            Lock In & Reveal Diagnosis
          </button>
        )}
      </div>

      {/* Right Panel: User Interaction */}
      <div className="lg:sticky lg:top-4 self-start">
        <InteractionPanel 
          state={state}
          updateState={updateState}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
          setCaseContentParts={setCaseContentParts}
        />
      </div>
    </div>
  );
};

export default CaseScreen;
