import React from 'react';
import classnames from 'classnames';

import { ModalInfoProps } from './ModalInfo.types';

import styles from './ModalInfo.module.scss';

const ModalInfo: React.FunctionComponent<ModalInfoProps> = (props: ModalInfoProps) => {
  const { fixed, children } = props;
  const classes = classnames(styles['modal-info'], {
    [styles['modal-info--fixed']]: fixed
  });

  return (
    <div className={classes}>
      <h3 className={styles['modal-info__message']}>{children}</h3>
    </div>
  );
};

export default ModalInfo;
