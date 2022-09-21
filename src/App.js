import Details from 'pages/Details';
import Home from 'pages/Home';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="header">
      <Switch>
        <Route path="/details">
          <Details />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
