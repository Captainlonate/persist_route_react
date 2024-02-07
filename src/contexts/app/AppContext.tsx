import type { Dispatch, ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";
import { appContextReducer, AppContextDispatchActions } from "./AppReducer";

/**
 * The type of the "state" stored within
 * the AppContext
 */
export interface IAppContextState {
  businessId: number;
}

/**
 * The initial state of the AppContext
 */
const initialContextState: IAppContextState = {
  businessId: 0,
};

/**
 * The App Context
 */
const AppContext = createContext(
  {} as {
    state: IAppContextState;
    dispatch: Dispatch<AppContextDispatchActions>;
  }
);

/**
 *
 */
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appContextReducer, {
    ...initialContextState,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 *
 */
export const useAppContext = () => useContext(AppContext);
