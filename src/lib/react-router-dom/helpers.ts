export function removeLeadingSlash(path: string | undefined | null): string {
  path = path || "";
  return path.startsWith("/") ? path.slice(1) : path;
}

export function buildCompanyPath(companyId: string, path: string | undefined | null) {
  return `/company/${companyId}/${removeLeadingSlash(path)}`;
}

const companyIdRegex = RegExp(/^\/company\/(?<companyId>\d+)/i);

export function isCompanyPath(path: string | undefined | null) {
  return path && companyIdRegex.test(path);
}

export function getCompanyPathFromUrl() {
  const matches = window.location.pathname.match(companyIdRegex);
  return matches?.groups?.companyId ?? null;
}

/**
 * If `/company/:companyId/` is in the URL already, that will be the root path.
 * Otherwise `/` is the root path.
 */
export function getRootPath() {
  const companyIdFromUrl = getCompanyPathFromUrl();
  
  if (companyIdFromUrl) {
    return `/company/${companyIdFromUrl}/`;
  }

  return "/";
}