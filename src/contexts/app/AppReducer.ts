import type { IAppContextState } from "./AppContext";
import { ACTION_SET_BUSINESS_ID, ACTION_SET_APP_INIT, ACTION_SET_USER } from "./AppActions";
import { IUserInfo } from "../../data/getUser";

/**
 * All of the possible actions that can be dispatched
 * to the reducer, paired with their corresponding
 * payloads.
 */
export type AppContextDispatchActions =
  | {
      type: typeof ACTION_SET_BUSINESS_ID;
      payload: number;
    }
  | {
      type: typeof ACTION_SET_USER;
      payload: IUserInfo | null;
    }
  | {
      type: typeof ACTION_SET_APP_INIT;
      payload: "default" | "pending" | "success" | "error";
  }

/**
 * The reducer used in the AppContext
 */
export const appContextReducer = (
  state: IAppContextState,
  action: AppContextDispatchActions
): IAppContextState => {
  switch (action.type) {
    case ACTION_SET_BUSINESS_ID:
      return {
        ...state,
        activeBusinessId: action.payload
      };
    case ACTION_SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ACTION_SET_APP_INIT:
      return {
        ...state,
        appInitState: action.payload
      };
    default:
      return state;
  }
};
