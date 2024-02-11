import { Form, useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function EntryForm() {
  let fetcher = useFetcher();
  let texteaRef = useRef<HTMLTextAreaElement | null>(null);

  let hasSubmitted = fetcher.data !== undefined && fetcher.state === "idle";

  // clear textear after form submited
  useEffect(() => {
    if (texteaRef.current && hasSubmitted) {
      texteaRef.current.value = "";
      texteaRef.current.focus();
    }
  }, [hasSubmitted]);

  return (
    <fetcher.Form className="mt-4" method="post">
      <fieldset
        disabled={fetcher.state !== "idle"}
        className="disabled:opacity-70"
      >
        <div>
          <input
            type="date"
            name="date"
            required
            style={{ colorScheme: "dark" }}
            className="w-full px-3 py-2 rounded-md border-zinc-700 bg-zinc-800 text-white focus:border-sky-600"
          />
        </div>

        <div className="mt-6   w-full flex  sm:items-center flex-col sm:flex-row sm:space-x-4 text-sm  lg:text-base">
          {[
            { label: "Work", value: "work" },
            { label: "learning", value: "learning" },
            { label: "Interesting thing", value: "interesting-thing" },
          ].map((option) => (
            <label key={option.value} className="inline-block text-white">
              <input
                required
                type="radio"
                className="mr-2 border-zinc-700 bg-zinc-800 focus:ring-sky-600"
                name="type"
                value={option.value}
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className="mt-6">
          <textarea
            placeholder="Type your entry..."
            name="text"
            ref={texteaRef}
            required
            rows={3}
            className="w-full px-3 py-2 rounded-md border-zinc-700 bg-zinc-800 text-white focus:border-sky-600"
          />
        </div>

        <div className="mt-6 w-full">
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-sky-600 text-white w-full"
          >
            {fetcher.state !== "idle" ? "Saving..." : "Save"}
          </button>
        </div>
      </fieldset>
    </fetcher.Form>
  );
}
