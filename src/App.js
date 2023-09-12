import "./App.css";
import {DayContextProvider} from './store/days-context'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Matins, { loader as matinsLoader } from "./pages/Matins";
import Lauds, { loader as laudsLoader } from "./pages/Lauds";
import Terce, { loader as terceLoader } from "./pages/Terce";
import Sext, { loader as sextLoader } from "./pages/Sext";
import None, { loader as noneLoader } from "./pages/None";
import Vespers, { loader as vespersLoader } from "./pages/Vespers";
import Compline, { loader as complineLoader } from "./pages/Compline";
import Home from "./pages/Home";
import RootLayout from "./pages/Root";
import "./fonts/Linotte.woff"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "matins", element: <Matins />},
      { path: "lauds", element: <Lauds />},
      { path: "terce", element: <Terce />},
      { path: "sext", element: <Sext />},
      { path: "none", element: <None />},
      { path: "vespers", element: <Vespers />},
      { path: "compline", element: <Compline />},
    ],
  },
]);

function App() {
  return (
    <DayContextProvider>
      <RouterProvider router={router} />
      </DayContextProvider>
  );
}

export default App;
