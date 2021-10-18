import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { TABLET, LAPTOP } from './break-points';

type SidebarProps = {
  showSidebar: boolean;
};

function Sidebar ({showSidebar}: SidebarProps) {
  const classes = styles({ showSidebar });

  const linksList = [
    {
      to: '/',
      text: 'All Recipes',
    },
    {
      to: '/new',
      text: 'Add Recipe',
    },
  ];

  return (
    <section className={classes.container}>
      <ul className={classes.list}>
        {linksList.map(({to, text}, index) => (
          <li key={index} className={classes.listItem}>
            <Link to={to} className={classes.link}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

const styles = createUseStyles({
  container: ({showSidebar}: SidebarProps) => ({
    backgroundColor: '#242729',
    width: '95vw',
    position: 'fixed',
    zIndex: 1,
    padding: 16,
    boxShadow: showSidebar ? '3px 0 3px #181a1b' : 'none',
    top: 60,
    bottom: 0,
    transform: [`translateX(${showSidebar ? 0 : '-95vw'})`],
    transition: 'transform 0.2s ease-in',
  }),
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    marginRight: 30,
  },
  listItem: {
    padding: '15px 0',
    borderBottom: '1px #fff solid',
    cursor: 'pointer',
  },
  link: {
    fontFamily: 'Poppins',
    display: 'flex',
    color: '#fff',
  },

  [TABLET]: {
    container: ({showSidebar}: SidebarProps) => ({
      width: '60vw',
      padding: 22,
      top: 90,
      transform: [`translateX(${showSidebar ? 0 : '-60vw'})`],
    }),
    listItem: {
      padding: '20px 13px',
    },
    link: {
      fontSize: '20px',
      lineHeiht: '20px',
    },
  },

  [LAPTOP]: {
    container: () => ({
      gridArea: 'sidebar',
      transform: ['translateX(0)'],
      position: 'static',
      boxShadow: 'none',
      width: '300px',
      backgroundColor: '#282a2b',
      display: 'flex',
      flexDirection: 'column',
    }),
    profileImage: {
      alignSelf: 'center',
    },
  },
});

export default Sidebar;
