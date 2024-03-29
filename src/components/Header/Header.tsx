import { OrgNavLink } from "../../lib/react-router-dom";
import "./header.css";

// I just pulled this out of react-router-dom. It wasn't exported.
// This is NOT important for this example. Just ignore it.
// I just wanted to be able to mark the active link in the header.
type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

function setClassNameIfActive(props: NavLinkRenderProps) {
  const active = props.isActive ? "active__yes" : "active__no";

  return ["navlink", active].join(" ");
}

export function Header() {
  return (
    <header id="header--root">
      <h1>Header</h1>
      <nav id="header--root--nav">
        <OrgNavLink to="/" end className={setClassNameIfActive}>
          Dashboard <em>(OrgNavLink)</em>
        </OrgNavLink>
        <OrgNavLink to="/trips" end className={setClassNameIfActive}>
          Trips <em>(OrgNavLink)</em>
        </OrgNavLink>
        <div>
          <OrgNavLink to="/billing" end className={setClassNameIfActive}>
            Billing <em>(OrgNavLink)</em>
          </OrgNavLink>
          <br />
          <OrgNavLink to="/billing/summary" end className={setClassNameIfActive}>
            Billing/Summary <em>(OrgNavLink)</em>
          </OrgNavLink>
        </div>
      </nav>
    </header>
  );
}
