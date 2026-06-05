/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Receipt, OutboundDelivery, AdminUser, ActivityLog } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    sku: 'EL-90421',
    name: 'Precision Calibrator X1',
    category: 'Electronics',
    quantity: 142,
    reorder: 50,
    price: 299.00
  },
  {
    id: 'p2',
    sku: 'LG-11002',
    name: 'Shockproof Shipping Crates',
    category: 'Packaging',
    quantity: 24,
    reorder: 30,
    price: 45.50
  },
  {
    id: 'p3',
    sku: 'IN-44501',
    name: 'High-Torque Actuator',
    category: 'Industrial',
    quantity: 8,
    reorder: 10,
    price: 1240.00
  },
  {
    id: 'p4',
    sku: 'EL-00213',
    name: 'Wireless Telemetry Module',
    category: 'Electronics',
    quantity: 210,
    reorder: 40,
    price: 125.00
  },
  {
    id: 'p5',
    sku: 'LG-88910',
    name: 'RFID Asset Tags (500pk)',
    category: 'Logistics',
    quantity: 55,
    reorder: 20,
    price: 89.99
  }
];

export const INITIAL_RECEIPTS: Receipt[] = [
  {
    id: 'r1',
    refId: 'PO-99120',
    productName: 'Ind. Pump Gear',
    supplier: 'Global Logistics Ltd.',
    quantity: 250,
    status: 'RECEIVED',
    date: 'May 24, 2024'
  },
  {
    id: 'r2',
    refId: 'PO-99121',
    productName: 'Valve Kit (X2)',
    supplier: 'Apex Systems',
    quantity: 15,
    status: 'PENDING',
    date: 'May 24, 2024'
  },
  {
    id: 'r3',
    refId: 'PO-99098',
    productName: 'Steel Bearing A3',
    supplier: 'Precision Alloys Inc.',
    quantity: 1200,
    status: 'RECEIVED',
    date: 'May 23, 2024'
  },
  {
    id: 'r4',
    refId: 'PO-99082',
    productName: 'Sensor Array B2',
    supplier: 'TechFlow Supply',
    quantity: 45,
    status: 'CANCELLED',
    date: 'May 22, 2024'
  },
  {
    id: 'r5',
    refId: 'PO-98991',
    productName: 'Piston Rod L-4',
    supplier: 'Global Logistics Ltd.',
    quantity: 80,
    status: 'RECEIVED',
    date: 'May 21, 2024'
  }
];

export const INITIAL_DELIVERIES: OutboundDelivery[] = [
  {
    id: 'd1',
    trackingId: '#ORD-90124',
    destination: 'TechNova Systems',
    hub: 'Berlin Hub',
    productName: 'X-100 Circuit Board',
    quantity: 450,
    eta: '20 Oct, 14:00',
    status: 'IN TRANSIT'
  },
  {
    id: 'd2',
    trackingId: '#ORD-88219',
    destination: 'Vertex Logistics',
    hub: 'London Port',
    productName: 'Z-42 Power Unit',
    quantity: 1200,
    eta: '21 Oct, 09:30',
    status: 'PROCESSING'
  },
  {
    id: 'd3',
    trackingId: '#ORD-77562',
    destination: 'Cyberdyne Corp',
    hub: 'Silicon Valley',
    productName: 'Alpha Display Panel',
    quantity: 85,
    eta: '19 Oct, 18:45',
    status: 'DELIVERED'
  }
];

export const INITIAL_USERS: AdminUser[] = [
  {
    id: 'u1',
    name: 'Devarsh Savani',
    email: 'devarsh@coreinventory.com',
    role: 'ADMIN',
    status: 'Active',
    lastLogin: '2 mins ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWxLvXjD0uOaGIAPsubQO9mbbiBcdBHooddDiEr0SzWKGvS2iv_w-kxpL3AzYr4RAm9ba8CP6yZa1Fy80QUAbugjp1iUu9h4ykm_SC8T6c1pccTjJiNTMwtt-D-9shLlmiByOUvHeWhtLSTf1ZvSmNUdxVS9vi5IjVvTa1MkrRaRGWLANvQPU3nzxrqcE8gzLW9KbgeAf_bOuiAM5s26gHDJFuUIqv5Ha5hn2wsgB5t_mgSlUb9mrzq43xvWUuIUkQTZmPQisI1sU9'
  },
  {
    id: 'u2',
    name: 'Dhruv Suthar',
    email: 'dhruv@coreinventory.com',
    role: 'MANAGER',
    status: 'Active',
    lastLogin: '1 hour ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvCsoU9Ew-PtGcDzWEdkPYPPnYzjjWRsnCWygDrdKn8i71YIqoOlk1SYSoB_DtdEJnun6mClKgBeoiJM3thuagop5wC2EQrhQ81DG69Al9oo3K8gKlhl5wMEi5ptuC5mWru86U_suogRKpE0M4aqdzR5HHCBNrc41hKsosqpqEDn1yIYE_BnZECvdLO3sNLWgl14LLheXLXjIEPbTBEf9OUAapAyQrm1Nbqcl5pMKvfc_-8a_sp9LBtXycrPYPd8xO3LceFSkqdJmO'
  },
  {
    id: 'u3',
    name: 'Shail Shah',
    email: 'shailshah244@gmail.com',
    role: 'OPERATOR',
    status: 'Inactive',
    lastLogin: '3 days ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSXPj7AWUVhcuvhNEPgjQn1etXg7RNt7jvPLITw3_I6uGPxHsxhEDwTe8e1Ms6L3AFS1WYD0qsDlGMRYX4TP5T_-SebLBAVCdYdsooZdVqBevixzHiQLauLG41m49Pxc03Q9Na9uW8cgCFr6saE_VBjjE0LEhzboa5_JxKiWqSnQwIIavOLVJ8x8F0gQ09RGYW7w_j-q_DrC3NAo43zlBke0d2O_4amLXMfAhtrnc_9cEGqM8GfhT2PTbf-IfA6Q_LJ6zYdCvg4N9K'
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'l1',
    type: 'security',
    user: 'DSavani',
    action: 'changed security policy for warehouse',
    target: '"Delta"',
    timeAndDate: '12:45 PM • Aug 24'
  },
  {
    id: 'l2',
    type: 'person_add',
    user: 'System',
    action: 'New Manager account created for',
    target: 'DSuthar.',
    timeAndDate: '09:12 AM • Aug 24'
  },
  {
    id: 'l3',
    type: 'warning',
    user: 'Firewall',
    action: 'Multiple failed login attempts detected from IP',
    target: '192.168.1.45',
    timeAndDate: '02:30 AM • Aug 24'
  }
];
