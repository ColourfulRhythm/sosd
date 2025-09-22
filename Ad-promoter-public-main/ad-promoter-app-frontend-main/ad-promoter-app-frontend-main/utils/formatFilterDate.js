function formatDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getWeekAgoRange() {
  const today = new Date();
  const startOfWeek = new Date(today);
  const endOfWeek = new Date(today);

  // Calculate the start of the week ago
  startOfWeek.setDate(today.getDate() - 7);

  return {
    startOfWeek: formatDateString(startOfWeek),
    endOfWeek: formatDateString(endOfWeek),
  };
}

export function getTwoWeeksAgoRange() {
  const today = new Date();
  const startOfWeek = new Date(today);
  const endOfWeek = new Date(today);

  // Calculate the start of the week ago
  startOfWeek.setDate(today.getDate() - 14);

  return {
    startOfWeek: formatDateString(startOfWeek),
    endOfWeek: formatDateString(endOfWeek),
  };
}

export function getThirtyDaysAgoRange() {
  const today = new Date();
  const startOfWeek = new Date(today);
  const endOfWeek = new Date(today);

  // Calculate the start of the week ago
  startOfWeek.setDate(today.getDate() - 30);

  return {
    startOfWeek: formatDateString(startOfWeek),
    endOfWeek: formatDateString(endOfWeek),
  };
}
