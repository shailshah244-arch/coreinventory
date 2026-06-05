/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  reorder: number;
  price: number;
}

export interface Receipt {
  id: string;
  refId: string;
  productName: string;
  supplier: string;
  quantity: number;
  status: 'RECEIVED' | 'PENDING' | 'CANCELLED';
  date: string;
}

export interface OutboundDelivery {
  id: string;
  trackingId: string;
  destination: string;
  hub: string;
  productName: string;
  quantity: number;
  eta: string;
  status: 'IN TRANSIT' | 'PROCESSING' | 'DELIVERED';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'OPERATOR';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  avatar: string;
}

export interface ActivityLog {
  id: string;
  type: 'security' | 'person_add' | 'warning' | 'info';
  user: string;
  action: string;
  target: string;
  timeAndDate: string;
}
