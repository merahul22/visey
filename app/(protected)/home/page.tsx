import { Button } from '@/components/ui/button';

import { CategoryCardBig } from './_components/category-card-big';
import { CategoryCardSmall } from './_components/category-card-small';
import { FundingCard } from '../../../components/cards/funding-card';
import { BusinessCardList } from './_components/buisiness';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Footer from '@/components/Footer';

async function HomePage() {
  const session = await auth();

  if (!session?.user?.type) {
    redirect('/account-type');
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Search For</h2>
        <div className="hidden overflow-x-auto md:flex gap-x-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <CategoryCardBig key={idx} />
          ))}
        </div>

        <div className="overflow-x-auto flex gap-x-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <CategoryCardSmall key={idx} />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <span className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">Recommended</h2>
          <p>Business Category Name</p>
        </span>
        <BusinessCardList />
        <span className="block text-center">
          <Button variant="link" className="">
            View all
          </Button>
        </span>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Funding Opportunities
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {Array.from({ length: 5 }).map((item, idx) => (
            <FundingCard key={idx} />
          ))}
        </div>
        <span className="block text-center">
          <Button variant="link" className="">
            View all
          </Button>
        </span>
      </section>

      <Footer />
    </div>
  );
}
export default HomePage;