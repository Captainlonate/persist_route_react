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
        console.log({
          "window.location": window.location,
          newState: newState.location,
        });
        if (
          window.location.pathname.startsWith("/company/") &&
          !newState.location.pathname.startsWith("/company/")
        ) {
          console.log(
            "You are on a company route, and about to leave the company route.",
          );
        }
        setState(newState);
      }),
    [history],
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
