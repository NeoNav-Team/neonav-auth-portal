import styles from '../styles/Form.module.css'
import TextField from '@mui/material/TextField';

interface LoginFormProps {
  children?: React.ReactNode;
  label?: string;
  id?: string;
  required?: boolean;
  error?: boolean;
}

export default function TextfieldBox(props:LoginFormProps):JSX.Element {
  const { children, label, id, required, error } = props;
  return (
    <div className={styles.inputContainer}
    data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both">
        <TextField
          required={required}
          error={error}
          style={{width: "100%",color: "#ffffff"}}
          id={id}
          label={label}
          variant="standard"
        />
    </div>
  )
}