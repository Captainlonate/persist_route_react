import * as RR from "react-router-dom";
import { buildCompanyPath, isCompanyPath, getCompanyPathFromUrl } from './helpers'

type UseNavigateArgs =
  | [delta: number]
  | [to: RR.To, options?: RR.NavigateOptions];

export const useNavigate: typeof RR.useNavigate = () => {
  const rrNavigate = RR.useNavigate();

  function overriddenNavigate(...args: UseNavigateArgs) {
    const [path, navigateOptions] = args;

    if (typeof path === "number") {
      return rrNavigate(path);
    } else {
      // If /company/:companyId is already in the url, then we want to retain it
      const companyIdFromUrl = getCompanyPathFromUrl();

      if (companyIdFromUrl) {
        if (typeof path === "string" && !isCompanyPath(path)) {
          return rrNavigate(buildCompanyPath(companyIdFromUrl, path), navigateOptions);
        } else if (typeof path === "object" && !isCompanyPath(path?.pathname)) {
          return rrNavigate({
            ...path,
            pathname: buildCompanyPath(companyIdFromUrl, path?.pathname)
          }, navigateOptions);
        }
      }

      return rrNavigate(path, navigateOptions);
    }
  }

  return overriddenNavigate;
};
