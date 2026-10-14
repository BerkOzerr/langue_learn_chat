import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Page/LoginPage.jsx";
import RegisterPage from "./components/Page/RegisterPage.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import RoomPage from "./components/Page/Room/RoomPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/rooms" element={<RoomPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
