import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Layout from '../shared/Layout';
import Recipes from '../recipes/Recipes';
import NewRecipe from '../recipes/NewRecipe';

const App = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <>
            <Route exact path="/" component={Recipes} />
            <Route exact path="/add" component={NewRecipe} />
          </>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
