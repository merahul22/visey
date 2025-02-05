'use client';

import React, { useState, useEffect } from 'react';
import ApplyFundingOpportunityForm from '@/components/form/ApplyFundingOpportunity';
import PreviewOpportunity from '@/components/PreviewOpportunity';
import { Business, Startup } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { fundingOpportunitySchema } from '@/schemas';

const ApplyOpportunityPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const opportunityId = searchParams ? searchParams.get('id') : null;
  const [opportunity, setOpportunity] = useState<z.infer<typeof fundingOpportunitySchema> & { id: string } | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [startup, setStartup] = useState<Startup | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!opportunityId) {
      router.push('/home');
      return;
    }

    const fetchOpportunityDetails = async () => {
      try {
        const res = await fetch(`/api/get-opportunity-details?id=${opportunityId}`);
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
          router.push('/home');
          return;
        }
        setOpportunity(data.opportunity);
        setBusiness(data.business);
        setStartup(data.startup);
      } catch (error) {
        console.error('Failed to fetch opportunity details:', error);
        router.push('/home');
      }
    };

    fetchOpportunityDetails();
  }, [opportunityId, router]);

  if (!opportunity || !business || !startup) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!showForm ? (
        <div>
          <PreviewOpportunity opportunity={opportunity} business={business} />
          <div className="flex justify-center mt-8">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
              onClick={() => setShowForm(true)}
            >
              Proceed
            </button>
          </div>
        </div>
      ) : (
        <ApplyFundingOpportunityForm
          business={business}
          startup={startup}
          opportunity={opportunity}
        />
      )}
    </div>
  );
};

export default ApplyOpportunityPage;
