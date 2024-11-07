import { Activity } from "../types";

export const saveToLocalStorage = (activities: Activity[]) => {
  const activitiesJson = JSON.stringify(activities);

  localStorage.setItem("activities", activitiesJson);
};

export const getActivitiesFromLocalStorage = () => {
  const activitiesJson = localStorage.getItem("activities");

  if (!activitiesJson) {
    return [];
  }

  return JSON.parse(activitiesJson);
};
