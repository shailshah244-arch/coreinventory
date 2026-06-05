/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Globe, Sparkles, FolderLock, Plus, ArrowLeft, Building2, UserCheck, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface SignupPageProps {
  onRegister: (orgName: string, email: string) => void;
  onNavigateToLogin: () => void;
  onTeleportToScreen: (screenId: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onRegister,
  onNavigateToLogin,
  onTeleportToScreen
}) => {
  const [orgName, setOrgName] = useState('Apex Global Logistics');
  const [locCode, setLocCode] = useState('LOC-EU-4');
  const [currency, setCurrency] = useState('USD ($)');
  
  const [firstName, setFirstName] = useState('Devarsh');
  const [lastName, setLastName] = useState('Savani');
  const [email, setEmail] = useState('devarsh@coreinventory.com');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !firstName || !lastName || !email) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setSuccess(true);
    
    setTimeout(() => {
      onRegister(orgName, email);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-5 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl z-10 text-center">
        <div className="flex justify-center items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">LogiTrack Central</span>
        </div>
        <h2 className="mt-5 text-3xl font-extrabold text-white tracking-tight">
          Create Organization Account
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Set up your central node on the LogiTrack global network
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl z-10"
      >
        <div className="bg-slate-800/80 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl border border-slate-700/50 sm:px-10">
          {success ? (
            <div className="py-12 text-center space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 animate-bounce">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-white">Terminal Registered Successfully!</h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Provisioning database shard and injecting security keys for <strong className="text-blue-400">{orgName}</strong>...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-950/50 border border-red-500/50 rounded-lg p-3 text-xs text-red-200">
                  {error}
                </div>
              )}

              {/* Section 1: Organization Profile */}
              <div>
                <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-4">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                    Organization Profile
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="mt-1.5 block w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/45 text-sm"
                      placeholder="e.g. Apex Cargo"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Primary Logistics Code
                    </label>
                    <input
                      type="text"
                      value={locCode}
                      onChange={(e) => setLocCode(e.target.value)}
                      className="mt-1.5 block w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/45 text-sm"
                      placeholder="LOC-EU-4"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Default Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="mt-1.5 block w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/45 text-sm"
                    >
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Chief Operating Officer (Admin) */}
              <div>
                <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-4">
                  <UserCheck className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                    Chief Operating Officer (Admin)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1.5 block w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/45 text-sm"
                      placeholder="Alex"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1.5 block w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/45 text-sm"
                      placeholder="Rivera"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="mt-1.5 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/45 text-sm"
                      placeholder="devarsh@coreinventory.com"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-slate-700/60">
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="w-1/3 flex justify-center items-center gap-2 py-2.5 px-4 border border-slate-700 hover:bg-slate-700/50 rounded-lg text-sm font-semibold text-slate-300 transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  id="register-terminal-btn"
                  type="submit"
                  className="w-2/3 flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500/45 transition-all cursor-pointer"
                >
                  Register Terminal & Sign In
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* Selector Control */}
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
