import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import DeveloperForm from '../components/forms/developerForm';

export default function Login() {

  return (
    <PageContainer title="Developer">
        <FormContainer title="Developer Info">
            <DeveloperForm />
        </FormContainer>
    </PageContainer>
  )
}
