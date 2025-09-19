import React, { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        onClose();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-error-500 bg-opacity-10 text-error-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={18} className="text-gray-500" />
          </div>
          <input
            id="email"
            type="email"
            className="input pl-10"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-gray-500" />
          </div>
          <input
            id="password"
            type="password"
            className="input pl-10"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end mt-1">
          <button type="button" className="text-sm text-primary-600 hover:text-primary-700">
            Forgot password?
          </button>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full py-3"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader size={20} className="animate-spin mr-2" />
            Logging in...
          </span>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};

export default LoginForm;