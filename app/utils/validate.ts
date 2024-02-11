export function validate(data: Record<string, any>) {
  let { date, type, text } = data;

  if (
    typeof date !== "string" ||
    typeof type !== "string" ||
    typeof text !== "string"
  ) {
    throw new Error("Bad data");
  }

  return { date, type, text };
}
