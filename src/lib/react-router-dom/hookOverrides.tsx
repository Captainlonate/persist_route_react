import * as RR from "react-router-dom";

type UseNavigateArgs =
  | [delta: number]
  | [to: RR.To, options?: RR.NavigateOptions];

export const useNavigate: typeof RR.useNavigate = () => {
  const originalNavigate = RR.useNavigate();

  const overriddenNavigate = (...args: UseNavigateArgs) => {
    const [arg1, arg2] = args;
    if (typeof arg1 === "number") {
      // This is a goBack or goForward
      return originalNavigate(arg1);
    } else {
      // const shouldPrefix =
      return originalNavigate(arg1, arg2);
    }
  };

  return overriddenNavigate;
};
