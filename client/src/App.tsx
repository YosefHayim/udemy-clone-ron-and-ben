import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const googleClient = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClient}>
        <AppRoutes />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
