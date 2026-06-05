/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Plus, 
  Navigation, 
  Compass, 
  CheckCircle2, 
  Activity, 
  Clock, 
  ArrowRight,
  Map,
  ShieldCheck,
  Search,
  PackageOpen
} from 'lucide-react';
import { OutboundDelivery, Product } from '../types';
import { motion } from 'motion/react';

interface DeliveryViewProps {
  deliveries: OutboundDelivery[];
  products: Product[];
  onAddDelivery: (delivery: Omit<OutboundDelivery, 'id' | 'trackingId'>) => void;
}

export const DeliveryView: React.FC<DeliveryViewProps> = ({
  deliveries,
  products,
  onAddDelivery
}) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [destination, setDestination] = useState('');
  const [hub, setHub] = useState('Berlin Hub');
  const [quantity, setQuantity] = useState(50);
  
  const [error, setError] = useState('');
  const [notif, setNotif] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !destination || quantity <= 0) {
      setError('Please provide valid destination coordinates and quantities');
      return;
    }

    const selectedProduct = products.find(p => p.id === selectedProductId);
    if (!selectedProduct) {
      setError('Invalid product selection');
      return;
    }

    if (selectedProduct.quantity < quantity) {
      setError(`Insufficient warehouse stocks. Only ${selectedProduct.quantity} units available.`);
      return;
    }

    // Add to outbound state log & deduct quantity
    onAddDelivery({
      destination,
      hub,
      productName: selectedProduct.name,
      quantity,
      eta: 'In 36 Hours',
      status: 'PROCESSING'
    });

    setDestination('');
    setQuantity(50);
    setError('');

    setNotif(`Dispatched ${quantity} units of ${selectedProduct.name} to ${destination}.`);
    setTimeout(() => setNotif(''), 3000);
  };

  const activeTransitCount = deliveries.filter(d => d.status === 'IN TRANSIT').length;
  const processingCount = deliveries.filter(d => d.status === 'PROCESSING').length;
  const deliveredCount = deliveries.filter(d => d.status === 'DELIVERED').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Dispatch form (1/3 cols) */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
            <Compass className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
              Authorize Outbound Dispatch
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-950/45 border border-red-500/35 p-2 text-xs text-red-200 rounded">
                ⚠️ {error}
              </div>
            )}

            {notif && (
              <div className="bg-amber-950/50 border border-amber-500/40 p-2 text-xs text-amber-200 rounded font-mono animate-pulse">
                🚚 {notif}
              </div>
            )}

            {/* Choose product */}
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Target Product SKU *</label>
              <select
                required
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
              >
                <option value="">-- Choose inventory source --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id} disabled={p.quantity === 0}>
                    {p.sku} • {p.name} (Qty Available: {p.quantity})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Destination Enterprise *</label>
              <div className="mt-1.5 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cyberdyne Industries"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Logistics Hub</label>
                <select
                  value={hub}
                  onChange={(e) => setHub(e.target.value)}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                >
                  <option>Berlin Hub</option>
                  <option>London Port</option>
                  <option>Silicon Valley</option>
                  <option>Tokyo Airport</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Dispatch Qty *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>
            </div>

            <button
              id="submit-delivery-btn"
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
            >
              <Navigation className="h-4 w-4" />
              Direct Dispatch Order
            </button>
          </form>
        </div>

        {/* Dynamic shipping metrics */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
            Active Routing Pipeline Stats
          </span>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
              <span className="text-[9px] text-slate-500 font-bold uppercase block">Processing</span>
              <span className="text-sm font-black font-mono text-amber-500 block mt-0.5">{processingCount}</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
              <span className="text-[9px] text-slate-500 font-bold uppercase block">In Transit</span>
              <span className="text-sm font-black font-mono text-blue-400 block mt-0.5">{activeTransitCount}</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
              <span className="text-[9px] text-slate-500 font-bold uppercase block">Delivered</span>
              <span className="text-sm font-black font-mono text-emerald-400 block mt-0.5">{deliveredCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vector Cargo map + Outbound cargo ledger index list (2/3 cols) */}
      <div className="lg:col-span-2 space-y-6">
        {/* SVG Interactive Map */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
            Real-Time Shipping Trajectory Router
          </h3>

          <div className="h-48 bg-slate-950 rounded-lg relative overflow-hidden border border-slate-850 flex items-center justify-center">
            {/* Embedded custom SVG stylized map schema */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#334155" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.2"/>
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Shipping paths */}
              <path d="M 60 120 Q 200 60 380 90" fill="none" stroke="url(#routeGrad)" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M 380 90 Q 420 120 540 100" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3,3" />
            </svg>

            {/* Pulsating Map Node Indicators */}
            <div className="absolute left-[60px] top-[120px] pointer-events-none">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-blue-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              <span className="text-[9px] font-bold font-mono text-slate-400 absolute top-3 -left-4 whitespace-nowrap">SILICON VALLEY</span>
            </div>

            <div className="absolute left-[380px] top-[90px] pointer-events-none">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-amber-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              <span className="text-[9px] font-bold font-mono text-slate-400 absolute top-3 -left-4 whitespace-nowrap">LONDON PORT</span>
            </div>

            <div className="absolute left-[540px] top-[100px] pointer-events-none">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              <span className="text-[9px] font-bold font-mono text-slate-400 absolute top-3 -left-4 whitespace-nowrap">BERLIN HUB</span>
            </div>

            <div className="text-center z-10 p-4 bg-slate-900/80 rounded border border-slate-800">
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                🗺️ Active Shipping Trajectories: <strong className="text-amber-400">{deliveries.length} Channels monitored</strong>
              </p>
              <span className="text-[10px] text-slate-500 block mt-1">
                Telemetry connected via standard SSL carrier
              </span>
            </div>
          </div>
        </div>

        {/* Ledger */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
            Outgoing Shipments & Dispatch Ledger
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider bg-slate-950/20">
                  <th className="py-2.5 px-3">Tracking ID</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3">Transit Hub</th>
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3 text-right">Dispatch Qty</th>
                  <th className="py-2.5 px-3 font-mono text-center">ETA</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => {
                  return (
                    <tr key={delivery.id} className="border-b border-slate-800/60 hover:bg-slate-850/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-amber-500">{delivery.trackingId}</td>
                      <td className="py-3 px-3 font-semibold text-white">{delivery.destination}</td>
                      <td className="py-3 px-3 text-slate-400 font-medium">{delivery.hub}</td>
                      <td className="py-3 px-3 text-slate-300 font-medium">{delivery.productName}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white">{delivery.quantity}</td>
                      <td className="py-3 px-3 font-mono text-center text-slate-400 text-[10.5px]">{delivery.eta}</td>
                      <td className="py-2 px-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                          delivery.status === 'DELIVERED' 
                            ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400' 
                            : delivery.status === 'IN TRANSIT' 
                            ? 'bg-blue-950/80 border-blue-500/30 text-blue-400 animate-pulse'
                            : 'bg-amber-950/80 border-amber-500/30 text-amber-500'
                        }`}>
                          {delivery.status}
                        </span>
                      </td>
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
