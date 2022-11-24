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
interface MenuContainerProps {
  goBack?: boolean;
}


export default function MenuContainer(props:MenuContainerProps):JSX.Element | null {
  const { goBack } = props;
  const [dataLoc, setDataLoc] = useState('loading');
  const router = useRouter();

  useEffect(() => {
    if(!goBack) {
      const onSuccess = (response:netCheckResponse) => {
          setDataLoc(response.data.message );
      };
      const onError = (err:object) => {
          console.log('error', err);
      };
      executeApi('netCheck', {}, onSuccess, onError);
    }
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
                    {goBack && <Button className={styles.button} onClick={()=> goToLocation('/login')}>Return to Login</Button>}
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