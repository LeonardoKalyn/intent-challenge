import Recipe from './RecipeType';

const RECIPES_PATH = '@ricetta/recipes';

export function addRecipe(recipe: Recipe) {
  const recipes = getRecipes();
  recipes.push(recipe);
  localStorage.setItem(RECIPES_PATH, JSON.stringify(recipes));
};

export function getRecipes() : Recipe[] {
  const recipes = localStorage.getItem(RECIPES_PATH);
  if (!recipes) {
    return [];
  }
  return JSON.parse(recipes);
};

export function getRecipeById(id: string) : Recipe | undefined {
  const recipes = getRecipes();
  return recipes.find((recipe) => recipe.id === id);
};

export function editRecipe(recipe: Recipe) {
  const recipes = getRecipes();
  const index = recipes.findIndex((_recipe) => _recipe.id === recipe.id);

  if (index === -1) {
    throw Error('Recipe does not exist!');
  }

  const updatedRecipes = [
    ...recipes.slice(0, index),
    recipe,
    ...recipes.slice(index+1),
  ];
  localStorage.setItem(RECIPES_PATH, JSON.stringify(updatedRecipes));
};

export function deleteRecipe(id: string) {
  const recipes = getRecipes();

  const index = recipes.findIndex((recipe) => recipe.id === id);

  if (index === -1) {
    throw Error('Recipe does not exist!');
  }

  const updatedRecipes = [
    ...recipes.slice(0, index),
    ...recipes.slice(index+1),
  ];
  localStorage.setItem(RECIPES_PATH, JSON.stringify(updatedRecipes));
};

const recipesStore = {
  addRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};

export default recipesStore;
