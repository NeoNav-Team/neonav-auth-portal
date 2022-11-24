import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import RegisterForm from '../components/forms/registerForm';
import MenuContainer from '../components/menuContainer';

export default function Register() {

  return (
    <PageContainer>
        <FormContainer title="Register">
          <RegisterForm />
        </FormContainer>
        <MenuContainer goBack={true} />
    </PageContainer>
  )
}
