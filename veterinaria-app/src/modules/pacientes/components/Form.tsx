"use client";
import { InputForm } from "@/modules/common/Input";
import { useState } from "react";

export const PatientForm = () => {
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    caretaker: "",
    email: "",
    date: "",
    symptoms: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(true);
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
    <div className="lg:w-full mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10 ">
        Añade Pacientes y
        <span className="text-indigo-600 font-bold"> Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit}
      >
        <InputForm
          name="name"
          type="text"
          label="Paciente"
          placeholder="Nombre del Paciente"
          onChangeAction={handleChange}
          value="adsf"
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
        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
          ></textarea>
        </div>
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

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>
    </div>
  );
};
