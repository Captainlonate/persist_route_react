import { NavLink } from "../../lib/react-router-dom";
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
        <NavLink to="/" end className={setClassNameIfActive}>
          Dashboard <em>(NavLink)</em>
        </NavLink>
        <NavLink to="/trips" end className={setClassNameIfActive}>
          Trips <em>(NavLink)</em>
        </NavLink>
        <div>
          <NavLink to="/billing" end className={setClassNameIfActive}>
            Billing <em>(NavLink)</em>
          </NavLink>
          <br />
          <NavLink to="/billing/summary" end className={setClassNameIfActive}>
            Billing/Summary <em>(NavLink)</em>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
