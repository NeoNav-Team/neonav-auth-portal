import styles from '../styles/Menu.module.css';
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import executeApi from '../utils/executeApi';
import { useRouter } from 'next/router';

interface netCheckResponseData {
    message: string;
}

interface netCheckResponse {
    data: netCheckResponseData;
}


export default function MenuContainer():JSX.Element | null {
  const [dataLoc, setDataLoc] = useState('loading');
  const router = useRouter();

  useEffect(() => {
    const onSuccess = (response:netCheckResponse) => {
        setDataLoc(response.data.message );
    };
    const onError = (err:object) => {
        console.log('error', err);
    };
    executeApi('netCheck', {}, onSuccess, onError);
  });

  const goToLocation = (location:string) => {
    router.push(location); 
  }


  return (
    <div className={styles.menu}>
        <div
        className={styles.pitchMixinPane}
        data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both"
      >
        <div className={styles.content}>
            <div className={styles.title}>
                <ButtonGroup size="small" aria-label="small button group">
                    {dataLoc === 'internet' && (
                        <>
                        <Button className={styles.button} onClick={()=> goToLocation('/register')}>Sign Up</Button>
                        <Button className={styles.button} onClick={()=> goToLocation('/forgot')}>Forgot Password</Button>
                        </>
                    )}
                    {dataLoc === 'intranet' && (
                        <Button className={styles.button} onClick={()=> goToLocation('/invite')}>Invite Code</Button>
                    )}
                </ButtonGroup>
            </div>
        </div>
      </div>
    </div>
  );
}