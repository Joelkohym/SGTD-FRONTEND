import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AppRoutes } from "./lib/constants";
import TableView from "./pages/TableView";
import VesselMap from "./pages/VesselMap";
import VesselETA from "./pages/VesselETA";
import MapQuery from "./pages/MapQuery";
import ProtectedRoute from "./lib/ProtectedRoute";
import { Provider } from "jotai";
import UploadFile from "./pages/UploadFile";

function App() {
  return (
    <Provider>
      <HashRouter>
        <Routes>
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route path={AppRoutes.Register} element={<Register />} />
          <Route
            path={AppRoutes.Home}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.MapQuery}
            element={
              <ProtectedRoute>
                <MapQuery />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.TableView}
            element={
              <ProtectedRoute>
                <TableView />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.VesselETA}
            element={
              <ProtectedRoute>
                <VesselETA />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.VesselMap}
            element={
              <ProtectedRoute>
                <VesselMap />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.UploadFile}
            element={
              <ProtectedRoute>
                <UploadFile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
