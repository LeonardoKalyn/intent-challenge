/* eslint-disable no-restricted-globals */
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { TABLET, DESKTOP } from '../shared/break-points';
import { getRecipes, addSecretRecipes } from './store';
import Recipe from './RecipeType';

function Recipes () {
  const classes = styles();
  const history = useHistory();

  const recipes = getRecipes();

  const handleClick = (recipe: Recipe) => {
    history.push(`/edit/${recipe.id}`, { recipe });
  };

  const handleSecretRecipes = () => {
    addSecretRecipes();
    location.reload();
  };

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>
        All Recipes
      </h1>

      { recipes.length
        ? (
          <div className={classes.recipesGrid}>
            {recipes.map((recipe) => (
              <button
                key={recipe.id}
                className={classes.recipeItem}
                onClick={() => handleClick(recipe)}
              >
                <p className={classes.recipesTitle}>
                  {recipe.name}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className={classes.noRecipes}>
            <p className={classes.text}>
              ¯\_(ツ)_/¯
            </p>
            <p className={classes.text}>
              It seems like you don't have any recipes!
            </p>
            <div className={classes.options}>
              <button
                className={classes.recipeItem}
                onClick={() => history.push('/new-recipe')}
              >
                <p className={classes.recipesTitle}>
                  Add a new Recipe!
                </p>
              </button>
              <button
                className={classes.recipeItem}
                onClick={handleSecretRecipes}
              >
                <p className={classes.recipesTitle}>
                  Check the cheff's secret recipes!
                </p>
              </button>
            </div>
          </div>
        )
      }
    </section>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: '22px',
    lineHeight: '24px',
    fontFamily: 'Poppins',
    textAlign: 'center',
    color: '#282a2b',
    margin: '10px 0 36px',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: 16,
  },
  recipeItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    background: '-webkit-linear-gradient(top, #312f4c 40%,#5647dc 100%)',
    padding: 12,
    borderRadius: 4,
  },
  recipesTitle: {
    color: '#fffff0',
    fontSize: '20px',
    lineHeight: '22px',
    fontFamily: 'Poppins',
  },
  noRecipes: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  options: {
    marginTop: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: 16,
  },
  text: {
    fontSize: '18px',
    lineHeight: '20px',
    fontFamily: 'Poppins',
    textAlign: 'center',
    color: '#282a2b',
    margin: '10px 0 20px',
  },

  [TABLET]: {
    container: {
      padding: '16px 22px',
    },
    recipesGrid: {
      gridTemplateColumns: '1fr 1fr 1fr',
      columnGap: 16,
    },
  },

  [DESKTOP]: {
    recipesGrid: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
});

export default Recipes;
