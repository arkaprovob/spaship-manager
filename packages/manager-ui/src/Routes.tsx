import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import AddApplication from "./components/application/AddApplication";
import ApplicationIndex from "./components/application/ApplicationIndex";
import ApplicationList from "./components/application/ApplicationList";
import APIKeyList from "./components/authentication/APIKeyList";
import DashboardIndex from "./components/dashboard/DashboardIndex";
import DashboardSPAPage from "./components/dashboard/spa/DashboardSPAPage";
import EnvironmentList from "./components/environment/EnvironmentList";
import PropertyList from "./components/property/PropertyList";
import LoginPage from "./components/user/LoginPage";
import PrivateRoute from "./PrivateRoute";

const history = createBrowserHistory();

// Wrap everything inside KeycloakProvider
export default () => {
  // const { initialized } = useKeycloak();
  // if (!initialized) {
  //   return (
  //     <Bullseye>
  //       <EmptySpinner />
  //     </Bullseye>
  //   );
  // }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={PropertyList} />
        <Redirect exact path="/authentication" to="/authentication/apikeys" />
        {/* <Route path="/login" component={LoginPage} /> */}
        <PrivateRoute path="/authentication/apikeys" component={APIKeyList} />
        <PrivateRoute path="/applications/new" component={AddApplication} />
        <PrivateRoute path="/applications/:applicationName" component={ApplicationIndex} />
        <PrivateRoute path="/applications" component={ApplicationList} />
        <PrivateRoute path="/environments" component={EnvironmentList} />
        <PrivateRoute path="/dashboard/property/:propertyName" component={DashboardIndex} />
        <PrivateRoute path="/dashboard/:propertyName/spaName/:spaName" component={DashboardSPAPage} />
        <Route exact path="/dashboard">
          <Redirect to={history.location.pathname} /> : <DashboardIndex />
        </Route>
      </Switch>
    </Router>
  );
};
