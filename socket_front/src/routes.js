import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./screens/login";
import Chatscreen from "./screens/chatscreen";
import Chats from "./screens/chats";

export default createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chat/:userName",
    element: <Chatscreen />,
  },
  {
    path: "/chatchannels/:userName",
    element: <Chats />,
  },
]);
