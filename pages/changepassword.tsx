import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import ChangePasswordForm from '../components/forms/changePasswordForm';
import MenuContainer from '../components/menuContainer';

export default function Reset() {

  return (
    <PageContainer title="Change Password">
        <FormContainer title="Change Password">
          <ChangePasswordForm />
        </FormContainer>
        <MenuContainer goBack={true} />
    </PageContainer>
  )
}
