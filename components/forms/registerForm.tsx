import styles from '../../styles/Form.module.css';
import TextfieldBox from '../textfieldBox';
import SubmitBox from '../submitBox';
import { useState } from 'react';
import * as yup from 'yup';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Stack, Alert } from '@mui/material';
import executeApi from '../../utils/executeApi';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { useRouter } from 'next/router';


interface RegisterFormProps {
  children?: React.ReactNode;
}

interface Payload {
  email?: string;
  password?: string;
}

interface RegisterResponse {
  data:RegisterResponseData;
}

interface RegisterResponseData {
  accessToken: string; 
  id: string; 
  userid: string;
}

export default function RegisterForm(props:RegisterFormProps):JSX.Element {
  const { children } = props;
  const [ payload, setPayload ] = useState({});
  const [ errors, setErrors ] = useState({} as Payload);
  const [success, setSuccess ] = useState(false);
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
    email: yup.string().required("This is Required").email(),
    password: yup.mixed().required("Password is Required").test(
      'no-chars',
      'You forgot a password',
      value =>  value && value.length >= 1
    ).test(
        'no-chars',
        'Must be 10 characters or more',
        value =>  value && value.length >= 10
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
    if(loading || success || anyErrors()) {
      return true;
    } else {
      return false;
    }
  }

  const onSuccess = async (response:RegisterResponse) => {
    setSubmitError('');
    setLoading(false);
    setSuccess(true);
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

  const goToLocation = (location:string) => {
    router.push(location); 
  }

  const handleSubmit = () => {
    setLoading(true);
    payloadSchema.validate(payload).then(function(value) {
      executeApi('signup', value, onSuccess, onError);
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
        label="Email"
        name="email"
        error={errorCheck(errors?.email)}
        helperText={errors?.email || "Email is not shared with third parties intentionally"}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="email"
      />
      <TextfieldBox
        required
        label="Password"
        name="password"
        error={errorCheck(errors?.password)}
        helperText={errors?.password || "Requires 10 characters with numbers and symbols"}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="password"
      />
        <p className={styles.legaleeze} onClick={()=> goToLocation('/eula')}>By clicking below you accept our <span>EULA</span></p>
      <SubmitBox
        handleClick={handleSubmit}
        value="Sign Up"
        disabled={disableCheck()}
        icon={<HistoryEduIcon sx={{ mr: 1 }} />}
      />
      <Stack sx={{ width:'80%', margin: "0 10%", color:'#7a04eb' }} spacing={2}>
        {loading && <LinearProgress color="inherit" />}
        {submitError && submitError.length !== -1 && <Alert  severity="error">{submitError}</Alert>}
        {success && <Alert severity="success">Please check your email to continue.</Alert>}
      </Stack>
    </form>
  )
}