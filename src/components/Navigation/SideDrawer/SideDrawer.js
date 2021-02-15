import React from 'react'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.module.css'

const SideDrawer = (props) => {
  let attachedClasses = [styles.SideDrawer, styles.Close]
  if(props.open){
    attachedClasses = [styles.SideDrawer, styles.Open]
  }



  return (
    <>
    <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(' ')}>
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
    </>
  )
}

export default SideDrawer
