import { useState, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import Header from './Header';
import Sidebar from './Sidebar';
import { TABLET, LAPTOP } from './break-points';
import background from  './background.jpg'

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({children}: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const classes = styles();

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  };
  function closeSidebar() {
    setShowSidebar(false);
  };

  return (
    <div className={classes.layout}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
      <div className={classes.container}>
        <div className={classes.background}/>
        <div className={classes.backgroundGradient}/>

        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

const styles = createUseStyles({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    width: '100%',
    overflow: 'scroll',
  },
  content: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 166,
    borderRadius: 4,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: 250,
    top: 0,
    left: 0,
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'center',
    zIndex: -1,
  },
  backgroundGradient: {
    position: 'absolute',
    width: '100%',
    height: 251,
    top: 0,
    left: 0,
    background: '-webkit-linear-gradient(top, rgba(255,255,255,0) 60%,rgba(255,255,255,1) 100%)',
    zIndex: -1,
  },

  [TABLET]: {
    background: {
      height: 350,
    },
    backgroundGradient: {
      height: 351,
    },
    content: {
      margin: '266px 22px 16px',
    },
    recipesGrid: {
      gridTemplateColumns: '1fr 1fr 1fr',
      columnGap: 16,
    },
  },

  [LAPTOP]: {
    layout: {
      display: 'grid',
      gridTemplateColumns: '300px auto',
      gridTemplateRows: '200px auto',
      gridTemplateAreas: '"header content" "sidebar content"',
    },
    container: {
      height: '100vh',
    },
    content: {
      gridArea: 'content',
    },
  },
});

export default Layout;
