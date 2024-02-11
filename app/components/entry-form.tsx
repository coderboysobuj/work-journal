import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function EntryForm() {
  let dateRef = useRef<HTMLInputElement | null>(null);
  let typeRef = useRef<HTMLInputElement | null>(null);
  let textRef = useRef<HTMLTextAreaElement | null>(null);

  const nagivation = useNavigation();

  useEffect(() => {
    if (nagivation.location) {
      if (dateRef?.current) {
        dateRef.current.value = "";
      }

      if (typeRef?.current) {
        typeRef.current.value = "";
      }
      if (textRef?.current) {
        textRef.current.value = "";
      }
    }
  }, [nagivation.location]);

  return (
    <Form className="mt-4" method="post" action="/create">
      <fieldset>
        <div>
          <input
            ref={dateRef}
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
                ref={typeRef}
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
            ref={textRef}
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
            Save
          </button>
        </div>
      </fieldset>
    </Form>
  );
}
