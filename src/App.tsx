import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
  useLocation,
  useMatch
} from "react-router-dom";
import { Header } from "./Header/Header";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Trips } from "./pages/Trips/Trips";
import { Billing } from "./pages/Billing/Billing";
import { Debugging } from "./Debugging/Debugging";
import "./App.css";
import { AppContextProvider, useAppContext } from "./contexts/app/AppContext";
import { useEffect, useState } from "react";
import { getUser } from "./data/getUser";
import { CompanyChooserModal } from "./CompanyChooserModal";

/**
 * Still need to prove:
 *  Nested Routes (/billing, /billing/accounts, /billing/invoices)
 *  Overriding Link and useNavigate
 */

function parseCompanyId(maybeCompanyId: any) {
  const companyIdNum = parseInt(maybeCompanyId);
  if (!Number.isNaN(companyIdNum) && companyIdNum > 0) {
    return companyIdNum
  }

  return NaN;
}

function PageLayout() {
  const { state: { user } } = useAppContext();
  
  const rrParams = useParams();
  const companyIdNumOrNaN = parseCompanyId(rrParams?.companyId);
  const hasValidCompanyId = !Number.isNaN(companyIdNumOrNaN);

  console.log("PageLayout", { companyId: rrParams?.companyId, user, companyIdNumOrNaN, hasValidCompanyId })

  switch (true) {
    case hasValidCompanyId && user?.role === "superadmin":
      // They are allowed to access /company/:companyId. Everything is fine. Pass through.
      break;
    case !hasValidCompanyId && user?.role === "superadmin":
      // Need to show them a picker.
      return (<CompanyChooserModal />)
      break;
    case hasValidCompanyId && user?.role === "user":
      // They're trying to go to companyId, but they cannot. So remove it and redirect.
      // Just send them to the base site. (remove companyId)
      const urlWithoutCompanyPrefix = rrParams["*"] ? rrParams["*"] : "/"
      return <Navigate to={urlWithoutCompanyPrefix} />
      break;
    case !hasValidCompanyId && user?.role === "user":
      // Just send them to the base site. Everything is fine. Pass through.
      break;
  }

  return (
    <>
      <Header />
      <Debugging />
      <Outlet />
    </>
  );
}

function ActualRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="trips" element={<Trips />} />
      <Route path="billing" element={<Billing />} />

      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/company/:companyId/*" element={<ActualRoutes />} />
        <Route path="*" element={<ActualRoutes />} />
      </Route>
    </Routes>
  );
}

function AppWithAllProviders() {
  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
}

/**
 * 1)
 * User arrive at the site with a url. Either:
 *  - /company/:companyId/
 *  - /company/:companyId/billing
 *  - /
 *  - /billing
 *
 * 2)
 * Show loading spinner and start running logic in <AppInit />.
 *
 * 3)
 * Try to log in the user or check if already logged in. Get token.
 * Parse token and find list of business Ids and/or user role.
 * At this point, I'm still showing the loading spinner.
 * Now I know which URL they were trying to load, and which companyIds they have access to.
 *
 * 4)
 * If role===superadmin
 *   Must go to company/:companyId
 *     If already going to companyId, verify it's in their list
 *      If in their list, send them on their way
 *      If not in their list
 *        Trigger the company chooser modal
 *     If not already going to companyId, trigger the company chooser modal
 *
 * If role===user
 *
 * If user role is "superadmin",
 */

// Just pseudo code
// function determineWhatToDo(
//   intendedURL: string,
//   role: "user" | "superadmin",
//   companyIds: string[],
// ): string {
//   if (role === "superadmin") {
//     //
//   } else {
//     //
//   }
// }

/**
 *
 */
function AppInit({ children }: { children: React.ReactNode }) {
  // Cannot `useParams()` here. Has to be used within a route.
  // const RRParams = useParams();
  // But I can `useLocation` and string.split
  // const RRLocation = useLocation();
  // I can also try to match like this
  const match = useMatch('/company/:companyId/*');
  const {
    state: { activeBusinessId, user, appInitState },
    dispatch,
  } = useAppContext();

  
  // if (match && match?.params?.companyId) {
  //   const intendedCompanyId = match?.params?.companyId;
  //   console.log("AppInit", { intendedCompanyId, match, user, appInitState });
  // }

  useEffect(() => {
    if (activeBusinessId || appInitState !== "default") {
      return;
    }
    dispatch({ type: "SET_APP_INIT", payload: "pending" });
    // Log in the user, get back token, check role and business ids
    getUser("superadmin").then((user) => {
      dispatch({ type: "SET_USER", payload: { ...user } });
      dispatch({ type: "SET_BUSINESS_ID", payload: user.companyIds[0] });
      dispatch({ type: "SET_APP_INIT", payload: "success" });

      // What to do about the URL?
    });
  }, [appInitState, dispatch, activeBusinessId]);

  switch (appInitState) {
    case "default":
      return <div>Loading...</div>;
    case "pending":
      return <div>Loading...</div>;
    case "success":
      return activeBusinessId ? <>{children}</> : null;
    case "error":
      return <div>Error! No Business ID Found.</div>;
    default:
      return null;
  }

  return null;
}

function Providers() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AppInit>
          <AppWithAllProviders />
        </AppInit>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default Providers;
