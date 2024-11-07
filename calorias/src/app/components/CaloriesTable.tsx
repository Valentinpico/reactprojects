import React, { act, use, useMemo } from "react";
import { Activity } from "../types";

type CaloriesTableProps = {
  activities: Activity[];
};
export const CaloriesTable = ({ activities }: CaloriesTableProps) => {
  const totalConsumed = useMemo(
    () =>
      activities.reduce(
        (acc, activity) => (activity.name == 1 ? acc + activity.calories : acc),
        0
      ),
    [activities]
  );
  const totalBurned = useMemo(
    () =>
      activities.reduce(
        (acc, act) => (act.name == 2 ? acc + act.calories : acc),
        0
      ),
    [activities]
  );

  return (
    <div className="w-6/12 m-auto text-white">
      <h1 className=" text-4xl text-center pt-1 font-bold uppercase">
        Resumen de calorias
      </h1>
      <div className="flex justify-between mt-4 text-2xl ">
        <CaloriesTableShape calories={totalConsumed} text="Consumidas" />
        <CaloriesTableShape calories={totalBurned} text="Quemadas" />
        <CaloriesTableShape
          calories={totalConsumed - totalBurned}
          text="Total"
        />
      </div>
    </div>
  );
};
type CaloriesTableShapeProps = {
  calories: number;
  text: string;
};
const CaloriesTableShape = ({ calories, text }: CaloriesTableShapeProps) => {
  return (
    <div className="text-center lowercase ">
      <h2 className=" text-center text-6xl font-bold">{calories}</h2>
      <span className=" text-lg">{text}</span>
    </div>
  );
};
