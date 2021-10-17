import { useState, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import Header from './Header';
import Sidebar from './Sidebar';
import { LAPTOP } from './break-points';

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({children}: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const classes = styles();

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={classes.layout}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar showSidebar={showSidebar} />
      <div className={classes.content}>
        {children}
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
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'scroll',
  },

  [LAPTOP]: {
    layout: {
      display: 'grid',
      gridTemplateColumns: '300px auto',
      gridTemplateRows: '200px auto',
      gridTemplateAreas: '"header content" "sidebar content"',
    },
    content: {
      gridArea: 'content',
    },
  },
});

export default Layout;
