import { createUseStyles } from 'react-jss';
import { TABLET, LAPTOP } from './break-points';
import Menu from './Menu';

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({toggleSidebar}: HeaderProps) => {
  const classes = styles();
  return (
    <header className={classes.header}>
      <button onClick={toggleSidebar} className={classes.menuButton}>
        <Menu className={classes.menuIcon} />
      </button>
      <h1 className={classes.title}>
        Ricetta
      </h1>
    </header>
  );
};

const styles = createUseStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100vw',
    height: 60,
    padding: 16,
    backgroundColor: '#282a2b',
  },
  title: {
    fontSize: '26px',
    lineHeight: '28px',
    fontFamily: 'Satisfy',
    color: '#ffffff',
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 26,
  },
  menuIcon: {
    fill: '#ffffff',
    height: 28,
    width: 28,
  },

  [TABLET]: {
    header: {
      height: 90,
      padding: 20,
    },
    menuButton: {
      padding: 4,
    },
    menuIcon: {
      height: 40,
      width: 40,
    },
    title: {
      fontSize: '40px',
      lineHeight: '42px',
    },
  },

  [LAPTOP]: {
    header: {
      gridArea: 'header',
      width: '100%',
      height: '200px',
    },
    menuButton: {
      display: 'none',
    },
    title: {
      width: '100%',
      fontSize: '60px',
      lineHeight: '62px',
      textAlign: 'center',
    }
  }
});

export default Header;
