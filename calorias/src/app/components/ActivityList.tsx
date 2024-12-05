/* hero icons */
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { useActivityContext } from "../hooks/useActivityContext";

export const ActivityList = () => {
  const { state, dispatch } = useActivityContext();
  const colorClass = (name: number) =>
    name == 1 ? "bg-amber-600" : "bg-lime-600";

  const activitiesLength = state.activities.length;

  const verifyNameActivity = (name: number) => {
    const category = categories.find((category) => category.id === name);
    return category?.name;
  };

  const setActivityID = (id: Activity["id"]) => () => {
    dispatch({ type: "SET_ACTIVITY_ID", payload: { id } });
  };

  const deleteActivity = (id: Activity["id"]) => () => {
    dispatch({ type: "DELETE_ACTIVITY", payload: { id } });
  };

  return (
    <div className="grid grid-cols-1 gap-6 bg-white w-6/12 m-auto p-5 rounded-sm">
      {activitiesLength &&
        state.activities.map((activity) => (
          <div
            className="bg-white py-5 rounded-md   px-5 flex justify-between border border-gray-200"
            key={activity.id}
          >
            <div className="space-y-2 relative ">
              <p
                className={`absolute -top-8 ${colorClass(
                  activity.name
                )} text-white py-2 px-10 uppercase -left-7 rounded-sm shadow-md`}
              >
                {verifyNameActivity(activity.name)}
              </p>

              <p className="font-bold text-4xl pt-1 text-lime-500 ">
                {activity.activity}
              </p>
              <p className="font-bold text-xl ml-1">
                {activity.calories} <span>Calorias</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 ">
              <button onClick={setActivityID(activity.id)}>
                <PencilSquareIcon className="h-10 text-green-600 rounded-full hover:bg-green-200 transition text-9xl p-1" />
              </button>
              <button onClick={deleteActivity(activity.id)}>
                <XMarkIcon className="h-10 text-red-500 text-9xl hover:bg-red-100 transition rounded-full p-1" />
              </button>
            </div>
          </div>
        ))}
      {!activitiesLength && (
        <div className="bg-white rounded-md m-auto p-5 flex justify-between">
          <p className="font-bold text-2xl m-auto">No hay actividades</p>
        </div>
      )}
    </div>
  );
};
