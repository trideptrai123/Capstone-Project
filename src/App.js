import React, { lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import useAuthStore from "./zustand/authStore";
import { socket } from "./socket";
import useNotyStore from "./zustand/notyStore";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function PrivateRoute({ component: Component, ...rest }) {
  const { isLogin } = useAuthStore();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

function PublicRoute({ component: Component, restricted, ...rest }) {
  const {
    isLogin,
    user: { role },
  } = useAuthStore();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin && restricted ? (
          <Redirect to={`${role == "teacher" ? "app/list-major" : "/app"}`} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

function App() {
  
  const { getInfoUser } = useAuthStore();
  const { isLogin, user } = useAuthStore();
  const {addNotification} = useNotyStore()
  useEffect(() => {
    if (isLogin && user && user.role != "admin") {
      socket.connect();

      // Join the room
      socket.emit("joinUniversity", user?.universityId);
      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [isLogin, user]);
  useEffect(() => {
    socket.on("noty", (noty) => {
      console.log(noty)
      if(noty.role == user?.role){
        addNotification(noty)
      }
    });
  }, []);
  useEffect(() => {
    const getUser = async () => {
      try {
        await getInfoUser();
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <PublicRoute restricted={true} path="/login" component={Login} />
          <PublicRoute
            restricted={true}
            path="/create-account"
            component={CreateAccount}
          />
          <PublicRoute
            restricted={true}
            path="/forgot-password"
            component={ForgotPassword}
          />
          <PrivateRoute path="/app" component={Layout} />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
