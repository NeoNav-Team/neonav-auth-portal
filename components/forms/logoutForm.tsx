import styles from '../../styles/Form.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { LinearProgress, Stack } from '@mui/material';
import EjectIcon from '@mui/icons-material/Eject';
import SubmitBox from '../submitBox';

interface LogoutFormProps {
  children?: React.ReactNode;
}

export default function LogoutForm(props:LogoutFormProps):JSX.Element {
  const { children } = props;
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setLoading(true);
    Cookies.remove('accessToken', { domain: '.neonav.net' });
    router.push('/login');
  }

  return (
    <form 
      className={styles.inputs}
    >
      {children}
      <SubmitBox
        handleClick={handleSubmit}
        value="Eject"
        icon={<EjectIcon sx={{ mr: 1 }} />}
      />
      <Stack sx={{ width:'80%', margin: "0 10%", color:'#7a04eb' }} spacing={2}>
        {loading && <LinearProgress color="inherit" />}
      </Stack>
    </form>
  )
}