"use client";

import { useState } from "react";

function formatVnd(n: number): string {
  return Math.round(n).toLocaleString("vi-VN") + " VND";
}

// Declining-balance (equal-principal) amortization: monthly principal is
// fixed at loanAmount/months, and each month's interest is charged on the
// remaining balance at that point - so the payment is highest in month 1
// and lowest in the final month.
function computeLoan(loanAmount: number, months: number, annualRatePercent: number) {
  const monthlyPrincipal = loanAmount / months;
  const monthlyRate = annualRatePercent / 100 / 12;

  let totalInterest = 0;
  let remaining = loanAmount;
  for (let i = 0; i < months; i++) {
    totalInterest += remaining * monthlyRate;
    remaining -= monthlyPrincipal;
  }

  const maxMonthlyPayment = monthlyPrincipal + loanAmount * monthlyRate;
  const minMonthlyPayment = monthlyPrincipal + monthlyPrincipal * monthlyRate;

  return {
    minMonthlyPayment,
    maxMonthlyPayment,
    totalInterest,
    totalPayment: loanAmount + totalInterest,
  };
}

export default function LoanCalculator({ propertyPrice }: { propertyPrice: number }) {
  const [loanPercent, setLoanPercent] = useState(30);
  const [monthsInput, setMonthsInput] = useState("120");
  const [rateInput, setRateInput] = useState("6");

  const months = Number(monthsInput) || 0;
  const annualRatePercent = Number(rateInput) || 0;

  const loanAmount = propertyPrice * (loanPercent / 100);
  const safeMonths = months > 0 ? months : 1;
  const { minMonthlyPayment, maxMonthlyPayment, totalInterest, totalPayment } = computeLoan(
    loanAmount,
    safeMonths,
    annualRatePercent
  );

  const labelStyle: React.CSSProperties = { fontWeight: 700, fontSize: 14, marginBottom: 4 };
  const valueStyle: React.CSSProperties = { fontSize: 15, color: "oklch(0.4 0.01 250)", marginBottom: 16 };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 42,
    borderRadius: 8,
    border: "1px solid oklch(0.85 0.01 250)",
    padding: "0 12px",
    fontSize: 15,
    marginBottom: 16,
  };

  return (
    <div style={{ background: "#fff", border: "1px solid oklch(0.9 0.005 250)", borderRadius: 14, padding: 20 }}>
      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Bảng Tính Lãi Suất Vay</div>

      <div style={labelStyle}>Giá trị bất động sản</div>
      <div style={valueStyle}>{formatVnd(propertyPrice)}</div>

      <div style={labelStyle}>Số tiền vay ({loanPercent}%)</div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={loanPercent}
        onChange={(e) => setLoanPercent(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--accent)", marginBottom: 8 }}
      />
      <div style={valueStyle}>{formatVnd(loanAmount)}</div>

      <div style={labelStyle}>Thời gian vay (tháng)</div>
      <input
        type="number"
        min={1}
        value={monthsInput}
        onChange={(e) => setMonthsInput(e.target.value)}
        style={inputStyle}
      />

      <div style={labelStyle}>Lãi suất (%/năm)</div>
      <input
        type="number"
        min={0}
        step={0.1}
        value={rateInput}
        onChange={(e) => setRateInput(e.target.value)}
        style={inputStyle}
      />

      <div style={labelStyle}>Số tiền trả hàng tháng:</div>
      <div style={valueStyle}>
        từ {formatVnd(minMonthlyPayment)} đến {formatVnd(maxMonthlyPayment)}
      </div>

      <div style={labelStyle}>Tổng lãi phải trả:</div>
      <div style={valueStyle}>{formatVnd(totalInterest)}</div>

      <div style={labelStyle}>Tổng tiền phải trả (gốc + lãi):</div>
      <div style={{ ...valueStyle, marginBottom: 0 }}>{formatVnd(totalPayment)}</div>
    </div>
  );
}
