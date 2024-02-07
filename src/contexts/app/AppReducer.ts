import type { IAppContextState } from "./AppContext";
import { ACTION_SET_BUSINESS_ID } from "./AppActions";

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
        businessId: action.payload
      };
    default:
      return state;
  }
};
