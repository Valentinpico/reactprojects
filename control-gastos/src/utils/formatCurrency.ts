export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    /*     hour: "numeric",
    minute: "numeric", */
  };

  return new Intl.DateTimeFormat("es-ES", options).format(new Date(date));
};
