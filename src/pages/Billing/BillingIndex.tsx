import { useNavigateOrg } from "../../lib/react-router-dom";
import { NestedLinksInPage } from "../../components/NestedLinksInPage/NestedLinksInPage";

export function BillingIndex() {
  const navigate = useNavigateOrg();

  function onClick() {
    navigate("/trips");
  }

  return (
    <div>
      <h1>Billing Index</h1>
      <hr />
      <button onClick={onClick}>
        Click to programmatically navigate to "/trips"
      </button>
      <hr />
      <NestedLinksInPage />
    </div>
  );
}
