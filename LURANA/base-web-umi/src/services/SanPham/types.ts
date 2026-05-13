import type {
  ProductType,
  VariantType,
} from '@/types/catalog';

// =========================
// BASE RESPONSE
// =========================

export interface ProductResponse<T> {
  success: boolean;

  data: T;

  message?: string;
}

// =========================
// PRODUCT LIST
// =========================

export type ProductListResponse =
  ProductResponse<ProductType[]>;

// =========================
// PRODUCT DETAIL
// =========================

export type ProductDetailResponse =
  ProductResponse<
    ProductType | null
  >;

// =========================
// PRODUCT CREATE
// =========================

export interface CreateProductPayload {
  name: string;

  price: number;

  stock: number;

  image: string;

  active?: boolean;

  variants?: VariantType[];
}

export type CreateProductResponse =
  ProductResponse<ProductType>;

// =========================
// PRODUCT UPDATE
// =========================

export interface UpdateProductPayload
  extends Partial<CreateProductPayload> {}

export type UpdateProductResponse =
  ProductResponse<
    ProductType | null
  >;

// =========================
// PRODUCT STATUS
// =========================

export interface UpdateProductStatusPayload {
  active: boolean;
}

export type UpdateProductStatusResponse =
  ProductResponse<
    ProductType | null
  >;

// =========================
// PRODUCT DELETE
// =========================

export type DeleteProductResponse =
  ProductResponse<null>;