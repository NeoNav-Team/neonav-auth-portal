import styles from '../../styles/Form.module.css';
import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import Cookies from 'js-cookie';
import { CircularProgress, Button, Paper, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import executeApi from '../../utils/executeApi';
import JSONPretty from 'react-json-pretty';

export default function DeveloperForm(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState('');
  const [apiData, setApiData] = useState<any[]>([]);

  const onSuccess = (response: any) => {
    setLoading(false);
    console.log(JSON.stringify(response));
    setApiData(response.data);
  };

  const onError = (err: any) => {
    setLoading(false);
    console.log(JSON.stringify(err));
  };

  const handleDelete = (key: string) => {
    setLoading(true);
    executeApi('deleteApiKey', { token: tokenData, key }, () => {
      setApiData(apiData.filter(item => item.key !== key));
      setLoading(false);
    }, onError);
  };

  const handleNewApiKey = () => {
    setLoading(true);
    executeApi('newApiKey', { token: tokenData }, (response: any) => {
      const newApiKey = response.data;
      if (newApiKey && newApiKey.key) {
        setApiData(prevApiData => [...prevApiData, newApiKey]);
        window.location.reload(); // Refresh the page
      } else {
        console.error('Invalid API key response:', response);
        setLoading(false);
      }
    }, onError);
  };

  useEffect(() => {
    if (tokenData === '') {
      const accessToken = Cookies.get('accessToken') || '';
      setTokenData(accessToken);
      accessToken !== '' ? executeApi('apikeys', { token: accessToken }, onSuccess, onError) : setLoading(false);
    }
  }, [tokenData, setTokenData]);

  return (
    <Box sx={{ margin: '10px' }}>
      {loading ? <CircularProgress sx={{ marginLeft: '46%' }} /> : (
        <Paper style={{ overflow: 'auto' }}>
          <List>
            {apiData.map((item) => (
              <ListItem key={item.key}>
                <ListItemText primary={item.ts} secondary={`${item.behalf} (${item.behalfname})`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.key)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Box sx={{ textAlign: 'center', margin: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleNewApiKey}>
              Generate New API Key
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}