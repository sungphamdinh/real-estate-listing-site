export type PropertyCategory = "MAT_TIEN" | "HEM" | "CAN_HO" | "DAT_NEN";

export type LegalDocument = "SO_DO_SO_HONG" | "HOP_DONG_MUA_BAN" | "DANG_CHO_SO";

export type HouseDirection =
  | "DONG"
  | "TAY"
  | "NAM"
  | "BAC"
  | "DONG_BAC"
  | "TAY_BAC"
  | "TAY_NAM"
  | "DONG_NAM";

export interface Property {
  id: string;
  title: string;
  description: string | null;
  category: PropertyCategory;
  price: number;
  address: string;
  width: number | null;
  length: number | null;
  floors: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  images: string[];
  legalDocument: LegalDocument | null;
  direction: HouseDirection | null;
  recognizedArea: number | null;
  floorArea: number | null;
  legalVerified: boolean;
  completionVerified: boolean;
  bankSupport: boolean;
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
