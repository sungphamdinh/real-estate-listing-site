"use server";

import { PropertyCategory } from "./types";

const API_URL = process.env.API_URL ?? "https://139-59-232-15.sslip.io";

export interface ConsignmentInput {
  category: PropertyCategory;
  district: string;
  area: number;
  price?: number;
  description?: string;
  fullName: string;
  phone: string;
}

export async function submitConsignmentLead(
  input: ConsignmentInput
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const res = await fetch(`${API_URL}/consignments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const message = Array.isArray(body?.message)
        ? body.message.join(", ")
        : body?.message ?? `Yêu cầu thất bại (${res.status})`;
      return { ok: false, message };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Không thể gửi thông tin, vui lòng thử lại." };
  }
}
