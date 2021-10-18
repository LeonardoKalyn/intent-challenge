import { createUseStyles } from 'react-jss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { TABLET } from '../shared/break-points';
import { editRecipe, getRecipeById } from './store';
import Recipe from './RecipeType';
import RecipeForm, { FormValues } from './RecipeForm';

type MatchType = {
  id: string;
};
type StateType = {
  recipe: Recipe
};


function EditRecipe () {
  const classes = styles();
  const history = useHistory<StateType>();
  const match = useRouteMatch<MatchType>();

  const currentRecipe = history.location.state.recipe || getRecipeById(match.params.id);

  const  onSubmit = (data: FormValues) => {
    const recipe: Recipe = {
      id: data.id,
      name: data.name,
      ingredients: data.ingredients.map(ingredient => ingredient.value),
    };

    editRecipe(recipe);
    history.push('/');
  };

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>
        Edit Recipe
      </h1>

      <RecipeForm
        onSubmit={onSubmit}
        initialValues={currentRecipe}
      />
    </section>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  title: {
    fontSize: '22px',
    lineHeight: '24px',
    fontFamily: 'Poppins',
    color: '#282a2b',
    margin: '10px 0 26px',
  },

  [TABLET]: {
    container: {
      padding: '16px 22px',
    },
  },
});

export default EditRecipe;
