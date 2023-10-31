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

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={AppRoutes.Login} element={<Login />} />
        <Route path={AppRoutes.Register} element={<Register />} />
        <Route path={AppRoutes.Home} element={<Home />} />
        <Route path={AppRoutes.MapQuery} element={<MapQuery />} />
        <Route path={AppRoutes.TableView} element={<TableView />} />
        <Route path={AppRoutes.VesselETA} element={<VesselETA/>} />
        <Route path={AppRoutes.VesselMap} element={<VesselMap />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
