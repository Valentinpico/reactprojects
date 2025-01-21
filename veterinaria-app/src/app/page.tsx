"use client";

import { PatientForm } from "@/modules/pacientes/components/PatientForm";
import { PatientList } from "@/modules/pacientes/components/PatientList";
import { usePatientStore } from "@/store/usePatientsStore";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <div className="mt-10">
        <div className=" flex justify-center">
          <h1 className="font-black text-2xl uppercase">
            Agendamiento de pacientes
          </h1>
          <span className="ml-2 text-2xl text-indigo-600 uppercase font-black">
            Veterinaria
          </span>
        </div>

        <div className="grid w-10/12 m-auto bg-slate-300 rounded lg:grid-cols-2 px-2 gap-3 ">
          <PatientForm />
          <PatientList />
        </div>

        <ToastContainer />
      </div>
    </>
  );
}
