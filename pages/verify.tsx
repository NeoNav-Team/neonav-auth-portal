import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import VerifyForm from '../components/forms/verifyUserForm';
import MenuContainer from '../components/menuContainer';

export default function Vierfy() {

  return (
    <PageContainer title="Verify">
        <FormContainer title="Verify Account">
          <VerifyForm />
        </FormContainer>
        <MenuContainer goBack={true} />
    </PageContainer>
  )
}
