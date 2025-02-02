import LayoutUser from "./layout/user/LayoutUser";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Admin from "./pages/AdminPages/Admin/Admin";
import ForgotPass from "./pages/ForgotPass/ForgotPass";
import {store} from './store/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import { ROUTES } from "./constants/routes";
import "./App.css"


function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route path={ROUTES.ADMIN} component={Admin} />
              <Route path={ROUTES.REGISTRO} component={Register} />
              <Route path={ROUTES.USER} component={LayoutUser} />
              <Route path={ROUTES.RECOVERY_PASSWORD} component={ForgotPass} />
              <Route path={ROUTES.LOGIN} component={Login} />
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;