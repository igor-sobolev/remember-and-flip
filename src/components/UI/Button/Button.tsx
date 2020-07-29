import React from 'react';

import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { onClick, ...restProps } = props;
  return (
    <button className={styles.button} onClick={onClick} {...restProps}>
      {props.children}
    </button>
  );
};

export default Button;
