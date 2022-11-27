import styles from '../styles/Form.module.css';


interface LoginFormProps {
    children?: React.ReactNode;
}

export default function TextBox(props:LoginFormProps):JSX.Element {
  const { 
    children
  } = props;

  return (
    <div className={styles.textContainer}
    data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both">
      {children}
    </div>
  )
}