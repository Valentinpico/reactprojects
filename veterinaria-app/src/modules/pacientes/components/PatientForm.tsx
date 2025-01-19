"use client";
import { ButtonForm } from "@/modules/common/ButtonForm";
import { InputForm } from "@/modules/common/Input";
import { usePatientStore } from "../../../store/usePatientsStore";
import { PatientDraftType } from "@/types/types";
import { useState } from "react";

export const PatientForm = () => {
  const addPatient = usePatientStore((state) => state.addPatient);

  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState<PatientDraftType>({
    name: "",
    caretaker: "",
    date: "",
    email: "",
    symptoms: "",
  });

  const handleSubmit = () => {
    setShowError(true);

    if (!Object.values(formData).every((value) => value)) return;

    addPatient(formData);

    setFormData({
      caretaker: "",
      date: "",
      email: "",
      name: "",
      symptoms: "",
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="lg:w-full ">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10 ">
        Añade Pacientes y
        <span className="text-indigo-600 font-bold"> Administralos</span>
      </p>

      <div className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        <InputForm
          name="name"
          type="text"
          label="Paciente"
          placeholder="Nombre del Paciente"
          onChangeAction={handleChange}
          value={formData.name}
          required
          errorMessage="Este campo es obligatorio"
          showError={showError}
        />

        <InputForm
          name="caretaker"
          onChangeAction={handleChange}
          placeholder="Propietario del Paciente"
          value={formData.caretaker}
          type="text"
          label="Propietario"
          required
          errorMessage="Este campo es obligatorio"
          showError={showError}
        />

        <InputForm
          name="email"
          value={formData.email}
          placeholder="Email del Propietario"
          onChangeAction={handleChange}
          required
          type="email"
          label="Email"
          errorMessage="Este campo es obligatorio"
          pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          showError={showError}
        />

        <InputForm
          name="date"
          value={formData.date}
          onChangeAction={handleChange}
          type="date"
          label="Fecha de Ingreso"
          required
          errorMessage="Este campo es obligatorio"
          showError={showError}
        />

        <InputForm
          name="symptoms"
          value={formData.symptoms}
          onChangeAction={handleChange}
          type="textarea"
          label="Síntomas"
          placeholder="Síntomas del paciente"
          required
          errorMessage="Este campo es obligatorio"
        />

        <ButtonForm
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white"
        >
          Guardar Paciente
        </ButtonForm>
      </div>
    </div>
  );
};
