import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-slideUp">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-heading font-semibold">
            {mode === 'login' ? 'Login to Your Account' : 'Create an Account'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {mode === 'login' ? (
            <LoginForm onClose={onClose} />
          ) : (
            <SignupForm onClose={onClose} />
          )}
          
          <div className="mt-4 text-center">
            {mode === 'login' ? (
              <p className="text-gray-600">
                Don't have an account? 
                <button 
                  onClick={() => setMode('signup')}
                  className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account? 
                <button 
                  onClick={() => setMode('login')}
                  className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;