import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { TABLET, LAPTOP } from '../shared/break-points';
import { addRecipe } from './store';
import Recipe from './RecipeType';

type FormValues = {
  name: 'string';
  ingredients: {value: string}[];
};

const schema = yup.object().shape({
  name: yup.string().required('Recipes should have a name!'),
  ingredients: yup.array().of(
    yup.object().shape({
      value: yup.string().required('Ingredients can\'t be empty!'),
    })
  ).min(1, 'Recipes need ingredients!').required('Recipes need ingredients gaga!'),
}).required();

function NewRecipe () {
  const classes = styles();
  const history = useHistory();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      ingredients: [{value: ''}],
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control
  });

  const  onSubmit = handleSubmit((data) => {
    const recipe: Recipe = {
      id: uuidv4(),
      name: data.name,
      ingredients: data.ingredients.map(ingredient => ingredient.value),
    };

    addRecipe(recipe);
    history.push('/');
  });

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>
        New Recipe
      </h1>

      <form onSubmit={onSubmit} className={classes.form}>
        <label className={classes.label}>
          Name:
        </label>
        <ErrorMessage
          errors={errors}
          name="name"
          as={<span className={classes.errorMessage}/>}
        />
        <input className={classes.input} {...register('name')} />

        <label className={classes.label}>
          Ingredients:
        </label>
        <ErrorMessage
          errors={errors}
          name="ingredients"
          as={<span className={classes.errorMessage}/>}
        />
        {fields.map((field, index) => (
          <>
            <ErrorMessage
              errors={errors}
              name={`ingredients.${index}.value`}
              as={<span className={classes.errorMessage}/>}
            />
            <div className={classes.inputLine} key={field.id}>
              <input
                className={classes.input}
                {...register(`ingredients.${index}.value` as const)}
              />
              <button
                type="button"
                className={classes.removeButton}
                onClick={() => remove(index)}
              >
                X
              </button>
            </div>
          </>
        ))}

        <div className={classes.buttonContainer}>
          <button
            type="button"
            className={classes.addIngredient}
            onClick={() => append({value: ''})}
          >
            Add Ingredient
          </button>

          <button className={classes.submitButton} type="submit">
            Save Recipe
          </button>
        </div>
      </form>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: '#282a2b',
    marginBottom: 8,
  },
  input: {
    border: '1px solid #a6a6a6',
    padding: 4,
    borderRadius: 4,
    marginBottom: 16,
    fontSize: '18px',
    lineHeight: '18px',
    flex: 1,
  },
  inputLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,

    '&>input': {
      marginBottom: 0,
    },
  },
  removeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 4,
    color: '#ffffff',
    border: '1px solid #ffffff',
    backgroundColor: '#ff5050',
    fontFamily: 'Satisfy',
    marginLeft: 8,
  },
  errorMessage: {
    fontSize: '12px',
    lineHeight: '12px',
    fontFamily: 'Poppins',
    color: '#990000',
    marginBottom: 4,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  addIngredient: {
    fontSize: '20px',
    lineHeight: '20px',
    padding: 12,
    borderRadius: 4,
    fontFamily: 'Satisfy',
    backgroundColor: '#9999ff',
    color: '#ffffff',
    marginBottom: 30,
    width: '100%',
  },
  submitButton: {
    fontSize: '26px',
    lineHeight: '26px',
    fontFamily: 'Satisfy',
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#33cc33',
    color: '#ffffff',
    width: '100%',
  },

  [TABLET]: {
    container: {
      padding: '16px 22px',
    },
    addIngredient: {
      fontSize: '25px',
      lineHeight: '25px',
      padding: 12,
      width: 300,
      marginBottom: 40,
    },
    submitButton: {
      fontSize: '30px',
      lineHeight: '30px',
      padding: 12,
      width: 300,
    },
  },

  [LAPTOP]: {
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 40,
    },
    addIngredient: {
      marginBottom: 0,
      fontSize: '30px',
      lineHeight: '30px',
    },
  },
});

export default NewRecipe;
