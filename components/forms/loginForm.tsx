import styles from '../../styles/Form.module.css';
import TextfieldBox from '../textfieldBox';
import SubmitBox from '../submitBox';

interface LoginFormProps {
  children?: React.ReactNode;
}

export default function LoginForm(props:LoginFormProps):JSX.Element {
  const { children } = props;
  return (
    <form className={styles.inputs}>
        {children}
        <TextfieldBox required label="ID or Email" />
        <TextfieldBox required label="Password" />
        <SubmitBox label="Engage" />
    </form>
  )
}