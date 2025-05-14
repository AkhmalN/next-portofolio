const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export const experienceRange = (
  startDate: string,
  endDate: string
): string | undefined => {
  if (startDate > endDate) return undefined;

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const dateParser = (date: string) => {
  if (!date) {
    return "unavailable param";
  }
  const parsedDate = new Date(date);
  const formatted = parsedDate.toISOString().split("T")[0];
  return formatted;
};

export const monthYearParser = (date: string | undefined) => {
  if (!date || undefined) {
    return "unavailable param";
  }
  const parsedDate = new Date(date);
  const month = months[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();
  return `${month} ${year}`;
};
