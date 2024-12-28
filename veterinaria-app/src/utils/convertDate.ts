//convertir en una función de utilidad que convierta una fecha en formato ISO 8601 a un formato de fecha legible por humanos.
export const convertDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const newDate = new Date(date).toLocaleDateString("es-ES", options);
  return newDate;
};
