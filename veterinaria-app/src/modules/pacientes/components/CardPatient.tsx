import { ButtonForm } from "@/modules/common/ButtonForm";
import { usePatientStore } from "@/store/usePatientsStore";
import { PatientType } from "@/types/types";
import {
  CalendarIcon,
  EnvelopeIcon,
  UserIcon,
  HeartIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

type CardPatientProps = {
  patient: PatientType;
};

export const CardPatient = ({ patient }: CardPatientProps) => {
  const { name, caretaker, date, email, symptoms, id } = patient;

  const setActivePatient = usePatientStore((state) => state.setActivePatient);
  const removePatient = usePatientStore((state) => state.removePatient);

  return (
    <div className="w-full rounded-lg border bg-white">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-700">{name}</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <HashtagIcon className="h-4 w-4" />
            <span className="font-medium">ID:</span>
            <span className="truncate">{id}</span>
          </div>
          <div className="flex items-center space-x-2 ">
            <UserIcon className="h-5 w-5" />
            <span className="font-medium ">Caretaker:</span>
            <span className="text-slate-700">{caretaker}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span className="font-medium">Date:</span>
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5" />
            <span className="font-medium">Email:</span>
            <span className="truncate">{email}</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <HeartIcon className="h-5 w-5" />
              <span className="font-medium">Symptoms:</span>
            </div>
            <p className="pl-7 text-sm">{symptoms}</p>
          </div>

          <div className="flex justify-between space-x-2">
            <ButtonForm
              onClick={() => removePatient(id)}
              className="bg-red-600 text-white w-1/3"
            >
              Eliminar
            </ButtonForm>
            <ButtonForm
              onClick={() => setActivePatient(patient)}
              className="bg-blue-500 text-white w-1/3"
            >
              Editar
            </ButtonForm>
          </div>
        </div>
      </div>
    </div>
  );
};
