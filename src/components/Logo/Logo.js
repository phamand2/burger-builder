import React from 'react'
import burger from '../../assets/images/burger-logo.png'
import styles from './Logo.module.css'

const Logo = (props) => {
  return (
    <div className={styles.Logo}>
      <img src={burger} alt="burger-logo"/>
    </div>
  )
}

export default Logo
