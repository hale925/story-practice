import React from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider,   } from "@mantine/core";

import LayOut from "./layOut";
import Home from "./intro";
import AddPosition from "./positionAdd";
import PositionContent from "./positionContait";

const routes = [
  {
    path: "/",
    element: <LayOut />,
    children: [
      { index: true, element: <Home /> },
      { path: "/positions/new", element: <AddPosition />},
      { path: "/positions/:positionName", element: <PositionContent/>}
    
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  
  return (
    <div >
      <MantineProvider>
      <RouterProvider router={router} />
      </MantineProvider>
    </div>
  );
}

export default App;