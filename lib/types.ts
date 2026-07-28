export type PropertyType = "SALE" | "RENT";

export interface Property {
  id: string;
  title: string;
  description: string | null;
  type: PropertyType;
  price: number;
  address: string;
  width: number | null;
  length: number | null;
  floors: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  images: string[];
  contact: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProperties {
  data: Property[];
  total: number;
  page: number;
  lastPage: number;
}

export interface BaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
