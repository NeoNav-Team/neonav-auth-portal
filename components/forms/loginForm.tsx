import styles from '../../styles/Form.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { Alert, LinearProgress, Stack } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import executeApi from '../../utils/executeApi';
import ChipBox from '../chipBox';
import TextfieldBox from '../textfieldBox';
import SubmitBox from '../submitBox';

interface LoginFormProps {
  children?: React.ReactNode;
}

interface Payload {
  username?: string;
  password?: string;
}

interface LoginResponse {
  data:LoginResponseData;
}

interface LoginResponseData {
  accessToken: string; 
  id: string; 
  userid: string;
}

export default function LoginForm(props:LoginFormProps):JSX.Element {
  const { children } = props;
  const [ payload, setPayload ] = useState({});
  const [ errors, setErrors ] = useState({} as Payload);
  const [ submitError, setSubmitError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();

  const getQueryChips = () => {
    let queryChips = [];
    for (const [key, value] of Object.entries(router.query)) {
      const queryChip:object = {'name': key, 'value': value, 'id': queryChips.length};
      queryChips.push(queryChip)
    }
    return queryChips;
  }

  const chips: any[] = getQueryChips();

  let payloadSchema = yup.object().shape({
    username: yup.mixed().required("This is Required").test(
      'email-or-password',
      'Provide an email or id',
      value =>  value && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || !isNaN(value)
    ).test(
      'no-chars',
      'You forgot an email or id',
      value =>  value && value.length >= 1
    ),
    password: yup.mixed().required("Password is Required").test(
      'no-chars',
      'You forgot a password',
      value =>  value && value.length >= 1
    ),
  });

  const errorCheck = (error: any) => {
    return error && typeof error !== 'undefined';
  }
  const disableCheck = () => {
    const anyErrors = () => {
      let hasErrors = false;
      for (const [key, value] of Object.entries(errors)) {
        if (value && value.length !== -1){
          hasErrors = true;
        }
      }
      return hasErrors;
    }
    if(loading || anyErrors()) {
      return true;
    } else {
      return false;
    }
  }

  const onSuccess = async (response:LoginResponse) => {
    setSubmitError('');
    const accessToken = response.data.accessToken;
    Cookies.set('accessToken', accessToken, { domain: '.neonav.net' });
    const postUrl = `${router.query.post}`;
    if (postUrl) {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append('username', (payload as any).username);
        const res = await axios.post(postUrl, bodyFormData, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(err => {
         console.log('err', err);
      });
        console.log(res);
      } catch(err) {
        console.log(err);
      }
    }
    const redirectUrl = `${router.query.redirect}`;
    const redirect = router.query.redirect ? redirectUrl : 'https://neonav.net';

    setLoading(false);
    router.push(redirect); 
  }

  const onError = (err:any) => {
    const errMsg = err?.message;
    setLoading(false);
    setSubmitError(errMsg);
  }

  const handleInput = (event: React.MouseEvent<HTMLElement>) => {
    const eventTarget = event?.target as HTMLInputElement;
    const { name, value } = eventTarget;
    setPayload({...payload, [name]: value});
    setErrors({...errors, [name]: false});
  }

  const handleBlur = (event: React.MouseEvent<HTMLElement>) => {
    const eventTarget = event?.target as HTMLInputElement;
    const { name } = eventTarget;
    payloadSchema.validateAt(`'${name}'`, payload).catch(function (err) {
      setErrors({...errors, [name]: err.message});
    });
  }

  const handleSubmit = () => {
    setLoading(true);
    payloadSchema.validate(payload).then(function(value) {
      executeApi('login', value, onSuccess, onError);
    }).catch(function (err) {
      setErrors({...errors, [err.path]: err.message});
      setLoading(false);
    });
  }

  return (
    <form 
      className={styles.inputs}
    >
      {children}
      <ChipBox chips={chips} />
      <TextfieldBox
        required
        label="ID or Email"
        name="username"
        error={errorCheck(errors?.username)}
        helperText={errors?.username}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="username"
      />
      <TextfieldBox
        required
        label="Password"
        name="password"
        type="password"
        error={errorCheck(errors?.password)}
        helperText={errors?.password}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="password"
      />
      <SubmitBox
        handleClick={handleSubmit}
        value="Engage"
        disabled={disableCheck()}
        icon={<RocketLaunchIcon sx={{ mr: 1 }} />}
      />
      <Stack sx={{ width:'80%', margin: "0 10%", color:'#7a04eb' }} spacing={2}>
        {loading && <LinearProgress color="inherit" />}
        {submitError && submitError.length !== -1 && <Alert  severity="error">{submitError}</Alert>}
      </Stack>
    </form>
  )
}