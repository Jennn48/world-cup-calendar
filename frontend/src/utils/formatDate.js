export function formatMatchDate(date) {
  if (!date) return "";
  const event = new Date(date);

  const options = {
    weekday: "short",
    month: "2-digit",
    day: "2-digit",
  };

  const dateData = event.toLocaleDateString("es-ES", options);

  return `${dateData.charAt(0).toUpperCase() + dateData.slice(1)}`;
}

export function formatMatchTime(date, time) {
  if (!date) return "";
  const dateString = `${date.split("T")[0]}T${time}`;
  const event = new Date(dateString);

  const timePart = event.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${timePart}`;
}
