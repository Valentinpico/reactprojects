"use client";
import { convertDate } from "@/utils/convertDate";
import { usePatientStore } from "../../../store/usePatientsStore";
import { CardPatient } from "./CardPatient";

export const PatientList = () => {
  const patients = usePatientStore((state) => state.patients);

  const patientsLength = patients.length;
  return (
    <div className="lg:w-full mx-5">
      <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10 ">
        Acá encontrarás todos los pacientes y sus
        <span className="text-indigo-600 font-bold"> respectivos dueños </span>
      </p>

      <div className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {patientsLength === 0 ? (
          <p className="text-center text-lg">No hay pacientes registrados</p>
        ) : (
          <div className="overflow-x-auto">
            {patients.map((patient) => (
              <CardPatient patient={patient} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
