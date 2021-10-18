import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Layout from '../shared/Layout';
import Recipes from '../recipes/Recipes';
import NewRecipe from '../recipes/NewRecipe';
import EditRecipe from '../recipes/EditRecipe';

const App = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <>
            <Route exact path="/" component={Recipes} />
            <Route exact path="/add" component={NewRecipe} />
            <Route exact path="/edit/:id" component={EditRecipe} />
          </>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
