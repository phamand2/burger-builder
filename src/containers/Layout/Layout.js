import React from "react";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import styles from './Layout.module.css'

const Layout = (props) => {
  return (
    <>
      <Toolbar />
      <SideDrawer />
      <main className={styles.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
