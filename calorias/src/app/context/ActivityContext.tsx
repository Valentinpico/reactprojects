"use client";
import {
  initialState,
  ActivityActions,
  activityReducer,
  ActivityState,
} from "../reducers/activity-reducer";
import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  totalConsumed: number;
  totalBurned: number;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

type ActivityProviderProps = {
  children: ReactNode;
};

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const totalConsumed = useMemo(
    () =>
      state.activities.reduce(
        (acc, activity) => (activity.name == 1 ? acc + activity.calories : acc),
        0
      ),
    [state.activities]
  );
  const totalBurned = useMemo(
    () =>
      state.activities.reduce(
        (acc, act) => (act.name == 2 ? acc + act.calories : acc),
        0
      ),
    [state.activities]
  );

  return (
    <ActivityContext.Provider
      value={{ state, dispatch, totalConsumed, totalBurned }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
