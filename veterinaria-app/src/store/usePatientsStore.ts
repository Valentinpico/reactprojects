import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PatientDraftType, PatientType } from "../types/types";
import { v4 as uuidv4 } from "uuid";

type PatientsStoreType = {
  patients: PatientType[];
  addPatient: (patient: PatientDraftType) => void;
  removePatient: (id: PatientType["id"]) => void;
};

export const usePatientStore = create<PatientsStoreType>()(
  devtools((set) => ({
    patients: [],

    addPatient: (patient) => {
      set((state) => {
        const newPatient = [...state.patients, { ...patient, id: uuidv4() }];
        localStorage.setItem("patients", JSON.stringify(newPatient));
        return {
          patients: newPatient,
        };
      });
    },
    removePatient: (id) =>
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
      })),
  }))
);
