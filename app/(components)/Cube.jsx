import React from 'react';
import styles from '../../styles/Cube.module.css';  

const Cube = ({color}) => {
  return (
    <div className={styles.scene}>
    <div className={styles.cube}>
      <div className={`${styles.front} ${styles[color]}`}></div>
      <div className={`${styles.back} ${styles[color]}`}></div>
      <div className={`${styles.top} ${styles[color]}`}></div>
      <div className={`${styles.bottom} ${styles[color]}`}></div>
      <div className={`${styles.right} ${styles[color]}`}></div>
      <div className={`${styles.left} ${styles[color]}`}></div>
    </div>
  </div>
  );
}

export default Cube;
