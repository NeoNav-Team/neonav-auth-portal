import styles from '../../styles/Form.module.css';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { Alert, LinearProgress, Stack } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import executeApi from '../../utils/executeApi';
import TextfieldBox from '../textfieldBox';
import SubmitBox from '../submitBox';

interface ChangePasswordFormProps {
  children?: React.ReactNode;
}

interface ChangePasswordResponse {
  data: object;
}

export type LooseObject = {
  [key: string]: any
}


interface Payload {
    oldpass?: string;
    newpass1?: string;
    newpass2?: string;
    user?: string;
}

export default function ChangePasswordForm(props:ChangePasswordFormProps):JSX.Element {
  const { children } = props;
  const [tokenData, setTokenData ] = useState('');
  const [profileData, setProfileData ] = useState({} as LooseObject);
  const [ payload, setPayload ] = useState({} as Payload);
  const [ errors, setErrors ] = useState({} as Payload);
  const [success, setSuccess ] = useState(false);
  const [ submitError, setSubmitError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const userId = profileData?.auth?.userid || ''; 

  let payloadSchema = yup.object().shape({
    oldpass: yup.mixed().required("Password is Required").test(
      'no-chars',
      'You forgot a password',
      value =>  value && value.length >= 1
    ),
    newpass1: yup.mixed().required("New Password is Required").test(
      'no-chars',
      'You forgot a new password',
      value =>  value && value.length >= 1
    ),
    newpass2: yup.mixed().required("Repeat the new Password").test(
      'no-chars',
      'A new password is needed twice',
      value =>  value && value.length >= 1
    ).oneOf([yup.ref("newpass1")], "Passwords does not match"),
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

      executeApi('changePassword', {
        token: tokenData,
        userid: userId,
        'oldpass': value.oldpass,
        'newpass1': value.newpass1,
        'newpass2': value.newpass2,
      }, onSuccess, onError);
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

  const onSuccess = async (response:ChangePasswordResponse) => {
    console.log(response);
    setSubmitError('');
    setSuccess(true);
    setLoading(false);
  }

  const onProfileSuccess = (response:any) => {
    setLoading(false);
    setProfileData(response.data);
  }
  const onProfileError = (err:any) => {
    setLoading(false);
    console.log(JSON.stringify(err))
  }

  useEffect(() => {
    if (tokenData === '') {
      const accessToken =  Cookies.get('accessToken')|| '';
      setTokenData(accessToken);
      accessToken !== '' ? executeApi('profile', {token: accessToken}, onProfileSuccess, onProfileError) : setLoading(false);
    }
  }, [tokenData, setTokenData]);

  return (
    <form 
      className={styles.inputs}
    >
      {children}
        <TextfieldBox
        required
        label="old password"
        name="oldpass"
        error={errorCheck(errors?.oldpass)}
        helperText={'Provide Old Password' || errors?.oldpass}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="password"
        type="password"
      />
       <TextfieldBox
        required
        label="new password"
        name="newpass1"
        error={errorCheck(errors?.newpass1)}
        helperText={'Provide New Password' || errors?.newpass1}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="password"
        type="password"
      />
             <TextfieldBox
        required
        label="new password"
        name="newpass2"
        error={errorCheck(errors?.newpass2)}
        helperText={'Repeat New Password' || errors?.newpass2}
        handleChange={handleInput}
        handleBlur={handleBlur}
        autocompleteClasses="password"
        type="password"
      />
      <SubmitBox
        handleClick={handleSubmit}
        value="Update"
        disabled={disableCheck()}
        icon={<LockResetIcon sx={{ mr: 1 }} />}
      />
      <Stack sx={{ width:'80%', margin: "0 10%", color:'#7a04eb' }} spacing={2}>
        {loading && <LinearProgress color="inherit" />}
        {submitError && submitError.length !== -1 && <Alert  severity="error">{submitError}</Alert>}
        {success && <Alert severity="success">Password has been changed.</Alert>}
      </Stack>
      {children}
    </form>
  )
}