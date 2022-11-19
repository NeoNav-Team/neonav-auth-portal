import styles from '../styles/Form.module.css'
import Button from '@mui/material/Button';

interface LoginFormProps {
  children?: React.ReactNode;
  label?: string;
  value?: String;
  disabled?: boolean;
  handleClick?: any;
  icon?: JSX.Element;
}

export default function SubmitBox(props:LoginFormProps):JSX.Element {
  const { children, value, handleClick, disabled, icon } = props;
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
            {icon}
            {value}
            {children}
        </Button>
    </div>
  )
}