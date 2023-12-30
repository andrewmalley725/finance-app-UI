import Login from "./components/Login";
import Home from "./components/Home";
import NewUser from "./components/NewUser";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const api = 'http://localhost:5002/api';
//const api = 'https://sample-project-667a4.web.app/api';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Login api={api}/>,
  },
  {
      path: "/index",
      element: <Home api={api}/>,
  },
  {
    path: "/newUser",
    element: <NewUser api={api}/>,
  },

]);

function App() {
  return(
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;