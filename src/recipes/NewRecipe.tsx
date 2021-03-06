import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { TABLET } from '../shared/break-points';
import { addRecipe } from './store';
import Recipe from './RecipeType';
import RecipeForm from './RecipeForm';

type FormValues = {
  name: 'string';
  ingredients: {value: string}[];
};

function NewRecipe () {
  const classes = styles();
  const history = useHistory();

  const  onSubmit = (data: FormValues) => {
    const recipe: Recipe = {
      id: uuidv4(),
      name: data.name,
      ingredients: data.ingredients.map(ingredient => ingredient.value),
    };

    addRecipe(recipe);
    history.push('/');
  };

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>
        New Recipe
      </h1>

      <RecipeForm onSubmit={onSubmit} />
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

export default NewRecipe;
