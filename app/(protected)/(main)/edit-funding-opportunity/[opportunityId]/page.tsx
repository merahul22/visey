import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getOpportunityDetails } from '@/actions/get-opportunity-details';
import OpportunityForm from '@/components/forms/opportunity-form';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ opportunityId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: 'Edit Funding Opportunity',
  description: 'Edit your funding opportunity details',
}

export default async function EditOpportunityPage({ params, searchParams }: Props) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams
  ]);
  const session = await auth();
  const user = session?.user;

  if (!user?.business?.id) {
    redirect('/list-business');
  }

  const opportunity = await getOpportunityDetails(resolvedParams.opportunityId);

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
