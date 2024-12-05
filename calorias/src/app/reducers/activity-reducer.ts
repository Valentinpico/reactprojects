import type { Activity } from "../types";
import { getActivitiesFromLocalStorage } from "../db/localStorage";

export type ActivityActions =
  | { type: "ADD_ACTIVITY"; payload: { newActivity: Activity } }
  | { type: "SET_ACTIVITY_ID"; payload: { id: Activity["id"] } }
  | { type: "UPDATE_ACTIVITY"; payload: { id: string; newActivity: Activity } }
  | { type: "DELETE_ACTIVITY"; payload: { id: Activity["id"] } }
  | { type: "RESET_APP" };

export type ActivityState = {
  activities: Activity[];
  id: Activity["id"];
};

export const initialState: ActivityState = {
  activities: getActivitiesFromLocalStorage() ?? [],
  id: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "ADD_ACTIVITY") {
    return {
      activities: [...state.activities, action.payload.newActivity],
      id: "",
    };
  }

  if (action.type === "SET_ACTIVITY_ID") {
    return {
      ...state,
      id: action.payload.id,
    };
  }

  if (action.type === "UPDATE_ACTIVITY") {
    return {
      activities: state.activities.map((activity) =>
        activity.id === action.payload.id
          ? action.payload.newActivity
          : activity
      ),
      id: "",
    };
  }
  if (action.type === "DELETE_ACTIVITY") {
    return {
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
      id: "",
    };
  }
  if (action.type === "RESET_APP") {
    return {
      activities: [],
      id: "",
    };
  }

  return state;
};
