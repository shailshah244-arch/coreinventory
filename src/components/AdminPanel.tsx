/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Server, 
  Terminal, 
  Activity, 
  Plus, 
  Trash2, 
  Lock, 
  CheckCircle,
  Database,
  Cpu,
  Wifi,
  Radio,
  FileText
} from 'lucide-react';
import { AdminUser, ActivityLog } from '../types';
import { motion } from 'motion/react';

interface AdminPanelProps {
  users: AdminUser[];
  onAddUser: (user: Omit<AdminUser, 'id' | 'lastLogin'>) => void;
  onDeleteUser: (id: string) => void;
  securityPolicy: string;
  onUpdateSecurityPolicy: (policy: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  onAddUser,
  onDeleteUser,
  securityPolicy,
  onUpdateSecurityPolicy
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'MANAGER' | 'OPERATOR'>('OPERATOR');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  
  const [error, setError] = useState('');
  const [notif, setNotif] = useState('');
  
  // Simulated terminal dynamic telemetry rows
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'LOGITRACK SECURITY DAEMON INITIALIZED... OK',
    'CONNECTING TO SHARD SECURE NODE "DELTA-4"... STANDBY',
    'AUTHENTICATING TERMINAL SESSION IP 127.0.0.1... PASSED',
    'SYNCING PRODUCTS LEDGER MATRIX (5 SKUs Loaded)... OK',
  ]);

  // Append new logs dynamically to look alive!
  useEffect(() => {
    const methods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];
    const routes = ['/api/warehouse', '/api/receipts', '/api/products/EL-90421', '/api/dispatch', '/api/auth/verify'];
    const codes = ['200 OK', '201 Created', '304 Not Modified', '200 OK'];

    const interval = setInterval(() => {
      const randMethod = methods[Math.floor(Math.random() * methods.length)];
      const randRoute = routes[Math.floor(Math.random() * routes.length)];
      const randCode = codes[Math.floor(Math.random() * codes.length)];
      const timestamp = new Date().toLocaleTimeString();

      const newRow = `[${timestamp}] ${randMethod} ${randRoute} - STATUS ${randCode}`;
      setTerminalLogs(prev => [newRow, ...prev.slice(0, 5)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill out correct credential fields');
      return;
    }

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError('An account with this email already exists');
      return;
    }

    // Hotlink random fallback headshot
    const avatarUrl = users.length % 2 === 0 
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvCsoU9Ew-PtGcDzWEdkPYPPnYzjjWRsnCWygDrdKn8i71YIqoOlk1SYSoB_DtdEJnun6mClKgBeoiJM3thuagop5wC2EQrhQ81DG69Al9oo3K8gKlhl5wMEi5ptuC5mWru86U_suogRKpE0M4aqdzR5HHCBNrc41hKsosqpqEDn1yIYE_BnZECvdLO3sNLWgl14LLheXLXjIEPbTBEf9OUAapAyQrm1Nbqcl5pMKvfc_-8a_sp9LBtXycrPYPd8xO3LceFSkqdJmO'
      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSXPj7AWUVhcuvhNEPgjQn1etXg7RNt7jvPLITw3_I6uGPxHsxhEDwTe8e1Ms6L3AFS1WYD0qsDlGMRYX4TP5T_-SebLBAVCdYdsooZdVqBevixzHiQLauLG41m49Pxc03Q9Na9uW8cgCFr6saE_VBjjE0LEhzboa5_JxKiWqSnQwIIavOLVJ8x8F0gQ09RGYW7w_j-q_DrC3NAo43zlBke0d2O_4amLXMfAhtrnc_9cEGqM8GfhT2PTbf-IfA6Q_LJ6zYdCvg4N9K';

    onAddUser({
      name,
      email,
      role,
      status,
      avatar: avatarUrl
    });

    setName('');
    setEmail('');
    setError('');
    setNotif(`Created User Profile for ${name}. Logs updated.`);
    setTimeout(() => setNotif(''), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Policy Settings Section & Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Policy trigger block (1/3 cols) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
              <ShieldAlert className="h-4.5 w-4.5 text-red-500" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Security Policy Central
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Global Firewall Protcol</label>
                <select
                  value={securityPolicy}
                  onChange={(e) => onUpdateSecurityPolicy(e.target.value)}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-red-500/50 focus:outline-none focus:border-red-500 font-mono font-bold"
                >
                  <option value="High Alert (SECURE SHIELD ACTIVE)">High Alert (Lock non-admin access)</option>
                  <option value="Standard Operations Protocol">Standard Warehouse Protocol</option>
                  <option value="Permissive Diagnostic Protocol">Low Alert (Diag Mode)</option>
                </select>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-850/80">
                <span className="text-[10px] uppercase font-bold text-red-400 flex items-center gap-1.5 font-mono">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  CURRENT PROTOCOL WARNING
                </span>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Terminal is broadcasting on encrypted routing channels. Standard audit configurations are active in server.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850 mt-4 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>KERNEL VERSION: v4.11.20</span>
            <span className="text-emerald-500">ENCRYPTED SSL</span>
          </div>
        </div>

        {/* Real-time server telemetry / Latency indicator widgets (1/3 cols) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
              <Activity className="h-4.5 w-4.5 text-blue-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                System Telemetry Monitor
              </h3>
            </div>

            <div className="space-y-4">
              {/* Stat 1: CPU */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>SSL ENGINE CPU LOAD:</span>
                  <span className="text-blue-400 font-bold">14.2%</span>
                </div>
                <div className="h-2 bg-slate-950 rounded border border-slate-850 overflow-hidden">
                  <div className="h-full bg-blue-500 w-[14.2%] transition-all duration-500" />
                </div>
              </div>

              {/* Stat 2: Memory */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>RAM BUFFER EXPENDITURE:</span>
                  <span className="text-indigo-400 font-bold">42.5%</span>
                </div>
                <div className="h-2 bg-slate-950 rounded border border-slate-850 overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[42.5%] transition-all duration-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-950 p-2 rounded border border-slate-850/80 text-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">API LATENCY</span>
                  <span className="text-xs font-black font-mono text-emerald-400 mt-0.5 block">14 ms</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-850/80 text-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">SYNC RATE</span>
                  <span className="text-xs font-black font-mono text-blue-400 mt-0.5 block">100% OK</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850 mt-4 text-[10px] text-slate-500 font-mono text-center">
            📡 Connected on Shard Host: <strong className="text-slate-300">CLOUD-RUN-EUROPE</strong>
          </div>
        </div>

        {/* Live Terminal logs feed console (1/3 cols) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
              <Terminal className="h-4.5 w-4.5 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                LogiTrack Console Daemon
              </h3>
            </div>

            {/* Custom styled console terminal feed */}
            <div className="bg-slate-950 border border-slate-850 rounded-lg p-3.5 h-[135px] overflow-y-auto font-mono text-[9px] text-emerald-400 leading-relaxed text-left">
              {terminalLogs.map((log, index) => (
                <div key={index} className="truncate select-all select-none selection:bg-emerald-800">
                  <span className="text-emerald-600 select-none">{'>'}</span> {log}
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-slate-500 font-mono flex items-center justify-between pt-3">
            <span>PING RATE: 42ms</span>
            <span className="text-emerald-500 animate-pulse font-bold flex items-center gap-1">
              ● ONLINE_OK
            </span>
          </div>
        </div>
      </div>

      {/* Team accounts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users list (2/3 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-slate-850 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Active Organization Accounts Directory
              </h3>
              <p className="text-xs text-slate-500">Authorized personnel directories and terminal clearances</p>
            </div>
            <span className="text-xs bg-blue-950 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
              {users.length} Users active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider bg-slate-950/20">
                  <th className="py-2.5 px-3">Terminal Operator Details</th>
                  <th className="py-2.5 px-3 font-mono">Secured Role</th>
                  <th className="py-2.5 px-3">State Status</th>
                  <th className="py-2.5 px-3">Last Active logged</th>
                  <th className="py-2.5 px-3 text-center">Terminate</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-800/60 hover:bg-slate-850/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          referrerPolicy="no-referrer"
                          className="h-8.5 w-8.5 rounded-md object-cover border border-slate-700 bg-slate-950" 
                        />
                        <div>
                          <span className="font-bold text-white block">{user.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${
                        user.role === 'ADMIN' ? 'bg-red-950/80 border-red-500/35 text-red-400' :
                        user.role === 'MANAGER' ? 'bg-indigo-950/80 border-indigo-500/35 text-indigo-400' :
                        'bg-blue-950/80 border-blue-500/35 text-blue-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${user.status === 'Active' ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                      {user.lastLogin}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onDeleteUser(user.id)}
                        disabled={user.role === 'ADMIN'}
                        className={`p-1.5 rounded border border-transparent hover:border-red-500/20 text-slate-500 hover:text-red-500 transition-colors ${user.role === 'ADMIN' ? 'cursor-not-allowed opacity-30 hover:bg-transparent hover:text-slate-500' : 'cursor-pointer hover:bg-red-950/40'}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User form (1/3 cols) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm h-fit">
          <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
            <Users className="h-4.5 w-4.5 text-blue-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
              Authorize Terminal Account
            </h3>
          </div>

          <form onSubmit={handleAddUserSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 p-2 text-xs text-red-200 rounded">
                ⚠️ {error}
              </div>
            )}

            {notif && (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-2 text-xs text-emerald-300 rounded font-mono flex items-center gap-2.5 animate-pulse">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>{notif}</span>
              </div>
            )}

            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Operator Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Michael Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Enterprise Email *</label>
              <input
                type="email"
                required
                placeholder="e.g. m.chen@coreinventory.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Clearance Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'ADMIN' | 'MANAGER' | 'OPERATOR')}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                >
                  <option value="OPERATOR">OPERATOR</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Initial Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <button
              id="submit-user-btn"
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md transition-all cursor-pointer font-sans"
            >
              <Plus className="h-4 w-4" />
              Direct Provision Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
