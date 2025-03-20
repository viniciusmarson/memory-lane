export function formatDate(date: string) {
  // Ensure consistent timezone handling by setting time to noon UTC
  const dateObj = new Date(date);
  dateObj.setUTCHours(12, 0, 0, 0);

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Ensure consistent timezone
  });
}

export function isFutureDate(date: string) {
  return new Date(date).getTime() > new Date().getTime();
}

export function isNotValidDate(date: string) {
  // Check if the string matches YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return true;

  // Parse the date parts
  const [year, month, day] = date.split("-").map(Number);

  // Check month and day ranges
  if (month < 1 || month > 12) return true;
  if (day < 1 || day > 31) return true;

  // Create date object and verify it's valid
  const d = new Date(year, month - 1, day);
  if (isNaN(d.getTime())) return true;

  // Verify the date wasn't adjusted by JavaScript
  return (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  );
}
