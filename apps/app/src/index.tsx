import { createRoot } from "react-dom/client";

import dayjs from "dayjs";
import dayjsCustomParseFormatPlugin from "dayjs/plugin/customParseFormat";

import { disableDevtools } from "react-yesterday";

import App from "~/App";

import "@unej-io/ui/css";

if (import.meta.env.PROD) disableDevtools();

dayjs.extend(dayjsCustomParseFormatPlugin);

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
