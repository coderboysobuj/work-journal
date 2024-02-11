import { ActionFunctionArgs, redirect } from "@remix-run/node";
import prisma from "~/db";
import { validate } from "~/utils/validate";

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let { text, type, date } = validate(Object.fromEntries(formData));

  await prisma.entry.create({
    data: {
      date: new Date(date),
      text,
      type,
    },
  });

  return redirect("/");
}

export default function CreateEntry() {
  return <h1>Creating...</h1>;
}
