import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import ForgotPasswordForm from '../components/forms/forgotPasswordForm';

export default function Login() {

  return (
    <PageContainer>
        <FormContainer title="Forgot Password">
          <ForgotPasswordForm />
        </FormContainer>
    </PageContainer>
  )
}
