import styles from '../../styles/Form.module.css';
import TextfieldBox from '../textfieldBox';
import SubmitBox from '../submitBox';
import { useState } from 'react';
import * as yup from 'yup';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import executeApi from '../../utils/executeApi';


interface LoginFormProps {
  children?: React.ReactNode;
}

interface Payload {
  username?: string;
  password?: string;
}

export default function LoginForm(props:LoginFormProps):JSX.Element {
  const { children } = props;
  const [ payload, setPayload ] = useState({});
  const [ errors, setErrors ] = useState({} as Payload);
  const [ submitError, setSubmitError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  let payloadSchema = yup.object().shape({
    username: yup.mixed().required("This is Required").test(
      'email-or-password',
      'Provide an email or id',
      username =>  username && username.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || !isNaN(username)
    ).test(
      'no-chars',
      'You forgot an email or id',
      username =>  username && username.length >= 1
    ),
    password: yup.mixed().required("Password is Required").test(
      'no-chars',
      'You forgot a password',
      username =>  username && username.length >= 1
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

  const onSuccess = (data:object) => {
    console.log('success!', data);
    setLoading(false);
    setSubmitError('');
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
      <TextfieldBox
        required
        label="ID or Email"
        name="username"
        error={errorCheck(errors?.username)}
        helperText={errors?.username}
        handleChange={handleInput}
        handleBlur={handleBlur}
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
      />
      <SubmitBox
        handleClick={handleSubmit}
        value="Engage"
        disabled={disableCheck()}
      />
      <Stack sx={{ width:'80%', margin: "0 10%", color:'#7a04eb' }} spacing={2}>
        {loading && <LinearProgress color="inherit" />}
        {submitError && submitError.length !== -1 && <Alert  severity="error">{submitError}</Alert>}
      </Stack>
    </form>
  )
}