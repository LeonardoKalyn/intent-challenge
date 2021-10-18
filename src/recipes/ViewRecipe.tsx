import { createUseStyles } from 'react-jss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { TABLET, LAPTOP } from '../shared/break-points';
import { getRecipeById, deleteRecipe } from './store';
import Recipe from './RecipeType';

type MatchType = {
  id: string;
};
type StateType = {
  recipe: Recipe
};

function ViewRecipe () {
  const classes = styles();
  const history = useHistory<StateType>();
  const match = useRouteMatch<MatchType>();

  const recipe = history.location.state?.recipe || getRecipeById(match.params.id);

  const handleEdit = () => {
    history.push(`/edit/${recipe.id}`, { recipe });
  };

  const handleDelete = () => {
    if(window.confirm(`Are you sure you want to delete "${recipe.name}"?\nThis action can't be undone!`)) {
      deleteRecipe(recipe.id);
      history.push('/');
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.title}>
          {recipe.name}
        </h1>

        <div className={classes.buttonContainer}>
          <button
            type="button"
            className={classes.editButton}
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            type="button"
            className={classes.deleteButton}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <h2 className={classes.label}>
        Ingredients:
      </h2>
      <ol className={classes.ingredientList}>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className={classes.ingredient}>
            {ingredient}
          </li>
        ))}
      </ol>
    </section>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  header: {
    display: 'block',
  },
  title: {
    fontSize: '22px',
    lineHeight: '24px',
    fontFamily: 'Poppins',
    color: '#282a2b',
    margin: '10px 0 16px',
    textAlign: 'center',
  },
  label: {
    fontSize: '26px',
    lineHeight: '26px',
    fontFamily: 'Satisfy',
    color: '#282a2b',
    marginBottom: 22,
    textDecoration: 'underline',
  },
  ingredientList: {
    paddingLeft: 20,
  },
  ingredient: {
    fontFamily: 'Satisfy',
    fontSize: '20px',
    lineHeight: '22px',
    color: '#282a2b',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,

    '&>button': {
      fontSize: '18px',
      lineHeight: '18px',
      padding: 10,
      borderRadius: 4,
      fontFamily: 'Satisfy',
      color: '#ffffff',
      flex: 1,
    },
  },
  editButton: {
    backgroundColor: '#9999ff',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#ff5050',
    marginLeft: 8,
  },

  [TABLET]: {
    container: {
      padding: '16px 22px',
    },
    title: {
      fontSize: '30px',
      lineHeight: '30px',
    },
    label: {
      fontSize: '30px',
      lineHeight: '30px',
    },
    ingredient: {
      fontSize: '26px',
      lineHeight: '28px',
      marginBottom: 12,
    },
    buttonContainer: {
      justifyContent: 'center',
      marginBottom: 40,

      '&>button': {
        fontSize: '25px',
        lineHeight: '25px',
        padding: 12,
        width: 200,
        flex: 'unset',
      }
    },
  },

  [LAPTOP]: {
    container: {
      padding: '26px 40px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 30,
    },
    title: {
      textAlign: 'start',
      margin: '0 40px 0 0',
      flex: 1,
    },
    buttonContainer: {
      justifyContent: 'flex-start',
      marginBottom: 0,

      '&>button': {
        fontSize: '18px',
        lineHeight: '18px',
        padding: 10,
        width: 200,
      }
    },
    label: {
      paddingLeft: 20,
    },
    ingredientList: {
      padding: '0 50px',
    },
  }
});

export default ViewRecipe;
