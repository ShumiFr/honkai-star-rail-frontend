import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CharactersPage from "./pages/CharactersPage";
import TeamBuilderPage from "./pages/TeamBuilderPage";
import TeamsPage from "./pages/TeamsPage";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/characters" component={CharactersPage} />
        <Route path="/team-builder" component={TeamBuilderPage} />
        <Route path="/teams" component={TeamsPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
