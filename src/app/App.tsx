import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Layout from '../shared/Layout';
import Recipes from '../recipes/Recipes';

const App = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Recipes} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
