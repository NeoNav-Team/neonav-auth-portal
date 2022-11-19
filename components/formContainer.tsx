import styles from '../styles/Form.module.css';
import React, { useState } from 'react';

interface PageContainerProps {
  title?: string;
  children?: React.ReactNode;
}

export default function FormContainer(props:PageContainerProps):JSX.Element {
  const { children, title } = props;
  const [payload, setPayload] = useState({});

  return (
    <div className={styles.form}>
        <div
        className={styles.pitchMixinPane}
        data-augmented-ui="tl-clip tr-clip-x br-clip b-scoop bl-clip both"
      >
        <div className={styles.content}>
            <div className={styles.title}>
                <h2>{title}</h2>
            </div>
            {children}
        </div>
      </div>
    </div>
  )
}