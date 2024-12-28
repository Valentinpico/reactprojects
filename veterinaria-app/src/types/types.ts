export type PatientType = {
  id: string;
  name: string;
  caretaker: string;
  email: string;
  date: string;
  symptoms: string;
};

export type PatientDraftType = Omit<PatientType, "id">;
