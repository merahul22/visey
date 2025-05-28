import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getOpportunityDetails } from '@/actions/get-opportunity-details';
import OpportunityForm from '@/components/forms/opportunity-form';

export default async function EditOpportunityPage({
  params
}: {
  params: { opportunityId: string }
}) {
  const session = await auth();
  const user = session?.user;

  if (!user?.business?.id) {
    redirect('/list-business');
  }

  const opportunity = await getOpportunityDetails(params.opportunityId);

  if (!opportunity) {
    redirect('/opportunities');
  }

  // Make sure the user owns this opportunity
  if (opportunity.businessId !== user.business.id) {
    redirect('/opportunities');
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Edit Funding Opportunity</h1>
        <OpportunityForm 
          initialData={opportunity}
          businessId={user.business.id}
        />
      </div>
    </div>
  );
}
