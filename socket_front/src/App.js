import routes from "./routes";
import "./App.css";
// import Login from "./screens/login";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
