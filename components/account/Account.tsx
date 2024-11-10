import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CurrentPlan from '../CurrentPlan';
import PricingBusiness from '../PricingBusiness';
import FundingOpportunities from './_components/FundingOpportunities';
import { Button } from '../ui/button';
import { Hammer } from '@phosphor-icons/react/dist/ssr';
import AccountTransactions from '../AccountTransactions';

const Account = () => {
  return (
    <div className="mt-4">
      <div>
        <h1 className="text-xl">My Account</h1>
      </div>
      <div className="py-6">
        <Tabs defaultValue="overview" className="">
          <div className="overflow-scroll">
            <TabsList>
              <TabsTrigger value="overview">Your Plan</TabsTrigger>
              <TabsTrigger value="promotion">Promotion</TabsTrigger>
              <TabsTrigger value="opportunities">
                Funding Opportunities
              </TabsTrigger>
              <TabsTrigger value="transactions">
                Account Transactions
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview">
            <CurrentPlan />
            <div className="mt-8">
              <h2 className="font-semibold mb-4">Promotion</h2>
              <PricingBusiness />
            </div>
            <div className="mt-8">
              <h2 className="font-semibold mb-4">Funding Opportunities</h2>
              <div className="flex flex-col gap-4">
                <FundingOpportunities />
                <FundingOpportunities />
                <FundingOpportunities />
              </div>
              <div className="mt-4 flex items-center justify-center">
                <Button size="sm" variant="link">
                  View All
                </Button>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-8 mb-4">
                <h2 className="font-semibold">Account Transactions</h2>
                <div>
                  <Button size="lg" className="bg-neutrals-1000 shadow-none">
                    <div>
                      <Hammer />
                    </div>
                    <p>Help</p>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <AccountTransactions />
                <AccountTransactions />
                <AccountTransactions />
              </div>
              <div className="mt-4 flex items-center justify-center">
                <Button size="sm" variant="link">
                  View All
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="promotion">
            <div className="mt-8">
              <h2 className="font-semibold mb-4">Promotion</h2>
              <PricingBusiness />
            </div>
          </TabsContent>
          <TabsContent value="opportunities">
            <div className="mt-8">
              <h2 className="font-semibold mb-4">Funding Opportunities</h2>
              <div className="flex flex-col gap-4">
                <FundingOpportunities />
                <FundingOpportunities />
                <FundingOpportunities />
              </div>
              <div className="mt-4 flex items-center justify-center">
                <Button size="sm" variant="link">
                  View All
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="transactions">
            <div className="mt-8">
              <div className="flex items-center gap-8 mb-4">
                <h2 className="font-semibold">Account Transactions</h2>
                <div>
                  <Button size="lg" className="bg-neutrals-1000 shadow-none">
                    <div>
                      <Hammer />
                    </div>
                    <p>Help</p>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <AccountTransactions />
                <AccountTransactions />
                <AccountTransactions />
              </div>
              <div className="mt-4 flex items-center justify-center">
                <Button size="sm" variant="link">
                  View All
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
