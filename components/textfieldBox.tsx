import styles from '../styles/Form.module.css';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";


interface LoginFormProps {
  label?: string;
  name: string;
  value?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  handleChange?: any;
  handleBlur?: any;
  type?: string;
}

const StyledTextField = styled(TextField)({
  "& label": {
    color: "#41c5ff"
  },
  "& .MuiInput-input": {
    color: "white"
  },
  "& label.Mui-focused": {
    color: "#41c5ff",
    opacity: 1
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#7a04eb"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fe75fe"
  },
  "& .MuiInput-underline:hover:after": {
    borderBottomColor: "#fe75fe"
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "#7a04eb"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#7a04eb",
    },
    "&:hover fieldset": {
      borderColor: "#7a04eb",
      borderWidth: 2
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7a04eb"
    },
  },
  "& p": {
    position: "absolute",
    right: 0
  },
});


export default function TextfieldBox(props:LoginFormProps):JSX.Element {
  const { label, name, value, required, error, handleBlur, handleChange, helperText, type } = props;

  return (
    <div className={styles.inputContainer}
    data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both">
        <StyledTextField
          required={required}
          error={error}
          name={name}
          type={type}
          style={{width: "100%"}}
          inputProps={{ 
            input: { color: 'red' }
          }}
          label={label}
          variant="standard"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={helperText}
        />
    </div>
  )
}