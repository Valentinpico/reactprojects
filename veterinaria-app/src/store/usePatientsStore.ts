import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PatientDraftType, PatientType } from "../types/types";
import { v4 as uuidv4 } from "uuid";

type PatientsStoreType = {
  patients: PatientType[];
  activePatient: PatientType;
  setActivePatient: (patient: PatientType) => void;
  addPatient: (patient: PatientDraftType) => void;
  getPatients: () => void;
  updatePatient: (patient: PatientType) => void;
  removePatient: (id: PatientType["id"]) => void;
};

export const usePatientStore = create<PatientsStoreType>()(
  devtools((set) => ({
    patients: [],
    activePatient: null,
    getPatients: () => {
      const patients = localStorage.getItem("patients");
      if (!patients) return;
      set({ patients: JSON.parse(patients) });
    },
    setActivePatient(patient) {
      set({ activePatient: patient });
    },
    updatePatient(patient) {
      set((state) => {
        const newPatients = state.patients.map((p) =>
          p.id === patient.id ? patient : p
        );
        localStorage.setItem("patients", JSON.stringify(newPatients));
        return {
          patients: newPatients,
        };
      });
    },

    addPatient: (patient) => {
      set((state) => {
        const newPatient = [...state.patients, { ...patient, id: uuidv4() }];
        localStorage.setItem("patients", JSON.stringify(newPatient));
        return {
          patients: newPatient,
        };
      });
    },
    removePatient: (id) => {
      set((state) => {
        const newPatients = state.patients.filter((p) => p.id !== id);
        localStorage.setItem("patients", JSON.stringify(newPatients));
        return {
          patients: newPatients,
        };
      });
    },
  }))
);
