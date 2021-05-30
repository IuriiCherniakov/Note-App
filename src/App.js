import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import {Navbar} from "./components/Navbar";

function App() {
  return (
      <BrowserRouter>
    <div className="container pt-4">
        <Navbar/>
      <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/about'} component={About}/>
      </Switch>


    </div>
      </BrowserRouter>
  );
}

export default App;
