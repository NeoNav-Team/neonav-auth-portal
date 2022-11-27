import styles from '../../styles/Form.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { Alert, LinearProgress, Stack } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import executeApi from '../../utils/executeApi';
import TextfieldBox from '../textfieldBox';
import TextBox from '../textBox';
import SubmitBox from '../submitBox';

interface InviteFormProps {
  children?: React.ReactNode;
}

interface Payload {
  email?: string;
  invite?: string;
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

export default function InviteForm(props:InviteFormProps):JSX.Element {
  const { children } = props;
  const [ payload, setPayload ] = useState({});
  const [ paramsReady, setParamsReady ] = useState(false);
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

  useEffect(() => {
    if (router.isReady) {
      setParamsReady(router.isReady);
      const { id } = router.query;
      let defaultPayload:Payload = { invite: `${id}` };
      setPayload(defaultPayload);
    }
  }, [router.isReady, router.query]);

  return (
    <>{ paramsReady && (
    <form 
      className={styles.inputs}
    >
      {children}
      <TextBox>{router.query['id'] as string}</TextBox>
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
    )}</>
  )
}