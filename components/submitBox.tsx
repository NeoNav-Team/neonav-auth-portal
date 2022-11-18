import styles from '../styles/Form.module.css'
import Button from '@mui/material/Button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

interface LoginFormProps {
  children?: React.ReactNode;
  label?: string;
  id?: string;
}

export default function SubmitBox(props:LoginFormProps):JSX.Element {
  const { children, label, id} = props;
  return (
    <div 
        className={styles.submitContainer}
        data-augmented-ui="tr-clip-x tl-clip-x br-clip-x bl-clip-x both">
         <Button
            variant="contained"
            disableElevation 
            style={{
                width: "100%",
                fontFamily: `"Orbitron", sans-serif`,
                fontWeight: 700,
                letterSpacing: "0.5em"
            }}
            size="large"
        >
            <RocketLaunchIcon sx={{ mr: 1 }} />
            {label}
        </Button>
    </div>
  )
}