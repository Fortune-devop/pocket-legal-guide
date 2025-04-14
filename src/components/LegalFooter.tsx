
import React from 'react';
import { Link } from 'react-router-dom';

const LegalFooter: React.FC = () => {
  return (
    <footer className="bg-legal-primary text-white py-4 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center text-xs">
          <p className="mb-2">
            Pocket Legal Guide is not a substitute for professional legal advice.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
          </div>
          <p className="mt-4">© {new Date().getFullYear()} Pocket Legal Guide</p>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;
