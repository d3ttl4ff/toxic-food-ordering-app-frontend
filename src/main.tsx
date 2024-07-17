import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner";

// This queryClient is a global state manager for the frontend app that is used to cache data fetched from the backend API and share it between components in a performant way (i.e. without making unnecessary API calls)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
          <Toaster
            visibleToasts={1}
            position="bottom-right"
            richColors
            closeButton
          />
        </Auth0ProviderWithNavigate>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
