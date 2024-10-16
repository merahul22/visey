import { Separator } from "@/components/ui/separator";
import { X } from "@phosphor-icons/react/dist/ssr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

      <div className="p-6">
        <div className="">
          <h1 className="text-xl">Startup Resume</h1>
          <div className="flex gap-x-6">
            <Avatar className="size-32  rounded-full overflow-hidden">
              <AvatarImage src="https://picsum.photos/100" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-y-4 items-start">
              <div className="flex flex-col items-start">
                <h3 className="flex justify-center gap-x-2 ">
                  <span>Startup Name</span>
                  <Image
                    src="/img/badge.png"
                    height={24}
                    width={24}
                    alt="badge"
                  />
                </h3>
                <p className="text-linkBlue text-sm">Company Registered Name</p>
                <p className="text-sm">We make home decor from old clothes</p>
              </div>
              <div className="flex gap-x-2">
                <Button variant="outline" className="py-1.5">
                  Industry
                </Button>
                <Button variant="outline" className="py-1.5">
                  Industry
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />
        {/* intro section */}
        <article>
          <div className="space-y-2">
            <h3 className="text-lg">Website</h3>
            <p>www.visey.dtu.ac.in</p>
          </div>
          <div className="">
            <h1 className="text-xl">Progress</h1>

            <div className="">
              <h3 className="text-lg">Startup Product Stage</h3>
              <p>Ideation</p>
            </div>
            <div className="">
              <h3 className="text-lg">Startup Product Stage</h3>
              <p>Ideation</p>
            </div>
            <div className="">
              <h3 className="text-lg">Startup Product Stage</h3>
              <p>Ideation</p>
            </div>
          </div>
        </article>

        <Separator />

        <article>
          <h1 className="text-lg">Product</h1>

          <div className="">
            <h3 className="text-lg">Startup Product Stage</h3>
            <p>Ideation</p>
          </div>
          <div className="">
            <h3 className="text-lg">Startup Product Stage</h3>
            <p>Ideation</p>
          </div>
          <div className="">
            <h3 className="text-lg">Startup Product Stage</h3>
            <p>Ideation</p>
          </div>
          <div className="">
            <h3 className="text-lg">
              2 Major Competitors (For each competitor: Name, Description in 2
              sentences)*
            </h3>
            <div className="space-y-1">
              <span>Instagram: Social media with reels</span>
              <span>Facebook: Social media long standing in market</span>
            </div>
          </div>
          <div className="">
            <h3 className="text-lg">Startup Product Stage</h3>
            <p>Ideation</p>
          </div>
          <div className="">
            <h3 className="text-lg">Startup Product Stage</h3>
            <p>Ideation</p>
          </div>
        </article>

        <Separator />

        <article>
          <h1 className="text-lg">Team</h1>

          <div className="">
            <h3 className="text-lg">
              Founders Details (For each founder, in this format: Name, Role,
              About, Linkedin URL)*
            </h3>
            <div className="space-y-1">
              <span>
                Aditya Jain, CMO, 3rd Year BBA,
                https://www.linkedin.com/in/adityajain19/
              </span>
              <span>Facebook: Social media long standing in market</span>
            </div>
          </div>
          <div className="">
            <h3 className="text-lg">
              Team Size (including both part-time and full-time)*
            </h3>
            <p>3</p>
          </div>
          <div className="">
            <h3 className="text-lg">Number of full-time members*</h3>
            <p>3</p>
          </div>

          <div className="">
            <h3 className="text-lg">
              Number of part-time members (write 0 if not applicable)*
            </h3>
            <p>0</p>
          </div>
        </article>
        <Separator />

        <article>
          <h1 className="text-lg">Other Details</h1>

          <div className="">
            <h3 className="text-lg">DPIIT Recognized</h3>
            <p>Ideation</p>
          </div>
          <div className="">
            <h3 className="text-lg">
              Company Registration Date (If applicable)
            </h3>
            <p>11/09/2024</p>
          </div>
        </article>

        <Separator />

        <article>
          <h1 className="text-lg">Contact</h1>

          <div className="">
            <h3 className="text-lg">Contact Number</h3>
            <p>+91 123456789</p>
          </div>
          <div className="">
            <h3 className="text-lg">Contact Email Id*</h3>
            <p>contact@gmail.com</p>
          </div>
        </article>

        {/* Application answers */}
        <article>
          <h1 className="text-xl">Application Answer</h1>

          <div className="">
            <h3 className="text-lg">
              Why are you the perfect fit for this business?
            </h3>
            <p>I have been a coding enthusiast since I was 5</p>
          </div>
          <div className="">
            <h3 className="text-lg">
              Why are you the perfect fit for this business?
            </h3>
            <p>I have been building businesses for 10 years</p>
          </div>
        </article>

        <div className="flex justify-between ">
          <Button variant="outline">Previous Application</Button>
          <Button className="py-1">Next Application</Button>
        </div>
      </div>
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
