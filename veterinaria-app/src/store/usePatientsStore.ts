import { create } from "zustand";
import { PatientDraftType, PatientType } from "../types/types";
import { v4 as uuidv4 } from "uuid";

type PatientsStoreType = {
  patients: PatientType[];
  addPatient: (patient: PatientDraftType) => void;
  removePatient: (id: PatientType["id"]) => void;
};

export const usePatientStore = create<PatientsStoreType>((set) => ({
  patients: [],

  addPatient: (patient) =>
    set((state) => ({
      patients: [...state.patients, { ...patient, id: uuidv4() }],
    })),
  removePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    })),
}));
