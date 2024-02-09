import { forwardRef } from "react";
import * as RR from "react-router-dom";

// export const Link: typeof RR.Link = forwardRef((props) => {
//   return <RR.Link {...props} />;
// });

// export const NavLink: typeof RR.NavLink = forwardRef((props) => {
//   return <RR.NavLink {...props} />;
// });

export const Navigate: typeof RR.Navigate = (props) => {
  return RR.Navigate(props);
};
