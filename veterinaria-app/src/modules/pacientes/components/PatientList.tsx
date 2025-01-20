"use client";
import { usePatientStore } from "../../../store/usePatientsStore";
import { CardPatient } from "./CardPatient";

export const PatientList = () => {
  const patients = usePatientStore((state) => state.patients);

  const patientsLength = patients.length;
  return (
    <div className="lg:w-full ">
      <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10 ">
        Acá encontrarás todos los pacientes y sus
        <span className="text-indigo-600 font-bold"> respectivos dueños</span>
      </p>

      <div className="w-full overflow-y-scroll h-1/2 ">
        {patientsLength ? (
          patients.map((patient) => (
            <CardPatient patient={patient} key={patient.id} />
          ))
        ) : (
          <p className="text-center text-lg">No hay pacientes registrados</p>
        )}
      </div>
    </div>
  );
};
