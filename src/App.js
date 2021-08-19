import { Route, Switch } from "react-router-dom";
import Header from "./Component/Header";
import AddMember from "./Pages/AddMember";
import SingleMember from "./Pages/SingleMember";
import ViewMember from "./Pages/ViewMember";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Switch>
          <Route path="/member/:id">
            <SingleMember />
          </Route>
          <Route path="/add-member/:id">
            <AddMember />
          </Route>
          <Route path="/add-member">
            <AddMember />
          </Route>
          <Route path="/">
            <ViewMember />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
