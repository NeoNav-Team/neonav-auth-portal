import styles from '../../styles/Form.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { Alert, LinearProgress, Stack } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import executeApi from '../../utils/executeApi';
import TextfieldBox from '../textfieldBox';
import SubmitBox from '../submitBox';

interface ResetPasswordFormProps {
  children?: React.ReactNode;
}

interface ResetPasswordResponse {
  data: object;
}

interface Payload {
    code?: string;
    email?: string;
    password?: string;
}

export default function ResetPasswordForm(props:ResetPasswordFormProps):JSX.Element {
  const { children } = props;
  const router = useRouter();
  const [ payload, setPayload ] = useState({});
  const [ paramsReady, setParamsReady ] = useState(false);
  const [ errors, setErrors ] = useState({} as Payload);
  const [success, setSuccess ] = useState(false);
  const [ submitError, setSubmitError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  let payloadSchema = yup.object().shape({
    code: yup.number().required("This is Required"),
    password: yup.mixed().required("Password is Required").test(
      'no-chars',
      'You forgot a password',
      value =>  value && value.length >= 1
    ),
    email: yup.string().required("This is Required").email(),
  });

  const errorCheck = (error: any) => {
    return error && typeof error !== 'undefined';
  }
  const disableCheck = () => {
    const anyErrors = () => {
      let hasErrors = false;
      for (const [key, value] of Object.entries(errors)) {
        if (value && value !== ''){
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

  const handleBlur = (event: React.MouseEvent<HTMLElement>) => {
    const eventTarget = event?.target as HTMLInputElement;
    const { name } = eventTarget;
    payloadSchema.validateAt(`'${name}'`, payload).catch(function (err) {
      setErrors({...errors, [name]: err.message});
    });
  }

  const handleInput = (event: React.MouseEvent<HTMLElement>) => {
    const eventTarget = event?.target as HTMLInputElement;
    const { name, value } = eventTarget;
    setPayload({...payload, [name]: value});
    setErrors({...errors, [name]: false});
  }

  const handleSubmit = () => {
    setLoading(true);
    payloadSchema.validate(payload).then(function(value) {
      executeApi('verifyEmail', value, onSuccess, onError);
    }).catch(function (err) {
      setErrors({...errors, [err.path]: err.message});
      setLoading(false);
    });
  }

  const onError = (err:any) => {
    console.log('err', err);
    const errMsg = err?.message;
    setLoading(false);
    setSubmitError(errMsg);
  }

  const onSuccess = async (response:ResetPasswordResponse) => {
    setSubmitError('');
    setSuccess(true);
    setLoading(false);
  }
  useEffect(() => {
    if (router.isReady) {
      setParamsReady(router.isReady);
      const { code, email } = router.query;
      let defaultPayload:Payload = { code: `${code}`, email: `${email}`};
      setPayload(defaultPayload);
    }
  }, [router.isReady, router.query]);

  return (
    <>{ paramsReady && (
    <form 
      className={styles.inputs}
    >
      {children}
      <TextfieldBox
        required
        label="code"
        name="code"
        error={errorCheck(errors?.code)}
        helperText={errors?.code}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="code"
        defaultValue={router.query['code'] as string}
      />
      <TextfieldBox
        required
        label="email"
        name="email"
        error={errorCheck(errors?.email)}
        helperText={errors?.email}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="email"
        defaultValue={router.query['email'] as string}
      />
        <TextfieldBox
        required
        label="password"
        name="password"
        error={errorCheck(errors?.password)}
        helperText={'Provide a New Password' || errors?.password}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="password"
        type="password"
      />
      <SubmitBox
        handleClick={handleSubmit}
        value="Reset"
        disabled={disableCheck()}
        icon={<LockResetIcon sx={{ mr: 1 }} />}
      />
      <Stack sx={{ width:'80%', margin: "0 10%", color:'#7a04eb' }} spacing={2}>
        {loading && <LinearProgress color="inherit" />}
        {submitError && submitError.length !== -1 && <Alert  severity="error">{submitError}</Alert>}
        {success && <Alert severity="success">Password has been reset.</Alert>}
      </Stack>
    </form>
    )}</>
  )
}