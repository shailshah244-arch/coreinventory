/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  Truck, 
  ShieldAlert, 
  LogOut, 
  Box,
  User,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (viewId: string) => void;
  onLogout: () => void;
  userEmail: string;
  userRole: 'ADMIN' | 'MANAGER' | 'OPERATOR';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  onLogout,
  userEmail,
  userRole
}) => {
  const getInitials = () => {
    if (userEmail.includes('dhruv') || userEmail.includes('suthar') || userEmail.includes('jenkins')) return 'DS';
    if (userEmail.includes('shail') || userEmail.includes('shah') || userEmail.includes('chen')) return 'SS';
    return 'DS';
  };

  const getFullName = () => {
    if (userEmail.includes('dhruv') || userEmail.includes('suthar') || userEmail.includes('jenkins')) return 'Dhruv Suthar';
    if (userEmail.includes('shail') || userEmail.includes('shah') || userEmail.includes('chen')) return 'Shail Shah';
    return 'Devarsh Savani';
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-400' },
    { id: 'products', label: 'Products Inventory', icon: Package, color: 'text-purple-400' },
    { id: 'receipts', label: 'Record Receipt', icon: Receipt, color: 'text-emerald-400' },
    { id: 'delivery', label: 'Outbound Tracker', icon: Truck, color: 'text-amber-400' },
    { id: 'admin', label: 'Admin Policy Hub', icon: ShieldAlert, color: 'text-red-400' }, // LAST tab
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 font-sans z-20">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-900 bg-slate-950/50">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg">
            <Box className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white tracking-wider block">LOGITRACK</span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest block uppercase">GLOBAL TERMINAL</span>
          </div>
        </div>

        {/* View Selection Navigation List */}
        <nav className="p-4 space-y-1.5">
          <div className="hidden">
            <label className="text-[10px] uppercase text-slate-500 font-bold px-3 tracking-widest">
              Core Modules
            </label>
          </div>

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-slate-800/80 text-white shadow-sm border-l-4 border-blue-500 pl-2'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50 pl-3'
                }`}
              >
                <IconComponent className={`h-4.5 w-4.5 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
                {item.id === 'admin' && (
                  <span className="ml-auto text-[9px] bg-red-950/80 border border-red-500/30 text-red-400 px-1.5 py-0.5 rounded font-mono">
                    SECURED
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Information Profile summary & Logout action */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/40">
        <div className="flex items-center gap-2.5 mb-3.5 px-1">
          <div className="h-9 w-9 bg-slate-800 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-blue-400 border border-slate-700/60 shadow-sm uppercase shrink-0">
            {getInitials()}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{getFullName()}</h4>
            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              {userRole}
            </span>
          </div>
        </div>

        <button
          id="logout-btn"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-slate-800 bg-slate-900/30 hover:bg-red-950/20 hover:border-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs font-semibold cursor-pointer transition-all"
        >
          <LogOut className="h-3.5 w-3.5" />
          Disconnect Session
        </button>
      </div>
    </aside>
  );
};
