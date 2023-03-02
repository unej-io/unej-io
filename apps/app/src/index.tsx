import { Suspense } from "react";
import { createRoot } from "react-dom/client";

import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import dayjs from "dayjs";
import dayjsCustomParseFormatPlugin from "dayjs/plugin/customParseFormat";

import "~/assets/css/style.css";
// import "~/assets/fonts/index.css";

import { disableDevtools } from "react-yesterday";

import { AuthProvider, HistoryRouter, RootProvider, ThemeProvider } from "~/components/core";

import RootRoutes from "~/routes";

if (import.meta.env.PROD) disableDevtools();

function App() {
  return (
    <HistoryRouter>
      <ThemeProvider>
        <Notifications />

        <ModalsProvider>
          <AuthProvider>
            <RootProvider>
              <Suspense>
                <RootRoutes />
              </Suspense>
            </RootProvider>
          </AuthProvider>
        </ModalsProvider>
      </ThemeProvider>
    </HistoryRouter>
  );
}

dayjs.extend(dayjsCustomParseFormatPlugin);

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
