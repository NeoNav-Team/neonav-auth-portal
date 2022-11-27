import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import MenuContainer from '../components/menuContainer';
import LoginForm from '../components/forms/loginForm';

export default function Login() {

  return (
    <PageContainer title="Login">
        <FormContainer title="Login">
          <LoginForm />
        </FormContainer>
        <MenuContainer />
    </PageContainer>
  )
}
