import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeCreate from "./components/RecipeCreate";
import Detail from "./components/Detail";
import AfterCreate from "./components/AfterCreate";
import Error from "./components/Error404/404";
import { useId } from "react";

function App() {
  const randomID = useId();
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} key={randomID} />
          <Route exact path="/recipes" component={RecipeCreate} />
          <Route exact path="/recipes/:id" component={Detail} />
          <Route exact path="/after-created" component={AfterCreate} />
          <Route path="/*" component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
