import { useNavigate } from "../../lib/react-router-dom";
import { NestedLinksInPage } from "../../components/NestedLinksInPage/NestedLinksInPage";

export function Billing() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/trips");
  }

  return (
    <div>
      <h1>Billing</h1>
      <hr />
      <button onClick={onClick}>
        Click to programmatically navigate to "/trips"
      </button>
      <hr />
      <NestedLinksInPage />
    </div>
  );
}
