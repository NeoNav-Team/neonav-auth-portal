import PageContainer from '../components/pageContainer';
import FormContainer from '../components/formContainer';
import InviteForm from '../components/forms/inviteForm';

export default function Invite() {

  return (
    <PageContainer title="Invite">
        <FormContainer title="Invite">
          <InviteForm />
        </FormContainer>
    </PageContainer>
  )
}
