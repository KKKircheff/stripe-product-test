
export interface Plan {
  id?: string;
  object?: 'plan';
  active?: boolean;
  aggregate_usage?: null | string;
  amount: number;
  amount_decimal?: string;
  billing_scheme?: string;
  created?: number;
  currency: string;
  interval: string;
  interval_count?: number;
  livemode?: boolean;
  metadata?: Record<string, any>;
  nickname?: string;
  product: string;
  tiers_mode?: null | string;
  transform_usage?: null | string;
  trial_period_days?: null | number;
  usage_type?: string;
}
  export interface PackageDimensions {
    height: number
    length: number
    weight: number
    width: number
    }
    
    export interface DefaultPrice {
    id: string;
    object?: string;
    active?: boolean;
    billing_scheme?: string;
    created?: number;
    currency: string;
    custom_unit_amount?: null | number;
    livemode?: boolean;
    lookup_key?: null | string;
    metadata?: Record<string, any>;
    nickname?: string;
    product?: string;
    recurring?: {
    aggregate_usage?: null | string;
    interval?: string;
    interval_count?: number;
    usage_type?: string;
    };
    tax_behavior?: string;
    tiers_mode?: null | string;
    transform_quantity?: null | string;
    type?: string;
    unit_amount?: number;
    unit_amount_decimal?: string;
    }
    
    export interface Product {
    active?: boolean | null
    attributes?: (string)[] | null
    caption?: string | null
    created: number
    deactivate_on?: any[]
    default_price?: DefaultPrice | string
    description?: string | null
    id: string
    images: (string)[]
    livemode: boolean
    metadata: { [key: string]: string }
    name: string
    object: "product"
    package_dimensions?: PackageDimensions | null
    shippable?: boolean | null
    statement_descriptor?: string | null
    tax_code?: string | null
    type?: "good" | "service"
    unit_label?: string | null
    updated: number
    url?: string | null
    plan?: Plan[],
    }