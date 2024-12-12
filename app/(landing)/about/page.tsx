import ProfileCard from '@/app/(landing)/_components/ProfileCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const profiles = [
  {name: "Jhonty Dhol", role: "Founder", image: "/img/Jhonty_dhol.jpg", linkedIn: "https://www.linkedin.com/in/jhonty-dhol-8997b7227/"},
  {name: "Riddhima", role: "Founder", image: "/img/Riddhima_goel.jpg", linkedIn: "https://www.linkedin.com/in/riddhima-goel-36b3a6217/"},
  {name: "Rahul Chaurasiya", role: "Tech Lead", image: "/img/Rahul_chaurasiya.jpg", linkedIn: "https://www.linkedin.com/in/rahul-chourasiya-b80882254/"},
  {name: "Sahil Singh Tomar", role: "Fullstack Developer", image: "/img/sahil_singh_tomar.jpg", linkedIn: "https://www.linkedin.com/in/sahil-singh-tomar-83b22b22a/"},
  {name: "Varun Singh", role: "Frontend Developer", image: "/img/varun_bhatt.jpg", linkedIn: "https://www.linkedin.com/in/varun-bhatt-653109213/"},
  {name: "Paras", role: "AI/ML", image: "/img/Paras.jpg", linkedIn: "#"},
  {name: "Sparsh Jain", role: "AI/ML", image: "/img/Sparsh_jain.jpg", linkedIn: "https://www.linkedin.com/in/sparsh-jain-1bb598298/"}
]

