import { Plan } from "@prisma/client";

interface Address {
  zip_code: string;
  street_name: string;
  street_number: string;
  neighborhood: string;
  city: string;
  federal_unit: string;
}

interface Payer {
  address: Address;
}

export interface Payment {
  installments: number;
  name: any;
  cpf: any;
  payer?: Payer;
  zip_code?: string;
  street_name?: string;
  street_number?: string;
  neighborhood?: string;
  city?: string;
  federal_unit?: string;
  id: string;
  userId: string;
  externalId?: string;
  status: PaymentStatus;
  currency: string;
  amount: number;
  paymentMethod?: string;
  paymentMethodId?: string;
  paymentProvider: string;
  paymentUrl?: string;
  transactionDetails?: any;
  notificationSent: boolean;
  email: string;
  recipient: string;
  plan: Plan;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELED";

export interface PaymentStatusPercentage {
  status: PaymentStatus;
  count: number;
  percentage: number;
}
