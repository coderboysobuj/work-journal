import { ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { format, parseISO, startOfWeek } from "date-fns";
import EntryForm from "~/components/entry-form";
import prisma from "~/db";
import { validate } from "~/utils/validate";

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
  let entries = await prisma.entry.findMany({
    orderBy: {
      date: "desc",
    },
  });
  return {
    entries: entries.map((entry) => ({
      ...entry,
      date: entry.date.toISOString().substring(0, 10),
    })),
  };
}

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let { text, type, date } = validate(Object.fromEntries(formData));

  return prisma.entry.create({
    data: {
      date: new Date(date),
      text,
      type,
    },
  });
}

export default function Index() {
  let { entries } = useLoaderData<typeof loader>();

  let entriesByWeek = entries
    .sort((a, b) => b.date.localeCompare(a.date))
    .reduce<Record<string, typeof entries>>((memo, entry) => {
      let sunday = startOfWeek(parseISO(entry.date));
      let sundayString = format(sunday, "yyyy-MM-dd");
      memo[sundayString] ||= [];
      memo[sundayString].push(entry);
      return memo;
    }, {});

  let weeks = Object.keys(entriesByWeek).map((dateString) => ({
    dateString,
    work: entriesByWeek[dateString].filter((entry) => entry.type === "work"),
    learnings: entriesByWeek[dateString].filter(
      (entry) => entry.type === "learning"
    ),
    interestingThings: entriesByWeek[dateString].filter(
      (entry) => entry.type === "interesting-thing"
    ),
  }));

  return (
    <div className="">
      <div className="mb-8 rounded-lg border border-zinc-700/30 bg-zinc-800/50 p-4 2xl:mb-20 lg:p-6">
        <p className="text-sm font-medium text-zinc-500 lg:text-base">
          New Entry
        </p>
        <EntryForm />
      </div>
      {weeks.length > 0 ? (
        <div className="space-y-12  border-l-2 border-sky-500/[.15] pl-5 lg:space-y-20 lg:pl-8">
          {weeks.map((week) => (
            <div key={week.dateString} className="relative">
              <div className="absolute left-[-34px] rounded-full bg-zinc-900 p-2 lg:left-[-46px]">
                <div className="h-[10px] w-[10px] rounded-full border border-sky-500 bg-zinc-900" />
              </div>
              <p className="pt-[5px] text-sm font-semibold uppercase text-sky-500">
                Week of {format(parseISO(week.dateString), "MMMM d, yyyy")}
              </p>
              <div className="mt-6 space-y-8 lg:space-y-12">
                <EntryList entries={week.work} label="Work" />
                <EntryList entries={week.learnings} label="Learnings" />
                <EntryList
                  entries={week.interestingThings}
                  label="Interesting things"
                />
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

type Entry = Awaited<ReturnType<typeof loader>>["entries"][number];

function EntryList({ entries, label }: { entries: Entry[]; label: string }) {
  return entries.length > 0 ? (
    <div>
      <p className="font-semibold text-white">{label}</p>

      <ul className="mt-4 space-y-6">
        {entries.map((entry) => (
          <EntryListItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </div>
  ) : null;
}

function EntryListItem({ entry }: { entry: Entry }) {
  return (
    <li className="group leading-7">
      {entry.text}
      <Link
        to={`/entries/${entry.id}/edit`}
        className="ml-2 text-sky-500 opacity-0 group-hover:opacity-100"
      >
        Edit
      </Link>
    </li>
  );
}
