export function isDateAfterToday(date: Date | string | null): boolean {
  if (!date) return false;
  try {
    const compareDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return compareDate >= today;
  } catch (e) {
    return false;
  }
}

export function isDateBeforeToday(date: Date | string | null): boolean {
  if (!date) return false;
  try {
    const compareDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return compareDate < today;
  } catch (e) {
    return false;
  }
}
