import * as React from "react";
import { BrowserHistory, createBrowserHistory } from "history";
import { Router } from "react-router-dom";

export const historySingleton = createBrowserHistory();

type CustomRouterProps = {
  basename?: string;
  children: React.ReactNode;
  history: BrowserHistory;
};

export function CustomRouter({
  basename,
  children,
  history,
}: CustomRouterProps) {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(
    () =>
      history.listen((newState) => {
        if (
          state.location.pathname.startsWith("/company/") &&
          !newState.location.pathname.startsWith("/company/")
        ) {
          // If on a company page, but navigating away from it
          historySingleton.replace(`/company/${state.location.pathname.split("/")[2]}${newState.location.pathname}`);
        } else {
          setState(newState);
        }
      }),
    [history, state],
  );

  return (
    <Router
      basename={basename}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    >
      {children}
    </Router>
  );
}
