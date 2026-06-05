/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Download, 
  Upload, 
  TrendingUp, 
  DollarSign, 
  ShieldX, 
  Clock, 
  ChevronRight, 
  ShoppingBag, 
  Check, 
  RefreshCcw,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Product, ActivityLog } from '../types';
import { motion } from 'motion/react';

interface DashboardViewProps {
  products: Product[];
  logs: ActivityLog[];
  onTriggerReorder: (productId: string, reorderAmount: number) => void;
  onNavigateToView: (viewId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  logs,
  onTriggerReorder,
  onNavigateToView
}) => {
  const [reorderedItems, setReorderedItems] = useState<Record<string, boolean>>({});

  // Calculations for KPI Cards
  const lowStockSKUs = products.filter(p => p.quantity <= p.reorder);
  const totalAssetsValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  
  // Custom structured chart data
  const chartData = [
    { name: 'Mon', receipts: 120, shipments: 95 },
    { name: 'Tue', receipts: 180, shipments: 140 },
    { name: 'Wed', receipts: 250, shipments: 190 },
    { name: 'Thu', receipts: 210, shipments: 220 },
    { name: 'Fri', receipts: 340, shipments: 280 },
    { name: 'Sat', receipts: 95, shipments: 110 },
    { name: 'Sun', receipts: 60, shipments: 75 },
  ];

  const handleReorderClick = (productId: string) => {
    setReorderedItems(prev => ({ ...prev, [productId]: true }));
    onTriggerReorder(productId, 100);
    setTimeout(() => {
      setReorderedItems(prev => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 4 Premium KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Critical Alarms */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-900 border border-red-500/30 rounded-xl p-4.5 flex items-start gap-4 shadow-[0_4px_20px_-4px_rgba(239,68,68,0.12)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full blur-xl" />
          <div className="p-2.5 bg-red-950/80 border border-red-500/40 rounded-lg text-red-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-slate-500 tracking-wider block uppercase">CRITICAL ALARMS</span>
            <span className="text-2xl font-black text-rose-500 font-mono tracking-tight mt-0.5 block">
              {lowStockSKUs.length} SKUs
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block font-medium">
              Below configured reorder parameters
            </span>
          </div>
        </motion.div>

        {/* Card 2: Received Shipments */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 flex items-start gap-4 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl" />
          <div className="p-2.5 bg-slate-850 border border-slate-700 text-emerald-400 rounded-lg">
            <Download className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-slate-500 tracking-wider block uppercase">RECEIVED UNITS</span>
            <span className="text-2xl font-black text-white font-mono tracking-tight mt-0.5 block">
              1,530 / <span className="text-slate-500 text-base font-normal">1,400</span>
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-400" />
              <strong className="text-emerald-400">+9.2%</strong> over projected allocation
            </span>
          </div>
        </motion.div>

        {/* Card 3: Outbound Active Dispatch */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 flex items-start gap-4 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl" />
          <div className="p-2.5 bg-slate-850 border border-slate-700 text-blue-400 rounded-lg">
            <Upload className="h-5 w-5 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-slate-500 tracking-wider block uppercase">ACTIVE SHIPMENTS</span>
            <span className="text-2xl font-black text-white font-mono tracking-tight mt-0.5 block">
              3 Dispatch
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block font-medium">
              In-transit global logistics tracking
            </span>
          </div>
        </motion.div>

        {/* Card 4: Operating Asset Value */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 flex items-start gap-4 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl" />
          <div className="p-2.5 bg-slate-850 border border-slate-700 text-indigo-400 rounded-lg">
            <DollarSign className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-slate-500 tracking-wider block uppercase">TOTAL VALUE</span>
            <span className="text-2xl font-black text-white font-mono tracking-tight mt-0.5 block">
              ${totalAssetsValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block font-medium flex items-center gap-1">
              Live pricing matrix valuation
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Graph & Sidebar logs block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Bar Chart (Recharts) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Terminal Volume Report</h3>
                <span className="text-xs text-slate-500">Receipt and shipment units comparison by day of week</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-blue-400 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Receipts
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-semibold ml-2">
                  <span className="h-2 w-2 rounded-full bg-slate-600" />
                  Shipments
                </span>
              </div>
            </div>

            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} 
                    labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                  <Bar dataKey="receipts" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shipments" fill="#475569" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800pt-4 mt-4">
            <span className="text-[11px] text-slate-500 font-mono">
              GENERATED REPORT ID: TERM-VAL-2024
            </span>
            <button 
              onClick={() => onNavigateToView('receipts')}
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer transition-colors"
            >
              Analyze Receipts Inbound Logs
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Section: Terminal Firewall / History logs */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <ShieldX className="h-4.5 w-4.5 text-rose-500 shrink-0" />
              Terminal History & Logs
            </h3>

            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="text-xs flex items-start gap-3 border-b border-slate-800/60 pb-3 last:border-0 last:pb-0">
                  <div className={`mt-0.5 p-1 rounded ${
                    log.type === 'security' ? 'bg-red-950/85 text-red-400 border border-red-500/20' :
                    log.type === 'warning' ? 'bg-amber-950/85 text-amber-400 border border-amber-500/20' :
                    log.type === 'person_add' ? 'bg-blue-950/85 text-blue-400 border border-blue-500/20' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    <Clock className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-slate-300 leading-relaxed">
                      <strong className="text-white font-semibold">{log.user}</strong> {log.action}{' '}
                      <span className="font-mono bg-slate-950 text-blue-400 px-1 py-0.5 rounded text-[10px] break-words">
                        {log.target}
                      </span>
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono block mt-1">
                      {log.timeAndDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onNavigateToView('admin')}
            className="w-full mt-4 flex items-center justify-between text-xs py-2 px-3 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-lg font-semibold cursor-pointer transition-colors"
          >
            Access Security Policy Panel
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Critical Stock Reorder Alerts Table */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              ⚠️ Critical Stock Reorder Warnings
            </h3>
            <span className="text-xs text-slate-500">Products requiring emergency procurement dispatch</span>
          </div>
          <span className="text-xs bg-rose-950/70 border border-rose-500/30 text-rose-400 px-2.5 py-0.5 rounded-full font-mono">
            {lowStockSKUs.length} items breached reorder parameter
          </span>
        </div>

        {lowStockSKUs.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 font-medium">
            ✅ All active inventory SKUs satisfy designated safety parameters. No active reorders required.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider bg-slate-950/30">
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3 text-right">Available Qty</th>
                  <th className="py-2.5 px-3 text-right">Min Buffer Limit</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-center">Procurement Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockSKUs.map((p) => {
                  const isReordering = reorderedItems[p.id];
                  return (
                    <tr key={p.id} className="border-b border-slate-800/60 hover:bg-slate-850/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-blue-400">{p.sku}</td>
                      <td className="py-3 px-3 font-semibold text-white">{p.name}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-rose-500">{p.quantity}</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-400">{p.reorder}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 border border-rose-500/40 text-rose-400 uppercase tracking-wide font-mono animate-pulse">
                          BREACHED
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => handleReorderClick(p.id)}
                          disabled={isReordering}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-md border transition-all cursor-pointer ${
                            isReordering 
                              ? 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400' 
                              : 'bg-blue-600 hover:bg-blue-500 border-blue-500 text-white shadow-sm hover:shadow'
                          }`}
                        >
                          {isReordering ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Requested
                            </>
                          ) : (
                            <>
                              <RefreshCcw className="h-3 w-3 shrink-0" />
                              Emergency Reorder +100
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
