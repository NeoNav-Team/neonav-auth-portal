import styles from '../styles/Form.module.css'
import Button from '@mui/material/Button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';

interface LoginFormProps {
  children?: React.ReactNode;
  label?: string;
  value?: String;
  disabled?: boolean;
  handleClick?: any;
}

export default function SubmitBox(props:LoginFormProps):JSX.Element {
  const { children, value, handleClick, disabled } = props;
  return (
    <div 
        className={styles.submitContainer}
        data-augmented-ui="tr-clip-x tl-clip-x br-clip-x bl-clip-x both"
        >
            <Button
                onClick={handleClick}
                variant="contained"
                disableElevation
                disabled={disabled}
                style={{
                    width: "100%",
                    backgroundColor: "#41c5ff",
                    fontFamily: `"Orbitron", sans-serif`,
                    fontWeight: 700,
                    letterSpacing: "0.5em"
                }}
                size="large"
            >
            <RocketLaunchIcon sx={{ mr: 1 }} />
            {value}
            {children}
        </Button>
    </div>
  )
}