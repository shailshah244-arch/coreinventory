/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, Box } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: (email: string, role: 'ADMIN' | 'MANAGER' | 'OPERATOR') => void;
  onNavigateToSignup: () => void;
  onTeleportToScreen: (screenId: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onNavigateToSignup,
  onTeleportToScreen
}) => {
  const [email, setEmail] = useState('devarsh@coreinventory.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Dynamic role mapping based on input for easier demo testing
    setTimeout(() => {
      setIsSubmitting(false);
      let role: 'ADMIN' | 'MANAGER' | 'OPERATOR' = 'ADMIN';
      if (email.includes('dhruv') || email.includes('suthar') || email.includes('jenkins')) {
        role = 'MANAGER';
      } else if (email.includes('shail') || email.includes('shah') || email.includes('chen')) {
        role = 'OPERATOR';
      }
      onLogin(email, role);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg ring-1 ring-blue-400/30">
            <Box id="login-logo-icon" className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            LogiTrack <span className="text-blue-500 font-medium text-lg">Core</span>
          </span>
        </div>
        <h2 className="mt-8 text-center text-3xl font-extrabold leading-9 tracking-tight text-white">
          Sign in to LogiTrack
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Access your global supply chain dashboard
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-slate-800/80 backdrop-blur-md py-8 px-4 shadow-2xl rounded-2xl border border-slate-700/50 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-950/50 border border-red-500/50 rounded-lg p-3 flex items-start gap-2.5 text-xs text-red-200">
                <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <div className="mt-1.5 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-sm transition-colors"
                  placeholder="devarsh@coreinventory.com"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                💡 Custom users: <span className="font-mono text-slate-400">devarsh@coreinventory.com</span> (Admin), <span className="font-mono text-slate-400">dhruv@coreinventory.com</span> (Manager), <span className="font-mono text-slate-400">shailshah244@gmail.com</span> (Operator)
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="text-xs">
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Reset password link dispatched to simulated inbox.'); }} className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="mt-1.5 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-sm transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-300 select-none">
                  Keep me signed in
                </label>
              </div>
            </div>

            <div>
              <button
                id="signin-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500/45 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all cursor-pointer"
              >
                {isSubmitting ? 'Verifying Credentials...' : 'Sign In'}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-700/60 pt-6 text-center">
            <span className="text-xs text-slate-400">
              Need an account? Contact an administrator or{' '}
            </span>
            <button
              id="goto-signup-btn"
              onClick={onNavigateToSignup}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline cursor-pointer transition-colors"
            >
              Create Organization Account →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Screen Quick teleporting dock at the bottom of login */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl text-center z-10 px-4 bg-slate-800/40 py-3 rounded-xl border border-slate-700/30">
        <span className="text-xs text-slate-400 font-semibold block mb-2 tracking-wider uppercase">
          🛠️ Evaluator Sandbox Control
        </span>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <button onClick={() => onTeleportToScreen('dashboard')} className="px-2.5 py-1 bg-blue-600/35 hover:bg-blue-600/50 border border-blue-500/40 rounded transition-colors cursor-pointer text-[11px]">3. Dashboard</button>
          <button onClick={() => onTeleportToScreen('products')} className="px-2.5 py-1 bg-purple-600/35 hover:bg-purple-600/50 border border-purple-500/40 rounded transition-colors cursor-pointer text-[11px]">4. Products</button>
          <button onClick={() => onTeleportToScreen('receipts')} className="px-2.5 py-1 bg-emerald-600/35 hover:bg-emerald-600/50 border border-emerald-500/40 rounded transition-colors cursor-pointer text-[11px]">5. Receipts</button>
          <button onClick={() => onTeleportToScreen('delivery')} className="px-2.5 py-1 bg-amber-600/35 hover:bg-amber-600/50 border border-amber-500/40 rounded transition-colors cursor-pointer text-[11px]">6. Shipping</button>
          <button onClick={() => onTeleportToScreen('admin')} className="px-2.5 py-1 bg-red-600/35 hover:bg-red-600/50 border border-red-500/40 rounded transition-colors cursor-pointer text-[11px]">7. Admin Policy</button>
        </div>
      </div>
    </div>
  );
};
