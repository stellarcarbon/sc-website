export interface CheckoutFormData {
  tonnes: number;
  currency: CurrencyOptions;
  reason: ReasonOptions;
}

export enum CurrencyOptions {
  XLM = "XLM",
  USDC = "USDC",
}

export enum ReasonOptions {
  ENVIRONMENT = "ENVIRONMENT",
  HOUSEHOLD = "HOUSEHOLD",
  AIRTRAVEL = "AIRTRAVEL",
  ROADTRAVEL = "ROADTRAVEL",
}
