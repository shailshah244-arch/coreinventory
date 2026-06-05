/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  XOctagon, 
  Box,
  Truck,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Receipt, Product } from '../types';
import { motion } from 'motion/react';

interface ReceiptsViewProps {
  receipts: Receipt[];
  products: Product[];
  onAddReceipt: (receipt: Omit<Receipt, 'id' | 'date'>) => void;
}

export const ReceiptsView: React.FC<ReceiptsViewProps> = ({
  receipts,
  products,
  onAddReceipt
}) => {
  const [selectedSkuId, setSelectedSkuId] = useState('');
  const [supplier, setSupplier] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [status, setStatus] = useState<'RECEIVED' | 'PENDING'>('RECEIVED');
  
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [notif, setNotif] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkuId || !supplier || quantity <= 0) {
      setError('Please provide valid product SKU, supplier, and quantities');
      return;
    }

    const selectedProduct = products.find(p => p.id === selectedSkuId);
    if (!selectedProduct) {
      setError('Invalid product selection');
      return;
    }

    // Auto generate PO ref id
    const poNumber = `PO-${Math.floor(10000 + Math.random() * 90000)}`;

    onAddReceipt({
      refId: poNumber,
      productName: selectedProduct.name,
      supplier,
      quantity,
      status
    });

    setSupplier('');
    setQuantity(100);
    setError('');

    setNotif(`Logged receipt ${poNumber} for ${selectedProduct.name}. SKU stock adjusted.`);
    setTimeout(() => setNotif(''), 3000);
  };

  const filteredReceipts = receipts.filter(r => 
    r.refId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = receipts.filter(r => r.status === 'PENDING').length;
  const receivedCount = receipts.filter(r => r.status === 'RECEIVED').length;
  const totalReceivedQty = receipts
    .filter(r => r.status === 'RECEIVED')
    .reduce((sum, r) => sum + r.quantity, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Recording form Container (1/3 cols) */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
            <FileText className="h-4 w-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
              Process Inbound Invoices
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 p-2 text-xs text-red-200 rounded">
                ⚠️ {error}
              </div>
            )}

            {notif && (
              <div className="bg-emerald-950/50 border border-emerald-500/40 p-2.5 text-xs text-emerald-200 rounded animate-fade-in font-mono flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{notif}</span>
              </div>
            )}

            {/* SKU Selector Dropdown */}
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Target Product SKU *</label>
              <div className="mt-1.5 relative">
                <select
                  required
                  value={selectedSkuId}
                  onChange={(e) => setSelectedSkuId(e.target.value)}
                  className="block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none appearance-none"
                >
                  <option value="">-- Choose active SKU --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.sku} • {p.name} (Qty: {p.quantity})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            {/* Supplier text formulation */}
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Authorized Supplier *</label>
              <div className="mt-1.5 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-3.5 w-3.5 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Global Logistics Ltd."
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Inbound Quantity *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Inbound Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'RECEIVED' | 'PENDING')}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                >
                  <option value="RECEIVED">RECEIVED (Add to stock)</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>
            </div>

            <button
              id="submit-receipt-btn"
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Log Inbound Receipt
            </button>
          </form>
        </div>

        {/* Small stats box under PO form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-3.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
            Analytical Inbound Summaries
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block font-medium">PENDING POs</span>
              <span className="text-lg font-black text-amber-500 font-mono mt-0.5 block">{pendingCount} units</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block font-medium">TOTAL RECEIVED</span>
              <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">{totalReceivedQty} units</span>
            </div>
          </div>
        </div>
      </div>

      {/* List (2/3 cols) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-4 border-b border-slate-850 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Recent Inbound Invoices & PO records
              </h3>
              <span className="text-xs text-slate-400">Archived transactions for audit clearance</span>
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="absolute inset-y-0 left-0 pl-2.5 h-4.5 w-4.5 text-slate-500 self-center m-auto flex items-center pointer-events-none" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-8 pr-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-[11px]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider bg-slate-950/20">
                  <th className="py-2.5 px-3">PO Reference</th>
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">Supplier Origin</th>
                  <th className="py-2.5 px-3 text-right">Inbound Qty</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3">Date logged</th>
                </tr>
              </thead>
              <tbody>
                {filteredReceipts.map((r) => {
                  return (
                    <tr key={r.id} className="border-b border-slate-800/60 hover:bg-slate-850/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-indigo-400">{r.refId}</td>
                      <td className="py-3 px-3 font-semibold text-white">{r.productName}</td>
                      <td className="py-3 px-3 text-slate-300 font-medium">{r.supplier}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white">{r.quantity}</td>
                      <td className="py-2 px-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                          r.status === 'RECEIVED' 
                            ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400' 
                            : r.status === 'PENDING' 
                            ? 'bg-amber-950/80 border-amber-500/30 text-amber-500 animate-pulse'
                            : 'bg-slate-800 border-slate-700 text-slate-400 line-through'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 text-[10.5px] font-mono">{r.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
