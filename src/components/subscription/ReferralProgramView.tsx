
import React from 'react';
import ReferralSection from '../billing/ReferralSection';

const ReferralProgramView = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-text-primary">
          Programme de Parrainage
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Invitez d'autres médecins et gagnez des récompenses pour chaque parrainage réussi
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <ReferralSection />
      </div>
    </div>
  );
};

export default ReferralProgramView;
