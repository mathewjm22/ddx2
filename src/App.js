import React, { useState, useEffect } from 'react';
import DashboardScreen from './components/DashboardScreen';
import CaseScreen from './components/CaseScreen';
import ConfirmationModal from './components/ConfirmationModal';
import DiagnosisRevealModal from './components/DiagnosisRevealModal';
import LoadingSpinner from './components/LoadingSpinner';
import { specialties } from './data/specialties';
import { callGenerativeAI } from './services/geminiAPI';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  const [state, setState] = useState({
    currentSpecialty: null,
    caseParts: [],
    currentPartIndex: 0,
    differentialList: [],
    submittedOrders: {
      labs: [],
      imaging: [],
      management: [],
    },
    submittedResultsCache: {},
    finalDiagnosis: '',
  });

  const resetCaseState = () => {
    setState({
      currentSpecialty: null,
      caseParts: [],
      currentPartIndex: 0,
      differentialList: [],
      submittedOrders: { labs: [], imaging: [], management: [] },
      submittedResultsCache: {},
      finalDiagnosis: '',
    });
  };

  const handleSpecialtyClick = (specialtyName) => {
    setState(prev => ({ ...prev, currentSpecialty: specialtyName }));
    setShowConfirmationModal(true);
  };

  const startCase = async () => {
    setCurrentScreen('case');
    resetCaseState();
    setLoadingText('Generating Case...');
    setLoading(true);

    try {
      const responseParts = await callGenerativeAI(state.currentSpecialty);
      
      const fullText = responseParts.filter(p => p.text).map(p => p.text).join('');
      const [caseText, diagnosis] = fullText.split('FINAL_DIAGNOSIS:');
      const finalDiagnosis = diagnosis ? diagnosis.trim() : 'Not provided';
      
      // Process the mixed text/image parts into phases
      const caseParts = [];
      let currentPhase = [];
      
      responseParts.forEach(part => {
        if (part.text) {
          const cleanText = part.text.split('FINAL_DIAGNOSIS:')[0];
          const textSegments = cleanText.split('[PAUSE]');
          
          textSegments.forEach((segment, index) => {
            if (segment.trim()) {
              currentPhase.push({ text: segment });
            }
            if (index < textSegments.length - 1) {
              caseParts.push(currentPhase);
              currentPhase = [];
            }
          });
        } else if (part.inlineData) {
          currentPhase.push(part);
        }
      });
      
      if (currentPhase.length > 0) {
        caseParts.push(currentPhase);
      }

      setState(prev => ({
        ...prev,
        caseParts,
        finalDiagnosis,
        currentPartIndex: 0
      }));
      
    } catch (error) {
      console.error('Error generating case:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const goToDashboard = () => {
    setCurrentScreen('dashboard');
    resetCaseState();
  };

  return (
    <div className="w-full h-full max-w-7xl mx-auto">
      {currentScreen === 'dashboard' && (
        <DashboardScreen 
          specialties={specialties}
          onSpecialtyClick={handleSpecialtyClick}
        />
      )}
      
      {currentScreen === 'case' && (
        <CaseScreen 
          state={state}
          updateState={updateState}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
          setShowDiagnosisModal={setShowDiagnosisModal}
        />
      )}

      <ConfirmationModal 
        show={showConfirmationModal}
        specialty={state.currentSpecialty}
        onConfirm={() => {
          setShowConfirmationModal(false);
          startCase();
        }}
        onCancel={() => setShowConfirmationModal(false)}
      />

      <DiagnosisRevealModal 
        show={showDiagnosisModal}
        state={state}
        setLoading={setLoading}
        setLoadingText={setLoadingText}
        onClose={() => {
          setShowDiagnosisModal(false);
          goToDashboard();
        }}
      />

      <LoadingSpinner show={loading} text={loadingText} />
    </div>
  );
}

export default App;
