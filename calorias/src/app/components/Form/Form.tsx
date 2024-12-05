"use client";
import { Dispatch, FormEvent, use, useEffect } from "react";
import { Input } from "../../common/Input";
import { categories } from "../../data/categories";
import { useActivityForm } from "../../components/Form/useActivityForm";
import { ActivityActions } from "../../reducers/activity-reducer";
import { v4 as uuidv4 } from "uuid";
import { Activity } from "../../types";
import { useActivityContext } from "../../hooks/useActivityContext";

export const Form = () => {
  const { activity, handleChange, validActivity, resetActivity, setActivity } =
    useActivityForm();

  const { state, dispatch } = useActivityContext();

  const handleSumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.id !== "") {
      dispatch({
        type: "UPDATE_ACTIVITY",
        payload: { id: state.id, newActivity: activity },
      });
      resetActivity();
      return;
    }

    const newActivity = {
      ...activity,
      id: uuidv4(),
    };
    dispatch({ type: "ADD_ACTIVITY", payload: { newActivity: newActivity } });
    resetActivity();
  };

  useEffect(() => {
    const activityFind = state.activities.find(
      (activity) => activity.id === state.id
    );
    if (activityFind) {
      setActivity(activityFind);
    }
  }, [state.id]);

  return (
    <form
      onSubmit={handleSumit}
      className="space-y-5 shadow p-10 rounded-lg bg-white "
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name">Categoria:</label>
        <select
          className="rounded-md py-1 border border-slate-300 w-full bg-white"
          id="name"
          name="weight"
          value={activity.name}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        id="activity"
        placeholder="Ej. comida, gym, etc."
        label="Actividad"
        onChange={handleChange}
        value={activity.activity}
      />

      <Input
        type="number"
        id="calories"
        placeholder="Ej. 200, 500, etc."
        label="Calorias"
        onChange={handleChange}
        value={activity.calories}
      />

      <Input
        type="submit"
        id={"enviar"}
        className="bg-black text-white p-2 rounded-md w-full  cursor-pointer text-center disabled:opacity-20 disabled:cursor-not-allowed  hover:bg-slate-800"
        value={activity.name == 1 ? "Guardar comida" : "Guardar ejericio"}
        validate={!validActivity()}
      />
    </form>
  );
};
