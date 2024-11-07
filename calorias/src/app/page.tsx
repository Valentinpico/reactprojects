"use client";

import { Form } from "./components/Form";
import { use, useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import { ActivityList } from "./components/ActivityList";
import { saveToLocalStorage } from "./db/localStorage";
import { CaloriesTable } from "./components/CaloriesTable";

export default function Home() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const restartApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  useEffect(() => {
    saveToLocalStorage(state.activities);
  }, [state.activities]);

  return (
    <>
      <header className="bg-blue-500 p-4">
        <div className="flex justify-between max-w-4xl mx-auto">
          <h1 className="text-center text-lg font-bold uppercase text-white mt-1">
            Cotador de calorias
          </h1>
          <button
            disabled={!restartApp()}
            className="bg-white text-blue-700 px-5 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer "
            onClick={() => dispatch({ type: "RESET_APP" })}
          >
            Reinciar app
          </button>
        </div>
      </header>
      <section className="bg-gray-700 py-20 px-5">
        <div className="max-w-4xl mx-auto ">
          <Form
            dispatch={dispatch}
            idActivity={state.id}
            activities={state.activities}
          />
        </div>
      </section>

      <section className="bg-gray-900 py-6  ">
        <CaloriesTable activities={state.activities} />
      </section>

      <section className="bg-gray-500 py-28 px-5">
        <ActivityList dispatch={dispatch} activities={state.activities} />
      </section>
    </>
  );
}
