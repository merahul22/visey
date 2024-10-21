import { X } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import StartupResume from '@/components/StartupResume';

export default function BuissnessApplication() {
  return (
    <section>
      {/* notification */}

      <div>
        <p>
          <span></span>
          <span></span>
        </p>
        <div className="flex justify-between gap-x-2">
          <Button className="py-1.5 flex gap-x-2" variant="outline">
            Reject
            <X />
          </Button>
          <Button className="py-1.5">Shortlist</Button>
        </div>
      </div>

      <StartupResume />
    </section>
  );
}
/*
Startup Resume
Startup Name
Company Registered Name
We make home decor from old clothes
Industry
Sector
Website
www.visey.dtu.ac.in
Progress
Startup Product stage*
Ideation
Startup Funding stage*
Pre-Seed
TRL Level"
TRL 5: Basic functionality achieved
Product
Idea (Max 100-150 words)*
Ideation
What is the problem you are trying to solve? (Max 200-300 words)* Pre-Seed
Market Size/Potential Market Opportunity*
200 Million
2 Major Competitors (For each competitor: Name, Description in 2 sentences)* Instagram: Social media with reels
Facebook: Social media long standing in market
Demo Video*
https://google.drive.com
Pitch Deck*
https://google.drive.com


Team
Founders' Details (For each founder, in this format: Name, Role, About, Linkedin URL)*
Aditya Jain, CMO, 3rd Year BBA, https://www.linkedin.com/in/adityajain19/
Aditya Jain, CMO, 3rd Year BBA, https://www.linkedin.com/in/adityajain19/
Team Size (including both part-time and full-time)*
3
Number of full-time members*
3
Number of part-time members (write 0 if not applicable)*
0
Other Details
DPIIT Recognized?
Yes
Company Registration Date (If applicable) 11/09/2024
Contact
Contact Number*
+91 7658947302
Contact Email Id*
cmoabc@gmail.com
Application Answers
Why are you the perfect fit for this business?
I have been a coding enthusiast since I was 5
Why are you the perfect fit for this business?
I have been building businesses for 10 years

*/
