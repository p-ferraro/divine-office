import "./App.css";
import {DayContextProvider} from './store/days-context'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Matins from "./pages/Matins";
import Lauds from "./pages/Lauds";
import Terce from "./pages/Terce";
import Sext from "./pages/Sext";
import None from "./pages/None";
import Vespers from "./pages/Vespers";
import Compline from "./pages/Compline";
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
