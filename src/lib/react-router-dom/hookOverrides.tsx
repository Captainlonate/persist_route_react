import * as RR from "react-router-dom";

type UseNavigateArgs =
  | [delta: number]
  | [to: RR.To, options?: RR.NavigateOptions];

export const useNavigate: typeof RR.useNavigate = () => {
  const originalNavigate = RR.useNavigate();

  const overriddenNavigate = (...args: UseNavigateArgs) => {
    if (args.length === 1 && typeof args[0] === "number") {
      // This is a goBack or goForward
      return originalNavigate(args[0]);
    } else if (args.length === 2) {
      // The first argument is either a string, or an object representing
      // the intended "to=" path.
      return originalNavigate(...args);
    }
  };

  return overriddenNavigate;
};
