import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-zinc-900 text-white">
          <section className="max-w-xl mx-auto px-4 flex items-center justify-center w-full py-8 2xl:py-12">
            <figure className="">
              <h1 className="text-4xl font-semibold">Work Journey</h1>
              <p className="text-zinc-500 text-sm lg:text-base">
                Tracking you work every week
              </p>
            </figure>
          </section>
          <div className="max-w-xl mx-auto px-4 2xl:mt-8 min-h-full">
            <Outlet />
          </div>

          <div className="max-w-xl border-t border-sky-800/30 mx-auto px-4 mt-6 pb-4">
            <h1 className="text-center text-sm mt-2 lg:text-base text-gray-400">
              Work Journey application licensed under MIT
            </h1>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
