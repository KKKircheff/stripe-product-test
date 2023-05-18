// export interface PackageDimensions {
//     /**
//      * Height, in inches.
//      */
//     height: number
//     /**
//      * Length, in inches.
//      */
//     length: number
//     /**
//      * Weight, in ounces.
//      */
//     weight: number
//     /**
//      * Width, in inches.
//      */
//     width: number
//   }
  
  
//   export interface DefaultPrice {
//     id: string;
//     object?: string;
//     active?: boolean;
//     billing_scheme?: string;
//     created?: number;
//     currency: string;
//     custom_unit_amount?: null | number;
//     livemode?: boolean;
//     lookup_key?: null | string;
//     metadata?: Record<string, any>;
//     nickname?: string;
//     product?: string;
//     recurring?: {
//       aggregate_usage?: null | string;
//       interval?: string;
//       interval_count?: number;
//       usage_type?: string;
//     };
//     tax_behavior?: string;
//     tiers_mode?: null | string;
//     transform_quantity?: null | string;
//     type?: string;
//     unit_amount?: number;
//     unit_amount_decimal?: string;
//   }

//   export interface Product {
//     /**
//      * Whether the product is currently available for purchase.
//      */
//     active?: boolean | null
//     /**
//      * A list of up to 5 attributes that each SKU can provide values for (e.g., `["color", "size"]`). Only applicable to products of `type=good`.
//      */
//     attributes?: (string)[] | null
//     /**
//      * A short one-line description of the product, meant to be displayable to the customer. Only applicable to products of `type=good`.
//      */
//     caption?: string | null
//     /**
//      * Time at which the object was created. Measured in seconds since the Unix epoch.
//      */
//     created: number
//     /**
//      * An array of connect application identifiers that cannot purchase this product. Only applicable to products of `type=good`.
//      */
//     deactivate_on?: any[]
//     /**
//      * The product's description, meant to be displayable to the customer. Only applicable to products of `type=good`.
//      */
//     default_price?:DefaultPrice 

//     description?: string | null
//     /**
//      * Unique identifier for the object.
//      */
//     id: string
//     /**
//      * A list of up to 8 URLs of images for this product, meant to be displayable to the customer. Only applicable to products of `type=good`.
//      */
//     images: (string)[]
//     /**
//      * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
//      */
//     livemode: boolean
//     /**
//      * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
//      */
//     metadata: { [key: string]: string }
//     /**
//      * The product's name, meant to be displayable to the customer. Applicable to both `service` and `good` types.
//      */
//     name: string
//     /**
//      * String representing the object's type. Objects of the same type share the same value.
//      */
//     object: "product"
//     /**
//      * The dimensions of this product for shipping purposes. A SKU associated with this product can override this value by having its own `package_dimensions`. Only applicable to products of `type=good`.
//      */
//     package_dimensions?: PackageDimensions | null
//     /**
//      * Whether this product is a shipped good. Only applicable to products of `type=good`.
//      */
//     shippable?: boolean | null
//     /**
//      * Extra information about a product which will appear on your customer's credit card statement. In the case that multiple products are billed at once, the first statement descriptor will be used. Only available on products of type=`service`.
//      */
//     statement_descriptor?: string | null
//     /**
//      * The type of the product. The product is either of type `good`, which is eligible for use with Orders and SKUs, or `service`, which is eligible for use with Subscriptions and Plans.
//      */
//     tax_code?: string | null,

//     type?: "good" | "service"
//     /**
//      * A label that represents units of this product, such as seat(s), in Stripe and on customers’ receipts and invoices. Only available on products of type=`service`.
//      */
//     unit_label?: string | null
//     updated: number
//     /**
//      * A URL of a publicly-accessible webpage for this product. Only applicable to products of `type=good`.
//      */
//     url?: string | null
//   }
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