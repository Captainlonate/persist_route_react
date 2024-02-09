import { forwardRef } from "react";
import * as RR from "react-router-dom";
import { buildCompanyPath, getCompanyPathFromUrl } from "./helpers";

function updateTo(to: RR.To): RR.To {
  const companyIdFromUrl = getCompanyPathFromUrl();

  if (companyIdFromUrl) {
    switch (typeof to) {
      case "string":
        return buildCompanyPath(companyIdFromUrl, to);
      case "object":
        return {
          ...to,
          pathname: buildCompanyPath(companyIdFromUrl, to.pathname),
        };
    }
  }

  return to;
}

export const Link: typeof RR.Link = forwardRef((props, ref) => {
  // If there is a companyId in the url, then we want to retain it
  return <RR.Link ref={ref} {...props} to={updateTo(props.to)} />;
});

export const NavLink: typeof RR.NavLink = forwardRef((props, ref) => {
  // If there is a companyId in the url, then we want to retain it
  return <RR.NavLink ref={ref} {...props} to={updateTo(props.to)} />;
});

export const Navigate: typeof RR.Navigate = (props) => {
  return RR.Navigate(props);
};
