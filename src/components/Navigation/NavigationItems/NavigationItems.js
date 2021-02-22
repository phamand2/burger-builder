import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'

const NavigationItems = (props) => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link='/' exact>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Order</NavigationItem>
    </ul>
  )
}

export default NavigationItems
