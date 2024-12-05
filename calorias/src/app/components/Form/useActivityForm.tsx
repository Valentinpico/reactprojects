import { useState, ChangeEvent, useEffect } from "react";
import { Activity } from "../../types/index";
const initialStateActivity: Activity = {
  id: "",
  name: 1,
  activity: "",
  calories: 0,
};
export const useActivityForm = () => {
  const [activity, setActivity] = useState<Activity>(initialStateActivity);

  const resetActivity = () => setActivity(initialStateActivity);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumberField = ["calories", "name"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const validActivity = () => {
    return activity.activity !== "" && activity.calories > 0;
  };

  useEffect(() => {
    if (activity.id === "") {
      setActivity(initialStateActivity);
    }
  }, [activity.id]);

  return { activity, handleChange, validActivity, resetActivity, setActivity };
};
