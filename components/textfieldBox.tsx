import styles from '../styles/Form.module.css';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import { boolean } from 'yup';


interface LoginFormProps {
  autocompleteClasses?: string;
  defaultValue?: string;
  error?: boolean;
  helperText?: string;
  handleChange?: any;
  handleBlur?: any;
  label?: string;
  name: string;
  required?: boolean;
  type?: string;
  value?: string;
  rows?: number;
  multiline?: boolean;
  shrink?: boolean;
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
    right: 0,
    color: "#fe75fe",
  },
});


export default function TextfieldBox(props:LoginFormProps):JSX.Element {
  const { 
    autocompleteClasses,
    error,
    defaultValue,
    handleBlur,
    handleChange,
    helperText,
    label,
    multiline,
    name,
    shrink,
    required,
    rows,
    type,
    value
  } = props;

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
            autoComplete: autocompleteClasses,
            shrink: shrink
          }}
          label={label}
          variant="standard"
          value={value}
          multiline={multiline}
          rows={rows}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={helperText}
          defaultValue={defaultValue}
        />
    </div>
  )
}