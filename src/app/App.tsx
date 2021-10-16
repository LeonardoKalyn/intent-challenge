import {createUseStyles} from 'react-jss';

const styles = createUseStyles({
  title: {
    fontSize: '80px',
    lineHeight: '84px',
    fontFamily: 'Satisfy',
    textAlign: 'center',
    color: '#000000',
  },
})

function App() {
  const classes = styles();
  return (
    <div>
      <header>
        <h1 className={classes.title}>
          Ricetta
        </h1>
      </header>
    </div>
  );
}

export default App;
