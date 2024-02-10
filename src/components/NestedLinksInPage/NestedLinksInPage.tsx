import { OrgLink } from "../../lib/react-router-dom";
import "./nestedLinksInPage.css";

const links = ["/", "/trips", "/billing", "/billing/summary"] as const;

export function NestedLinksInPage() {
  return (
    <div className="nestedlinks">
      <div className="nestedlinks--links">
        {links.map((path) => (
          <OrgLink key={path} className="nestedlinks--link" to={path}>
            &lt;OrgLink to="{path}" /&gt;
          </OrgLink>
        ))}
      </div>
    </div>
  );
}
