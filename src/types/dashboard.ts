export type SubscriptionStatus = 'Active' | 'Pending' | 'Canceled';
export type SubscriptionPlan = 'Basic' | 'Pro' | 'Premium' | 'Enterprise';

export interface Subscription {
  id: string;
  customerName: string;
  customerEmail?: string;
  plan: SubscriptionPlan;
  date: string; // MM/DD/YYYY
  status: SubscriptionStatus;
  amount: number;
  avatarUrl?: string;
  initials?: string;
  color?: string;
  createdBy?: string;
  createdAt?: string;
}

export interface KpiMetric {
  id: string;
  title: string;
  indexNumber: number;
  value: string;
  change?: string;
  trend: 'up' | 'down' | 'neutral';
  type: 'sparkline' | 'avatars' | 'barchart' | 'donut' | 'conversion';
  numericValue?: number;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  target: number;
  users: number;
}

export type NavItem =
  | 'Dashboard'
  | 'Users'
  | 'Analytics'
  | 'Subscriptions'
  | 'Payments'
  | 'Settings'
  | 'Reports'
  | 'Support';
