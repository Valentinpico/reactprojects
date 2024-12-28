import { PatientForm } from "@/modules/pacientes/components/PatientForm";
import { PatientList } from "@/modules/pacientes/components/PatientList";

export default function Home() {
  return (
    <>
      <div className="mt-10 ">
        <div className=" flex justify-center">
          <h1 className="font-black text-2xl uppercase">
            Agendamiento de pacientes
          </h1>
          <span className="ml-2 text-2xl text-indigo-600 uppercase font-black">
            Veterinaria
          </span>
        </div>

        <div className="grid w-10/12 mt-11 m-auto bg-slate-100 rounded lg:grid-cols-2 gap-3	">
          <div className="">
            <PatientForm />
          </div>
          <div className="">
            <PatientList />
          </div>
        </div>
      </div>
    </>
  );
}
