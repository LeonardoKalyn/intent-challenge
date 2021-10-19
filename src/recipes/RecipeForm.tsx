import { createUseStyles } from 'react-jss';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
import { TABLET, LAPTOP } from '../shared/break-points';
import Recipe from './RecipeType';

export type FormValues = {
  id: string;
  name: string;
  ingredients: {value: string}[];
};

type FormProps = {
  initialValues?: Recipe;
  onSubmit: (data: any) => void;
};

const schema = yup.object().shape({
  name: yup.string().required('Recipes should have a name!'),
  ingredients: yup.array().of(
    yup.object().shape({
      value: yup.string().required('Ingredients can\'t be empty!'),
    })
  ).min(1, 'Recipes need ingredients!').required('Recipes need ingredients!'),
}).required();

function RecipeForm ({onSubmit, initialValues}: FormProps) {
  const classes = styles();

  const defaultValues = initialValues
    ? {
      ...initialValues,
      ingredients: initialValues.ingredients.map(value => ({ value })),
    } : {
      ingredients: [{value: ''}],
    };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className={classes.form}
      data-testid="form"
    >
      <label className={classes.label}>
        Name:
      </label>
      <ErrorMessage
        errors={errors}
        name="name"
        as={<span className={classes.errorMessage}/>}
        data-testid="name-error-message"
        role="alert"
      />
      <input
        className={classes.input}
        {...register('name')}
        data-testid="name-input"
      />

      <label className={classes.label}>
        Ingredients:
      </label>
      <ErrorMessage
        errors={errors}
        name="ingredients"
        as={<span className={classes.errorMessage}/>}
        data-testid="ingredients-error-message"
        role="alert"
      />
      {fields.map((field, index) => (
        <div key={field.id} data-testid="ingredients">
          <ErrorMessage
            errors={errors}
            name={`ingredients.${index}.value`}
            as={<span className={classes.errorMessage}/>}
            data-testid={`ingredients-${index}-error-message`}
            role="alert"
          />
          <div className={classes.inputLine}>
            <input
              className={classes.input}
              {...register(`ingredients.${index}.value` as const)}
              data-testid={`ingredients-${index}-input`}
            />
            <button
              type="button"
              className={classes.removeButton}
              onClick={() => remove(index)}
              data-testid={`ingredients-${index}-remove-button`}
            >
              X
            </button>
          </div>
        </div>
      ))}

      <div className={classes.buttonContainer}>
        <button
          type="button"
          className={classes.addIngredient}
          onClick={() => append({value: ''})}
          data-testid="add-ingredient-button"
        >
          Add Ingredient
        </button>

        <button
          className={classes.submitButton}
          type="submit"
          data-testid="submit-button"
        >
          Save Recipe
        </button>
      </div>
    </form>
  );
};

const styles = createUseStyles({
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

export default RecipeForm;
