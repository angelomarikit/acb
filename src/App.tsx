import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { AdminPage } from "./pages/admin/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/"
            element={
              <Layout>
                <LandingPage />
              </Layout>
            }
          />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
}
