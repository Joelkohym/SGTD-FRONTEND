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

function App() {
  return (
    <Provider>
      <HashRouter>
        <Routes>
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route path={AppRoutes.Register} element={<Register />} />
          <Route path={AppRoutes.Home} element={<Home />} />
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
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
