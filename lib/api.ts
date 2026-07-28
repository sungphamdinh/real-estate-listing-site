import { BaseResponse, PaginatedProperties, Property } from "./types";
import { MOCK_PROPERTIES } from "./mock-properties";

const API_URL = process.env.API_URL ?? "https://139-59-232-15.sslip.io";

export async function fetchProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_URL}/properties?page=1&limit=50`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`GET /properties failed: ${res.status}`);
    const body: BaseResponse<PaginatedProperties> = await res.json();
    return body.data.data;
  } catch (err) {
    console.warn("[api] falling back to mock properties:", err);
    return MOCK_PROPERTIES;
  }
}

export async function fetchProperty(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`${API_URL}/properties/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`GET /properties/${id} failed: ${res.status}`);
    const body: BaseResponse<Property | null> = await res.json();
    return body.data;
  } catch (err) {
    console.warn(`[api] falling back to mock property ${id}:`, err);
    return MOCK_PROPERTIES.find((p) => p.id === id) ?? null;
  }
}
