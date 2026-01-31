export const getTime = (date: Date) => {
  const time = new Date(date);
  const newDate = time.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return newDate;
};
