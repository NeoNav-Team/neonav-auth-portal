import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import ResetPasswordForm from '../components/forms/resetPasswordForm';

export default function Reset() {

  return (
    <PageContainer>
        <FormContainer title="Reset Password">
          <ResetPasswordForm />
        </FormContainer>
    </PageContainer>
  )
}
