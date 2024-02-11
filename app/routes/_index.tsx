import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EntryForm from "~/components/entry-form";
import prisma from "~/db";

export const meta: MetaFunction = () => {
  return [
    { title: "Works journal application" },
    {
      name: "description",
      content: "Works journal tracking application by coderboysobuj",
    },
  ];
};

export async function loader() {
  const entries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return json({
    entries,
  });
}

export default function Index() {
  const { entries } = useLoaderData<typeof loader>();
  return (
    <div className="">
      <div className="mb-8 rounded-lg border border-zinc-700/30 bg-zinc-800/50 p-4 2xl:mb-20 lg:p-6">
        <p className="text-sm font-medium text-zinc-500 lg:text-base">
          New Entry
        </p>
        <EntryForm />
      </div>
      {entries.length > 0 ? (
        <div className="space-y-12  border-l-2 border-sky-500/[.15] pl-5 lg:space-y-20 lg:pl-8">
          {/* mapping */}
          {entries.map((entry) => (
            <div key={entry.id} className="relative">
              <div className="absolute left-[-34px] rounded-full bg-zinc-900 p-2 lg:left-[-46px]">
                <div className="h-[10px] w-[10px] rounded-full border border-sky-500 bg-zinc-900" />
              </div>
              <p className="pt-[5px] text-sm font-semibold uppercase text-sky-500">
                {entry.date}
              </p>
              <div className="mt-4 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-medium text-lg">{entry.type}</h4>
                  <ul className="text-gray-400 ml-2">
                    <li>{entry.text}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No entry</p>
      )}
    </div>
  );
}
