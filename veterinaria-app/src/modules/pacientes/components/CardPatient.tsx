import { PatientType } from "@/types/types";
import { convertDate } from "@/utils/convertDate";

type CardPatientProps = {
  patient: PatientType;
};

export const CardPatient = ({ patient }: CardPatientProps) => {
  return (
    <div
      key={patient.id}
      className="border border-gray-500 p-2 rounded-md mt-2"
    >
      <div key={patient.id} className="flex justify-between">
        <div>
          <p className="text-md">{patient.name}</p>
          <p className="text-sm text-gray-400">{patient.caretaker}</p>
        </div>
        <div>
          <p className="text-md ">{patient.email}</p>
          <p className="text-sm text-gray-400">{convertDate(patient.date)}</p>
        </div>
      </div>
    </div>
  );
};
