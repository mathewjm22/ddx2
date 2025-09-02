import React from 'react';
import { ICONS } from '../components/Icons';

const DashboardScreen = ({ specialties, onSpecialtyClick }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-2 text-white">
        Differential Diagnosis AI Simulator
      </h1>
      <p className="text-center text-gray-300 mb-8">
        Select a specialty to begin a case or choose a random one.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {specialties.map((specialty) => (
          <div
            key={specialty.name}
            className="glass-tile p-4 flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={() => onSpecialtyClick(specialty.name)}
          >
            <div className="mb-2">
              {React.createElement(ICONS[specialty.icon])}
            </div>
            <span className="font-semibold">{specialty.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardScreen;
