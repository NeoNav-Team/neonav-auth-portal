import PageContainer from '../components/pageContainer'
import FormContainer from '../components/formContainer'
import LoginForm from '../components/forms/loginForm'

export default function Login() {
  return (
    <PageContainer>
        <FormContainer title="Login">
            <LoginForm />
        </FormContainer>
    </PageContainer>
  )
}
