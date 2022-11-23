import styles from '../../styles/Form.module.css';
import SubmitBox from '../submitBox';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import executeApi from '../../utils/executeApi';
import TextfieldBox from '../textfieldBox';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';


interface ForgotPasswordFormProps {
  children?: React.ReactNode;
}

interface ForgotPasswordResponse {
  data: object;
}

interface Payload {
  email?: string;
}


export default function ForgotPasswordForm(props:ForgotPasswordFormProps):JSX.Element {
  const { children } = props;
  const [ payload, setPayload ] = useState({});
  const [ errors, setErrors ] = useState({} as Payload);
  const [success, setSuccess ] = useState(false);
  const [ submitError, setSubmitError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  let payloadSchema = yup.object().shape({
    email: yup.string().required("This is Required").email(),
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
      executeApi('restPassword', value, onSuccess, onError);
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

  const onSuccess = async (response:ForgotPasswordResponse) => {
    setSubmitError('');
    setSuccess(true);
    setLoading(false);
  }

  return (
    <form 
      className={styles.inputs}
    >
      {children}
      <TextfieldBox
        required
        label="email"
        name="email"
        error={errorCheck(errors?.email)}
        helperText={errors?.email}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="password"
      />
      <SubmitBox
        handleClick={handleSubmit}
        value="Email"
        disabled={disableCheck()}
        icon={<SendIcon sx={{ mr: 1 }} />}
      />
      <Stack sx={{ width:'80%', margin: "0 10%", color:'#7a04eb' }} spacing={2}>
        {loading && <LinearProgress color="inherit" />}
        {submitError && submitError.length !== -1 && <Alert  severity="error">{submitError}</Alert>}
        {success && <Alert severity="success">Password reset as been emailed.</Alert>}
      </Stack>
    </form>
  )
}