import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import DeveloperForm from '../components/forms/developerForm';
import ApiKeyForm from '../components/forms/apikeyForm';

export default function Login() {

  return (
    <PageContainer title="Developer">
      <FormContainer title="Developer Info">
        <DeveloperForm />
      </FormContainer>
      <FormContainer title="API Key List">
        <ApiKeyForm />
      </FormContainer>
    </PageContainer>
  )
}
