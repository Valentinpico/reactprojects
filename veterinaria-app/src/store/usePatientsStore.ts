import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PatientDraftType, PatientType } from "../types/types";
import { v4 as uuidv4 } from "uuid";

type PatientsStoreType = {
  patients: PatientType[];
  activePatient: PatientType | null;
  setActivePatient: (patient: PatientType) => void;
  addPatient: (patient: PatientDraftType) => void;
  updatePatient: (patient: PatientType) => void;
  removePatient: (id: PatientType["id"]) => void;
};

export const usePatientStore = create<PatientsStoreType>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activePatient: null,
        setActivePatient(patient) {
          set({ activePatient: patient });
        },
        updatePatient(patient) {
          set((state) => ({
            patients: state.patients.map((p) =>
              p.id === patient.id ? patient : p
            ),
            activePatient: null,
          }));
        },
        addPatient: (patient) => {
          set((state) => ({
            patients: [...state.patients, { ...patient, id: uuidv4() }],
          }));
        },
        removePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((p) => p.id !== id),
          }));
        },
      }),
      {
        name: "patients-storage",
      }
    )
  )
);
