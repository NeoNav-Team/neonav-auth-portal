import styles from '../../styles/Form.module.css';
import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import Cookies from 'js-cookie';
import {CircularProgress, Button, Paper, Box } from '@mui/material';
import executeApi from '../../utils/executeApi';
import JSONPretty from 'react-json-pretty';


export default function DeveloperForm():JSX.Element {
  const [loading, setLoading ] = useState(true);
  const [tokenData, setTokenData ] = useState('');
  const [profileData, setProfileData ] = useState({});

  const onSuccess = (response:any) => {
    setLoading(false);
    console.log(JSON.stringify(response))
    setProfileData(response.data);
  }
  const onError = (err:any) => {
    setLoading(false);
    console.log(JSON.stringify(err))
  }

  useEffect(() => {
    if (tokenData === '') {
      const accessToken =  Cookies.get('accessToken')|| '';
      setTokenData(accessToken);
      accessToken !== '' ? executeApi('profile', {token: accessToken}, onSuccess, onError) : setLoading(false);
    }
  }, [tokenData, setTokenData]);


  return (
    <Box sx={{margin: '10px'}}>
        <Paper style={{maxHeight: 100, padding: '4px', overflow: 'auto'}}>
           <p style= {{whiteSpace: 'nowrap'}}>{tokenData || 'No Token Found.'}</p>
        </Paper>
          <Button 
            variant="contained"
            color="secondary"
            sx={{width:'100%', padding: '4px',  marginBottom:'20px'}}
            onClick={() => {copy(`${tokenData}`)}}
          >
              Copy
            </Button>
        {loading ? <CircularProgress sx={{marginLeft:'46%'}} /> : (
          <Paper style={{maxHeight: 200, overflow: 'auto'}}>
           <JSONPretty id="json-profile" data={profileData}></JSONPretty>
        </Paper>
        )}
    </Box>
  )
}