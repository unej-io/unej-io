import { Suspense } from "react";

import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import { AuthProvider, HistoryRouter, RootProvider, ThemeProvider } from "~/components/core";

import RootRoutes from "~/routes";

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

export default App;