const page = () => {
  return <div className="pb-10">
    <div
      className="absolute inset-x-0 top-10 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60">
      <Image
        src="/wave-real-2.png"
        fill={true}
        className="object-cover object-left"
        alt="bg-wave"
        priority
      />
    </div>
    <div
      className="flex flex-col justify-center items-center pt-32 max-w-[1000px] mx-auto pb-20">
      <h1
        className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f]">About
        Visey</h1>
      <div
        className="flex flex-col justify-center items-center gap-6 mt-5 text-base font-medium px-10 text-justify">
        <p>Welcome Indian entrepreneurs! We believe that every visionary has the
          potential to change
          the world, and we are here to make that journey accessible and
          enriching. As active participants
          in the Indian startup ecosystem, we understand firsthand the
          challenges and limitations that
          entrepreneurs face daily. We’ve navigated the rocky terrain of
          uncertainty and resilience,
          allowing us to truly empathize with the core feelings of every
          entrepreneur striving to make
          a difference. It is through our journey that we recognize the
          struggles, the setbacks, and the
          triumphs that come with the entrepreneurial path.
        </p>
        <p>To break through the limitations and barriers of this journey, we
          created Visey—your gateway
          to swiftly accessing the resources you need quickly by connecting you
          with every stakeholder
          in the startup ecosystem. We are committed to ensuring that no
          entrepreneur feels alone in
          their quest for success. With Visey, you have the support, insights,
          and connections to
          elevate your journey and transform your ideas into reality.
        </p>
        <p>Join us on this exciting journey as we build an inclusive, dynamic,
          and supportive environment
          for entrepreneurs. Whether you are just starting out or looking to
          scale your business, we
          invite you to connect with us and discover how we can help you
          succeed. Together, let’s
          reshape the future of entrepreneurship!
        </p>
      </div>
    </div>
    <div
      className="w-full h-20 bg-repeat-x opacity-10 mb-4"
      style={{
        backgroundImage: 'url(\'/triangle.png\')',
        backgroundSize: '100px 100%',
        backgroundPosition: 'center',
      }}
    ></div>
    <div className="bg-primary-landing relative py-4">
      <div
        className="relative rotate-180 w-full h-20 bg-repeat-x"
        style={{
          backgroundImage: 'url(\'/triangle.png\')',
          backgroundSize: '100px 100%',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="max-w-[1000px] mx-auto py-16 text-base-white">
        <div className="px-12">
          <h2 className="text-center text-3xl font-medium pb-4">Mission</h2>
          <h3 className="text-xl text-center font-light pb-2">&#34;Empowering
            Indian entrepreneurs with a world-class, accessible
            ecosystem that ignites
            growth, innovation, and lasting impact.&#34;
          </h3>
          <p className="text-sm text-center">At the heart of our organization is
            a commitment to providing a
            high-quality, accessible
            entrepreneurial ecosystem tailored specifically for Indian
            entrepreneurs. We strive to equip
            you with the tools, resources, and support you need to turn your
            innovative ideas into
            successful ventures. Our ecosystem fosters collaboration,
            creativity,
            and growth, ensuring
            that every entrepreneur has the opportunity to thrive.
          </p>
        </div>
        <Separator className="my-10" />
        <div className="px-12">
          <h2 className="text-center text-3xl font-medium pb-4">Vision</h2>
          <h3 className="text-xl text-center font-light pb-2">&#34;A global
            landscape where every entrepreneur has the resources
            and support to thrive, no
            matter where they are.&#34;
          </h3>
          <p className="text-sm text-center">We envision a world where
            geographical boundaries no longer limit
            entrepreneurial spirit and
            ambition. Our goal is to create a global landscape where every
            entrepreneur, regardless of
            their location, has access to the resources, mentorship, and
            connections necessary to realize
            their dreams. Together, we can break barriers, cultivate talent, and
            inspire the next
            generation of leaders.
          </p>
        </div>
      </div>
      <div
        className="w-full h-20 bg-repeat-x"
        style={{
          backgroundImage: 'url(\'/triangle.png\')',
          backgroundSize: '100px 100%',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
    <div className="pt-4">
      <div
        className="relative rotate-180 w-full h-20 bg-repeat-x opacity-10"
        style={{
          backgroundImage: 'url(\'/triangle.png\')',
          backgroundSize: '100px 100%',
          backgroundPosition: 'center',
        }}
      ></div>
      <div id='team' className="max-w-[1200px] mx-auto pt-12">
        <h1 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f] text-center">Meet the Team Behind Visey</h1>
        <p className="text-center pt-2 px-24">Our team is a passionate blend of innovators, strategists, and dreamers
          - all united by a
          common goal: to empower and elevate India’s entrepreneurial spirit.
          Together, we&#39;re building
          a brighter future for startups, one bold step at a time.
        </p>
        <div className="pt-20 flex flex-wrap justify-around gap-12">
          {profiles.map((profile, idx) => {
            return <div key={idx}>
              <ProfileCard profile={profile} />
            </div>;
          })}
        </div>
      </div>
    </div>
    <div id='product' className="pt-8 max-w-[1200px] mx-auto ">
      <h1 className="text-center font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f]">Product</h1>
      <p className="text-center px-24">Our platform is your gateway to growth—bringing Startups, SMEs, and
        Businesses together with
        the tools, insights, and networks they need to thrive. Dive in and
        discover how we can empower
        your success!
      </p>
    </div>
    <div className="pt-16 max-w-[1200px] mx-auto">
      <h1 className="text-center text-3xl font-semibold">For Startup & SMEs</h1>
      <div className="flex flex-col gap-16 pt-12 px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex flex-col gap-4 max-w-[400px]">
            <div>
              <h2 className="font-semibold">Efficient Search Engine</h2>
              <p>Find exactly what you need, fast. Our search feature delivers
                accurate, relevant results—no
                more wasting time sifting through unrelated content.
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Personalized Recommendations</h2>
              <p>Get suggestions tailored to your business goals and needs. Our
                smart engine adapts to
                bring you the most useful resources and connections.
              </p>
            </div>
          </div>
          <div className="w-[320px] md:w-[630px] h-[350px] relative">
            <Image
              src="/img/placeholder-about.png"
              alt="Placeholder About Image"
              fill={true}
              objectFit="cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-[320px] md:w-[630px] h-[350px] relative">
            <Image
              src="/img/placeholder-about.png"
              alt="Placeholder About Image"
              fill={true}
              objectFit="cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-4 max-w-[400px]">
            <div>
              <h2 className="font-semibold">All Resources on One Platform</h2>
              <p>Everything in one place. Access a wide range of resources—
                funding, networking, and
                tools— without needing multiple subscriptions or platforms.
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Robust Rating & Review System</h2>
              <p>Make informed decisions with transparent, community-driven
                feedback. Check ratings and
                reviews from other startups to ensure you’re choosing the best
                resources.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex flex-col gap-4 max-w-[400px]">
            <div>
              <h2 className="font-semibold">On-Demand Mentor Guidance</h2>
              <p>
                Expert advice, whenever you need it. Connect with mentors who
                provide targeted
                insights to help you overcome challenges and grow.
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Mentor-Mentee Match</h2>
              <p>Connect with mentors who truly align with your business’s stage,
                industry, and
                . Our mentor-mentee matching feature pairs you with experienced
                mentors who can guide
                you on your unique path to success.
              </p>
            </div>
          </div>
          <div className="w-[320px] md:w-[630px] h-[350px] relative">
            <Image
              src="/img/placeholder-about.png"
              alt="Placeholder About Image"
              fill={true}
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
    <div className="pt-16 max-w-[1200px] mx-auto">
      <h1 className="text-center text-3xl font-semibold">For Businesses</h1>
      <div className="flex flex-col gap-16 pt-12 px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-[320px] md:w-[630px] h-[350px] relative">
            <Image
              src="/img/placeholder-about.png"
              alt="Placeholder About Image"
              fill={true}
              objectFit="cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-4 max-w-[400px]">
            <div>
              <h2 className="font-semibold">Better Reach to Startups & SMEs</h2>
              <p>Connect with a focused audience of startups and SMEs actively
                seeking services like
                yours, giving you unparalleled access to this high-potential
                segment.
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Simplified Traction Building</h2>
              <p>Easily build traction with meaningful connections. Streamline
                your marketing and connect
                with clients who can help propel your business forward.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex flex-col gap-4 max-w-[400px]">
            <div>
              <h2 className="font-semibold">Leads of Interested Potential
                Customers</h2>
              <p>Access warm leads from startups and SMEs already interested in
                your services. Streamline
                your sales process and improve conversion rates.
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Promote Your Business</h2>
              <p>Highlight your brand directly on our platform at just $0.82/day,
                gaining visibility
                among startups and SMEs eager to discover new solutions and
                services.
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Posting Opportunities</h2>
              <p>List funding opportunity, partnerships, events, and incubation or
                acceleration service
                opportunities on the platform, reaching a motivated audience ready
                to engage with your
                business.
              </p>
            </div>
          </div>
          <div className="w-[320px] md:w-[630px] h-[350px] relative">
            <Image
              src="/img/placeholder-about.png"
              alt="Placeholder About Image"
              fill={true}
              objectFit="cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-[320px] md:w-[630px] h-[350px] relative">
            <Image
              src="/img/placeholder-about.png"
              alt="Placeholder About Image"
              fill={true}
              objectFit="cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-4 max-w-[400px]">
            <div>
              <h2 className="font-semibold">In-Depth, Data-Based Marketing
                Analytics</h2>
              <p>Track engagement, understand what resonates, and make informed
                adjustments. Our analytics
                dashboard provides clear insights into your audience’s needs and
                behaviors.
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Drastically Reduced Promotional
                Costs</h2>
              <p>Showcase your products and services without the high costs of
                traditional marketing.
                Promote directly to a qualified, engaged audience and save on
                overheads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-center pt-16 pb-16">
      <Button>
        <div className="flex items-center gap-2">
          <Link
           href="/demo-account-type"
          className="flex items-center gap-4"
          ><span>Start now</span>
          <ArrowUpRight />
          </Link>
        </div>
      </Button>
    </div>
  </div>
}

export default page;