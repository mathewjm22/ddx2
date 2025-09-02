import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { diagnoses } from '../data/specialties';

const DifferentialTab = ({ differentialList, updateState }) => {
  const [input, setInput] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredDiagnoses, setFilteredDiagnoses] = useState([]);
  const listRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      Sortable.create(listRef.current, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: (evt) => {
          const newList = [...differentialList];
          const item = newList.splice(evt.oldIndex, 1)[0];
          newList.splice(evt.newIndex, 0, item);
          updateState({ differentialList: newList });
        }
      });
    }
  }, [differentialList, updateState]);

  useEffect(() => {
    if (input) {
      const filtered = diagnoses
        .filter(d => d.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 5);
      setFilteredDiagnoses(filtered);
      setShowAutocomplete(filtered.length > 0);
    } else {
      setShowAutocomplete(false);
    }
  }, [input]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const newList = [input.trim(), ...differentialList];
      updateState({ differentialList: newList });
      setInput('');
      setShowAutocomplete(false);
    }
  };

  const handleAutocompleteClick = (diagnosis) => {
    setInput(diagnosis);
    setShowAutocomplete(false);
  };

  const removeDiagnosis = (index) => {
    const newList = differentialList.filter((_, i) => i !== index);
    updateState({ differentialList: newList });
  };

  return (
    <div>
      <label htmlFor="differential-input" className="block mb-2 font-semibold">
        Add to Differential Diagnosis:
      </label>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="Type a diagnosis..."
        />
        {showAutocomplete && (
          <div
            ref={autocompleteRef}
            className="autocomplete-list"
          >
            {filteredDiagnoses.map((diagnosis, index) => (
              <div
                key={index}
                onClick={() => handleAutocompleteClick(diagnosis)}
              >
                {diagnosis}
              </div>
            ))}
          </div>
        )}
      </div>
      <ul ref={listRef} className="mt-4 space-y-2">
        {differentialList.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-800/50 p-2 rounded-lg"
          >
            <span>{index + 1}. {item}</span>
            <button
              onClick={() => removeDiagnosis(index)}
              className="text-red-500 hover:text-red-400 font-bold text-xl"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DifferentialTab;
