import { OrgLink } from "../../lib/react-router-dom";
import { useAppContext } from "../../contexts/app/AppContext";
import "./companyChooserModal.css";

export function CompanyChooserModal() {
  const {
    state: { user },
  } = useAppContext();

  const companyIds = user?.companyIds ?? [];

  return (
    <div id="companychooser">
      <h1>Choose your company</h1>
      <div className="companychooser--links">
        {companyIds.map((companyId) => (
          <OrgLink
            className="companychooser--link"
            key={companyId}
            to={`/company/${companyId}/`}
          >
            &lt;OrgLink to="{`/company/${companyId}/`}" /&gt;
          </OrgLink>
        ))}
      </div>
    </div>
  );
}
