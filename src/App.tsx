import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from "./lib/react-router-dom";
// import {
//   CustomRouter,
//   historySingleton,
// } from "./components/CustomRouter/CustomRouter";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Trips } from "./pages/Trips/Trips";
import { BillingRoutes } from "./pages/Billing/BillingRoutes";
import { Debugging } from "./components/Debugging/Debugging";
import "./App.css";
import { AppContextProvider, useAppContext } from "./contexts/app/AppContext";
import { useEffect } from "react";
import { getUser } from "./data/getUser";
import { CompanyChooserModal } from "./components/CompanyChooserModal";

/**
 * Convenient place to store config for this PoC demo.
 */
const DEMO_CONFIG = {
  /**
   * Which user role we are prentending to be logged in as
   */
  fakeUserRole: "superadmin",
} as const;

/**
 * parseCompanyId(undefined) => NaN
 * parseCompanyId(null) => NaN
 * parseCompanyId('abc') => NaN
 * parseCompanyId({}) => NaN
 * parseCompanyId("123") => 123
 * parseCompanyId(123) => 123
 */
function parseCompanyId(maybeCompanyId: any) {
  const companyIdNum = parseInt(maybeCompanyId);
  if (!Number.isNaN(companyIdNum) && companyIdNum > 0) {
    return companyIdNum;
  }

  return NaN;
}

/**
 * This should run on all route changes. The only way a route actually renders
 * is if this renders <Outlet />.
 */
function PageLayoutAndRoleChecker() {
  const appContext = useAppContext();
  const userRole = appContext.state.user?.role;

  const routeParams = useParams();
  const companyIdInUrl = parseCompanyId(routeParams?.companyId);
  const validCompanyInUrl = !Number.isNaN(companyIdInUrl);

  switch (true) {
    case validCompanyInUrl && userRole === "superadmin": {
      // They are allowed to access /company/:companyId. Everything is fine. Pass through.
      break;
    }
    case !validCompanyInUrl && userRole === "superadmin": {
      // Need to show them a picker.
      return <CompanyChooserModal />;
    }
    case validCompanyInUrl && userRole === "user": {
      // They're trying to go to companyId, but they cannot. So remove it and redirect.
      // Just send them to the base site. (remove companyId)
      const urlWithoutCompanyPrefix = routeParams["*"]
        ? `/${routeParams["*"]}`
        : "/";
      return <Navigate to={urlWithoutCompanyPrefix} />;
    }
    case !validCompanyInUrl && userRole === "user": {
      // Just send them to the base site. Everything is fine. Pass through.
      break;
    }
  }

  return (
    <>
      <Header />
      <Debugging />
      {/* Render the actual <Route /> components at this <Outlet /> */}
      <Outlet />
    </>
  );
}

function ActualRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="trips" element={<Trips />} />
      <Route path="billing/*" element={<BillingRoutes />} />

      <Route path="*" element={<Navigate to="." replace />} />
      {/* <Route path="404" element={<Navigate to="." replace />} /> */}
    </Routes>
  );
}

/**
 * When the user arrives at the site, and they sign in, we know:
 * 1. Where they are trying to go (/company/:companyId, /trips, /)
 * 2. Their role (superadmin, user)
 * 3. List of companyIds they are allowed to access (from the token)
 *
 * Assumptions:
 * 1. If superadmin shares /company/:companyId/trips with a user, we remove
 *    the prefix and send them to /trips.
 * 2. I handle the logic (even the initial logic) in a "<AuthRoute />" at the route level.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayoutAndRoleChecker />}>
        <Route path="/company/:companyId/*" element={<ActualRoutes />} />
        <Route path="*" element={<ActualRoutes />} />
      </Route>
    </Routes>
  );
}

/**
 * Pretend to log in the user. THen set that user object in
 * global Context. Don't render children until we have a user.
 * Meaning, don't render any routes until logged in.
 */
function AppInit({ children }: { children: React.ReactNode }) {
  const {
    state: { user, appInitState },
    dispatch,
  } = useAppContext();

  useEffect(() => {
    if (user || appInitState !== "default") {
      return;
    }
    dispatch({ type: "SET_APP_INIT", payload: "pending" });
    // "Log In" the user, then store in app context
    getUser(DEMO_CONFIG.fakeUserRole).then((user) => {
      dispatch({ type: "SET_USER", payload: { ...user } });
      dispatch({ type: "SET_APP_INIT", payload: "success" });
    });
  }, [appInitState, dispatch, user]);

  switch (appInitState) {
    case "default":
      return <div>Loading...</div>;
    case "pending":
      return <div>Loading...</div>;
    case "success":
      return user ? <>{children}</> : null;
    case "error":
      return <div>Error! No Business ID Found.</div>;
    default:
      return null;
  }
}

function Providers() {
  return (
    // Using BrowserRouter here, even though members has a custom router
    // <CustomRouter history={historySingleton}>
    <BrowserRouter>
      <AppContextProvider>
        <AppInit>
          <AppRoutes />
        </AppInit>
      </AppContextProvider>
    {/* </CustomRouter> */}
    </BrowserRouter>
  );
}

export default Providers;
