import { NavigateToRoot, Route, Routes } from "../../lib/react-router-dom";
import { BillingIndex } from "./BillingIndex";
import { BillingSummary } from "./BillingSummary";

export function BillingRoutes() {
  return (
    <Routes>
      <Route index element={<BillingIndex />} />
      <Route path="summary" element={<BillingSummary />} />

      <Route path="*" element={<NavigateToRoot />} />
    </Routes>
  );
}
