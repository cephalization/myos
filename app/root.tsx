import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import clsx from "clsx";
import { Dock } from "./components/dock";
import { COLORS } from "./constants";

import styles from "./styles/app.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html
      lang="en"
      className={clsx("h-screen flex flex-col", COLORS.background.primary)}
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex basis-full shrink">
        <Dock />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
