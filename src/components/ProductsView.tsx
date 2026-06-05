/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  Boxes, 
  TrendingUp, 
  AlertTriangle, 
  ChevronRight, 
  Minus, 
  HeartCrack,
  CheckCircle,
  Coins
} from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductsViewProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  onUpdateQuantity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Inline formulation for New SKU card
  const [showAddForm, setShowAddForm] = useState(false);
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [quantity, setQuantity] = useState(10);
  const [reorder, setReorder] = useState(25);
  const [price, setPrice] = useState(120);

  const [formError, setFormError] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sku || !name || !price || quantity < 0 || reorder < 0) {
      setFormError('Please enter valid product constraints');
      return;
    }
    
    // Check if SKU exists
    if (products.some(p => p.sku.toLowerCase() === sku.toLowerCase())) {
      setFormError('This SKU identifier is already registered');
      return;
    }

    onAddProduct({
      sku: sku.toUpperCase(),
      name,
      category,
      quantity,
      reorder,
      price: Number(price)
    });

    // Reset standard state values
    setSku('');
    setName('');
    setQuantity(20);
    setReorder(15);
    setPrice(99);
    setFormError('');
    setShowAddForm(false);
  };

  // Extract unique categories for filtration
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Filtering filter Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = products.filter(p => p.quantity <= p.reorder).length;

  return (
    <div className="space-y-6 font-sans">
      {/* Alerter Hub Bar */}
      {lowStockCount > 0 && (
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-950 text-amber-400 border border-amber-500/20 rounded-lg shrink-0">
              <AlertTriangle className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Safety stock limits breached</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lowStockCount} inventory items require immediate replenishment before terminal exhaustion.
              </p>
            </div>
          </div>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} 
            className="text-[10px] font-bold text-amber-400 hover:text-amber-300 border border-amber-500/30 bg-amber-950/20 px-2.5 py-1 rounded transition-colors"
          >
            Show All SKUs
          </button>
        </div>
      )}

      {/* Control Panel: Filters & Add Product button */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
          {/* Search container */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-slate-500 self-center m-auto flex items-center pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU identifier or name..."
              className="block w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-xs text-medium"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wide shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button
          id="toggle-add-product-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-md cursor-pointer transition-all shrink-0"
        >
          <Plus className="h-4 w-4" />
          {showAddForm ? 'Hide SKU Form' : 'Register New SKU'}
        </button>
      </div>

      {/* New SKU Register Inline Card Container */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-blue-500/30 rounded-xl p-5 shadow-lg max-w-3xl"
        >
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-4 text-blue-400">
            Register New Warehouse SKU Stock
          </h3>
          
          <form onSubmit={handleAddSubmit} className="space-y-4">
            {formError && (
              <div className="bg-red-950/40 border border-red-500/30 p-2 text-[11px] text-red-200 rounded">
                ⚠️ {formError}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">SKU Code (e.g., ME-4412)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IN-90210"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Product / Material Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-Pressure Hydraulic Pump B"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                >
                  <option>Electronics</option>
                  <option>Industrial</option>
                  <option>Logistics</option>
                  <option>Packaging</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Initial Stock Qty</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Min Buffer Threshold</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={reorder}
                  onChange={(e) => setReorder(Number(e.target.value))}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block font-medium">Unit Price ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white border border-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Abort
              </button>
              <button
                type="submit"
                id="submit-product-btn"
                className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer transition-colors"
              >
                Authorize Placement
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Main Stock Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/50 flex justify-between items-center">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Warehouse Stock Ledger Matrix</span>
          <span className="text-[11px] text-slate-400">Showing {filteredProducts.length} SKU positions</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <HeartCrack className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-xs font-bold text-white">No items found matching filter criteria</h4>
            <span className="text-[11px] text-slate-500">Reset your filtration parameters or register a new SKU matrix</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider bg-slate-950/20">
                  <th className="py-2.5 px-4">SKU</th>
                  <th className="py-2.5 px-4">Details</th>
                  <th className="py-2.5 px-4 font-mono text-center">Category</th>
                  <th className="py-2.5 px-4 text-center">Balance Level Indicator</th>
                  <th className="py-2.5 px-4 text-right">Unit Val.</th>
                  <th className="py-2.5 px-4 text-right">Extended Value</th>
                  <th className="py-2.5 px-4 text-center">Adjust Balance</th>
                  <th className="py-2.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const isLow = p.quantity <= p.reorder;
                  const ratio = Math.max(0, Math.min(100, (p.quantity / (p.reorder * 2)) * 100));
                  return (
                    <tr key={p.id} className="border-b border-slate-800/55 hover:bg-slate-850/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-400">{p.sku}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white block">{p.name}</span>
                        {isLow && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-rose-500 uppercase font-mono mt-0.5">
                            <AlertTriangle className="h-3 w-3" /> Breach Limit
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 bg-slate-950 uppercase border border-slate-800">
                          {p.category}
                        </span>
                      </td>
                      {/* Interactive Stock Indicator Bar */}
                      <td className="py-3.5 px-4 min-w-[140px]">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono font-bold text-xs ${isLow ? 'text-red-500' : 'text-slate-200'}`}>
                            {p.quantity} <span className="text-[10px] text-slate-500 font-normal">({p.reorder} min)</span>
                          </span>
                          <div className="flex-1 max-w-[120px] h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40 relative">
                            <div 
                              style={{ width: `${ratio}%` }}
                              className={`h-full rounded-full transition-all duration-300 ${isLow ? 'bg-gradient-to-r from-red-600 to-rose-500' : 'bg-gradient-to-r from-blue-600 to-indigo-500'}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        ${(p.quantity * p.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      {/* Manual Incrementor/Decrementor widgets for live preview trigger */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800 gap-1">
                          <button
                            onClick={() => onUpdateQuantity(p.id, -10)}
                            className="p-1 hover:bg-slate-800 hover:text-slate-200 text-slate-500 rounded transition-colors cursor-pointer"
                            title="Decline quantity (10 units)"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-mono text-slate-400 font-semibold px-1 min-w-[20px] text-center self-center text-[10px]">
                            10
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(p.id, 10)}
                            className="p-1 hover:bg-slate-800 hover:text-slate-200 text-slate-500 rounded transition-colors cursor-pointer"
                            title="Replenish quantity (10 units)"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-slate-500 hover:bg-red-950/40 hover:text-red-500 rounded-lg border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                          title="Purge SKU record"
                        >
                          <Trash2 className="h-4 w-4" />
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
