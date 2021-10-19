import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeForm, { FormValues } from '../RecipeForm';

const onSubmit = jest.fn((data: FormValues) => ({
  ...data,
  ingredients: data.ingredients.map(({value}) => value),
}));

describe('<RecipeForm />', () => {
  beforeEach(() => {
    render(<RecipeForm onSubmit={onSubmit} />);
  });

  test('renders with a clean state', () => {
    const { getByTestId, queryByTestId, queryAllByTestId} = screen;
    const nameInput = getByTestId('name-input') as HTMLInputElement;
    expect(nameInput.value).toBe('');
    expect(queryByTestId('name-error-message')).not.toBeInTheDocument();
    expect(queryAllByTestId('ingredients').length).toBe(1);
    expect(queryByTestId('ingredients-error-message')).not.toBeInTheDocument();
    const ingredient0Input = getByTestId('ingredients-0-input') as HTMLInputElement;
    expect(ingredient0Input.value).toBe('');
    expect(getByTestId('ingredients-0-remove-button')).toBeInTheDocument();
    expect(queryByTestId('ingredients-0-error-message')).not.toBeInTheDocument();
    expect(getByTestId('add-ingredient-button')).toBeInTheDocument();
    expect(getByTestId('submit-button')).toBeInTheDocument();
  });

  test('prevents empty submits and show errors', async() => {
    const { getByTestId, findByTestId } = screen;

    userEvent.click(getByTestId('submit-button'));

    expect(onSubmit).not.toBeCalled();

    const nameErrorMessage = await findByTestId('name-error-message');
    expect(nameErrorMessage).toBeInTheDocument();
    expect(nameErrorMessage.textContent).toBe('Recipes should have a name!');

    const ingredientsErrorMessage = await findByTestId('ingredients-0-error-message');
    expect(ingredientsErrorMessage).toBeInTheDocument();
    expect(ingredientsErrorMessage.textContent).toBe('Ingredients can\'t be empty!');
  });

  test('ingretients fields can be added and removed', () => {
    const { getByTestId, queryAllByTestId } = screen;

    const addIngredientButton = getByTestId('add-ingredient-button');
    expect(queryAllByTestId('ingredients').length).toBe(1);

    userEvent.click(addIngredientButton);
    userEvent.click(addIngredientButton);
    userEvent.click(addIngredientButton);
    expect(queryAllByTestId('ingredients').length).toBe(4);

    userEvent.click(getByTestId('ingredients-3-remove-button'));
    userEvent.click(getByTestId('ingredients-2-remove-button'));
    expect(queryAllByTestId('ingredients').length).toBe(2);
  });

  test('executes submits with filled inputs', async() => {
    const { getByTestId, getAllByTestId } = screen;
    const name = 'Test Recipe';
    const ingredients = [
      'Test ingredient 1',
      'Test ingredient 2',
      'Test ingredient 3',
    ];

    userEvent.type(getByTestId('name-input'), name);

    const addIngredientButton = getByTestId('add-ingredient-button');
    userEvent.type(getByTestId('ingredients-0-input'), ingredients[0]);
    userEvent.click(addIngredientButton);
    userEvent.type(getByTestId('ingredients-1-input'), ingredients[1]);
    userEvent.click(addIngredientButton);
    userEvent.type(getByTestId('ingredients-2-input'), ingredients[2]);

    userEvent.click(getByTestId('submit-button'));

    expect(getAllByTestId('ingredients').length).toBe(3);
    await waitFor(() => expect(onSubmit).toBeCalledWith({
      name,
      ingredients: ingredients.map(value => ({value})),
    }));
  });
});
