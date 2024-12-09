export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,4})(\d{0,3})(\d{0,3})$/);

  if (!match) return value;

  const formatted = [
    match[1],
    match[2] && `${match[2]}`,
    match[3] && `${match[3]}`,
  ]
    .filter(Boolean)
    .join("-");

  return formatted;
};
