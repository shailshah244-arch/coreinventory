/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Bell, Clock, ShieldCheck, Database } from 'lucide-react';

interface NavbarProps {
  activeView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView }) => {
  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Global Operations Control';
      case 'products':
        return 'Inventory Warehouse Matrix';
      case 'receipts':
        return 'Terminal Inbound Logs';
      case 'delivery':
        return 'Dispatch Tracker & Routing';
      case 'admin':
        return 'System Kernel & Policies';
      default:
        return 'Terminal Control Applet';
    }
  };

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/85 px-6 flex items-center justify-between sticky top-0 z-10 font-sans">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-extrabold tracking-wide text-white uppercase font-mono">
          {getViewTitle()}
        </h1>
        <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-950/40 border border-blue-500/20 text-[10px] text-blue-400 font-mono">
          <Database className="h-3 w-3" />
          <span>Active Warehouse: SHARD-DELTA-4</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Real-time system clocks */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-semibold text-slate-400 border-r border-slate-800 pr-4">
          <Clock className="h-3.5 w-3.5 text-slate-500" />
          <span>SYS UTC:</span>
          <span className="font-mono text-slate-200">12:45:02</span>
        </div>

        {/* Security indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 text-[10px] font-semibold text-slate-300">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>SSL Tunnel Active</span>
        </div>

        {/* Notification alerts bell icon button */}
        <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors relative cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-900" />
        </button>
      </div>
    </header>
  );
};
