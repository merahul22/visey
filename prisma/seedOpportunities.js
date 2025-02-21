import { PrismaClient } from "@prisma/client";

const opportunities = [
  {
    title:
      "Samvardhan: Physical Product Design Accelerator for Healthcare Innovation",
    registrationFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdu5haCv2stU_29mOgOziVhZLzcCG6bweFon7dDb_hCXzWdbw/viewform",
    type: "Funding",
    subtype: "Grant",
    eligibility: "",
    targetProductStage: [
      "Minimum viable product (MVP)",
      "Product-market fit (PMF)",
    ],
    targetFundingStage: ["Pre-Seed", "Seed"],
    targetIndustry: "Healthcare & Lifesciences\u2028",
    targetSector: "HealthTech",
    websiteUrl: "http://pieds-bitspilani.org/",
    description:
      "Are you building a healthcare or medical device startup and need support in transforming your prototype into a market-ready product? Samvardhan, a one-of-its-kind product design accelerator, is now accepting applications!\n\nSamvardhan brings together four powerful partners:\n\n* PIEDS : Pilani Innovation & Entrepreneurship Development Society, BITS Pilani with its proven track record in startup incubation and mentorship\n* Studio Carbon, bringing cutting-edge design expertise in healthcare and deep tech innovation\n* Biotechnology Industry Research Assistance Council (BIRAC) (Biotechnology Industry Research Assistance Council), a GOI enterprise offering biotech ecosystem support\n* Birla Carbon is one of the world's largest manufacturer and supplier of high-quality carbon black\n\nWhat you get:\n\n* \u20b910 Lakhs funding to accelerate your product development\n* 100 hours of specialized design consultation from Studio Carbon experts\n* Access to state-of-the-art prototyping facilities\n* Intensive bootcamps at Studio Carbon and BITS Pilani\n* User research and field testing support through BITS Design School Mumbai\n* Mentorship from industry experts and successful founders\n* Access to BIRAC's extensive biotech network and resources",
  },
  {
    title: "BIRAC's SEED and LEAP programs",
    registrationFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLScA64oaXWMcm1lJjsfvxXyfePQ_Uzlew-lD2GIG1wl6WJOzHw/viewform",
    type: "Funding",
    subtype: "Equity",
    eligibility: "",
    targetProductStage: [
      "Minimum viable product (MVP)",
      "Product-market fit (PMF)",
    ],
    targetFundingStage: ["Pre-Seed", "Seed"],
    targetIndustry: "Healthcare & Lifesciences",
    targetSector: "HealthTech, Biotechnology\u2028",
    websiteUrl: "https://fitt-iitd.in/web/home",
    description:
      "FITT present a unique investment opportunity through the SEED & LEAP Fund, an initiative by Biotechnology Industry Research Assistance Council (BIRAC). This funding aims to support innovative startups in the biotechnology sector, providing crucial financial assistance to foster sustainable enterprise development. The proposed funding support is positioned to act as a catalyst in bringing technologies/ products forward towards piloting/ commercialization and reducing their gestation to commercialization.\n\nWhat Fund Offers: \n\nEquity Linked Investment up to 30 lakhs under SEED and 1 cr under LEAP\nDedicated Co-Working and Lab Facilities\nGuidance from Technical and Business Experts\nAccess to Regulatory and Clinical Support\nIP Management and Support\nCollaboration with Industry Players\nAccess to Investors\nEligibility Criteria:\nStart-up venturing into the domain of Healthcare / Biotechnology / Bioprinting / Diagnostics / Personalized Medicines / Tissues Engineering / Biopharma / Pharma with a focus on developing novel products.\nMore than 51% of the shares are held by resident Indian individuals.\nSEED is open for any startup \u2014 incubated or non-incubated     \nLEAP is open for any startup \u2014 incubated or non-incubated \u2014 that are actively raising funds to scale and grow.\n\nSelection Criteria\n\nFocus on innovative, product-oriented technologies with a strong IP potential\nAddress an unmet need with significant market potential\nHave a strong technical and business understanding \nDemonstrate a clear market strategy and understanding of end-users\nFor start-ups having strong business growth potential along with clear revenue and growth model.\n\nNote: Only startup can apply (Mandatory to be registered as a Private Limited Company)",
  },
  {
    title: "GRIP 3.0",
    registrationFormLink: "https://bit.ly/3XdF6Ag",
    type: "Funding",
    subtype: "Equity",
    eligibility: "",
    targetProductStage: ["Ideation", "Minimum viable product (MVP)"],
    targetFundingStage: ["Pre-Seed"],
    targetIndustry: "",
    targetSector: "",
    websiteUrl: "https://pscst.punjab.gov.in/en/grip",
    description:
      "Punjab State Council of Science and Technology (PSCST) in collaboration with ACIC RISE Association, Chandigarh Engineering College-CGC Landran is selecting grassroots innovators of Punjab. The top ideas will be awarded with the cash prizes. Apart from this, the selected ideas would get an opportunity for IP Protection, Showcase at National & State Level, Linkage for Validation & Scale-up and to be incubated with ACIC RISE. \nNo Registration Fees",
  },
  {
    title: "inFINity 2.0",
    registrationFormLink: "https://www.infinitynow.tech/",
    type: "Funding",
    subtype: "Equity",
    eligibility: "",
    targetProductStage: [
      "Minimum viable product (MVP)",
      "Product-market fit (PMF)",
    ],
    targetFundingStage: ["Pre-Seed", "Seed", "Series A"],
    targetIndustry: "Banking",
    targetSector: "FinTech",
    websiteUrl: "https://www.infinitynow.tech/",
    description:
      "Calling all Fintech Founders!\n\nAfter a groundbreaking first edition with 400+ applications & 30 game-changing startups, inFINity 2.0 is back\u2014bigger, better & more impactful than ever!\n\nWhat\u2019s new in inFINity 2.0?\n\nUp to $5M investment available for eligible startups\nAWS Activate Credits & up to $100K PayU Startup Program credits\nA 12-week hybrid accelerator with masterclasses, mentorship & fundraising support\nExclusive access to Prosus & top-tier investors to accelerate your growth\n\n\nRegister now & take your fintech startup to the next level with inFINity 2.0!",
  },
  {
    title: "TIDE 2.0",
    registrationFormLink:
      "https://connect.siicincubator.com/tide/mvp/applications",
    type: "Funding",
    subtype: "Grant",
    eligibility: "",
    targetProductStage: ["Ideation", "Minimum viable product (MVP)"],
    targetFundingStage: ["Pre-Seed"],
    targetIndustry:
      "Education, Agriculture, Transportation, Finance Technology",
    targetSector: "",
    websiteUrl:
      "https://www.siicincubator.com/programs/programs_tide_mvp_grant.php",
    description:
      "Startup Incubation and Innovation Centre, IIT Kanpur (incubatoriitk) invites startups and entrepreneurs to apply for the TIDE 2.0 MVP Grant Program, designed to support the development of Minimum Viable Products (MVPs) for innovative solutions.\n\nProgram Benefits:\n\n- Financial Grant: Up to INR 7 Lakh per startup, available for one year.\n- Infrastructure Access: Utilize IIT Kanpur's state-of-the-art facilities and co-working spaces.\n- Expert Support: Gain personalized mentoring and guidance on product development, commercialization strategies, and market readiness.\n\nThis grant is specifically tailored for innovators who want to bring their ideas to life and enhance their growth potential. Transform your vision into reality with TIDE 2.0 at SIIC, IIT Kanpur!",
  },
  {
    title: "AIIDE Centre of Excellence \u2013 Cohort 4",
    registrationFormLink: "https://aiidecoe.accubate.app/ext/form/2887/1/apply",
    type: "Funding",
    subtype: "Grant",
    eligibility: "",
    targetProductStage: [
      "Ideation",
      "Minimum viable product (MVP)",
      "Product-market fit (PMF)",
      "Go-to-market",
      "Growth and scale",
    ],
    targetFundingStage: ["Pre-Seed", "Seed"],
    targetIndustry: "AI (Artificial Intelligence)",
    targetSector: "Machine Learning",
    websiteUrl: "https://www.aiidecoe.com/",
    description:
      'Call for Applications: AIIDE Centre of Excellence \u2013 Cohort 4\n\nThe Government of Uttar Pradesh invites applications for Cohort-4 of the Artificial Intelligence and Innovation-Driven Entrepreneurship (AIIDE) Centre of Excellence (CoE) under the Start in UP scheme. Managed by Startup Incubation and Innovation Centre, IIT Kanpur (incubatoriitk), Indian Institute of Technology, Kanpur in collaboration with FICCI, the CoE supports startups in AI, ICT, IoT, Cybersecurity, and related fields. \n\nWhy Apply?\nJoin a thriving community of over 100 startups supported across three cohorts. Access world-class mentorship, resources, and opportunities to advance your ideas in AI/ML and other tech domains. \n\nEligibility:\n- Registered with DPIIT and "Start in UP." \n- Working in or integrating AI/ML into ventures in fields like:  MedTech, AgriTech, EdTech, Fintech, Cleantech, IoT, and more.',
  },
  {
    title: "Amrita TBI Meity Startup Hub Genesis EIR",
    registrationFormLink:
      "https://www.amritatbi.com/meity-startup-hub-genesis-eir.html#apply",
    type: "Funding",
    subtype: "Grant",
    eligibility:
      "Entrepreneur Eligibility\n1. Nationality:\n- The applicant must be an Indian citizen.\n2. Age:\n- The entrepreneur must be at least 18 years old at the time of application.\n3. Commitment:\n- The applicant must be a first-generation entrepreneur and committed to working full-time on the proposed startup idea during the EiR program duration.\n\nStartup/Idea Eligibility\n1. Stage of the Startup:\n- The startup should be in the ideation, validation, or very early stages.\n- Must not have received significant external funding (exceeding \u20b910 lakh, including government grants).\n2. Sector Focus:\n- The proposed startup should focus on technology innovation aligned with the GENESIS scheme\u2019s objectives\n\u2003\u2003\u2756 Electronics & IT\n\u2003\u2003\u2756 Emerging technologies (AI, IoT, Blockchain, etc.)\n\u2003\u2003\u2756 Digital solutions addressing societal challenges (e.g., health, education, agriculture, sustainability).\n3. Scalability and Impact:\n- The startup must have the potential for scalability and create a measurable impact, especially in Tier 2 and Tier 3 cities.\n4. Legal Compliance:\n- If the startup is already incorporated, it must be registered as a Private Limited Company, and LLP under applicable Indian laws.\n- The entity must not be older than 1 year at the time of application.\n5. Originality:\n- The startup idea must be original and not involve duplication of existing products/services or any form of plagiarism.\n\nFunding and Financial Eligibility\n1. No Prior Funding Obligations:\n- The applicant or startup should not have already received significant private or government funding for the same idea.\n- Startups that have availed of government support under other schemes for the same concept may not be eligible.\n2. Grant Utilization:\n- The entrepreneur must demonstrate a clear and actionable plan for utilizing the EIR support (e.g., prototype development, market research, or customer validation).\n\nAlignment with GENESIS Objectives\n1. The proposed startup/idea should align with the overarching goals of the GENESIS Scheme:\n\u2003\u2756 Promoting technology-led entrepreneurship.\n\u2003\u2756 Creating jobs and fostering regional innovation hubs.\n\u2003\u2756 Supporting sustainable and inclusive economic growth.\n2. The applicant must agree to actively participate in all mentorship programs, workshops, and other activities organized under the EIR program.\n\nExclusions\n1. Individuals currently enrolled in other full-time incubation/entrepreneurship schemes or programs, unless permitted by both programs.\n2. Startups involved in unethical, illegal, or non-compliant business activities.",
    targetProductStage: [
      "Ideation",
      "Minimum viable product (MVP)",
      "Product-market fit (PMF)",
    ],
    targetFundingStage: ["Pre-Seed"],
    targetIndustry: "",
    targetSector: "",
    websiteUrl: "https://www.amritatbi.com/meity-startup-hub-genesis-eir.html",
    description:
      "Amrita Technology Business Incubator is one of the select implementing agencies by the MeitY Startup Hub, Government of India. The GENESIS EIR Programme would provide subsistence grant upto to Rs. 10,00,000 per year to an aspiring or budding entrepreneur of considerable potential for pursuing a promising technology business idea.\n\nAmrita TBI is a non-profit startup incubator supported by Govt. of India and Amrita Vishwa Vidyapeetham that funds, mentors and nurtures ideas, startups and entrepreneurs.\n\n1) Startups will receive a grant of upto Rs. 10,00,000/-.\n\n2) You will be given mentorship and handholding for activities related to mentoring sessions, market/customer connect, IPR support, fundraising support, and support needed by the start-up for scaling.\n\nThe MeitY Startup Hub GENESIS EIR support recipient (EIR) will be eligible for a grant of a maximum of Rs.10,00,000/- in a year. Amrita TBI will evaluate the applications according to the guidelines set by MeitY and MSH.\n\nMeitY Startup Hub GENESIS EIR will be monitored very closely for the targeted milestones and is required to submit the progress report furnishing the same as and when needed. Non-Performing MeitY Startup Hub GENESIS EIRs will be terminated even before the completion of 12 months. This funding is subject to your commitment and performance.",
  },
  {
    title: "NEURON- GENESIS EiR Program",
    registrationFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdosk3H1kKjUODOTRp0n9KbPD7zr5K9lAryD4nIi8-QLwt9wg/viewform",
    type: "Funding",
    subtype: "Grant",
    eligibility:
      "- Registered as a Private Limited Company or LLP\n- Startups must be incorporated within the last 12 months\n- Applicant must not have received significant external funding (exceeding \u20b910 lakh, including government grants and funding)\n- Preference for entrepreneurs from Tier II & Tier III cities \n- Startups in ideation, validation, or early stages only",
    targetProductStage: ["Ideation", "Minimum viable product (MVP)"],
    targetFundingStage: ["Pre-Seed"],
    targetIndustry:
      "Consumer Goods, AI (Artificial Intelligence), Agriculture, Healthcare & Lifesciences, Education",
    targetSector: "Machine Learning, Agri-Tech, HealthTech, EdTech",
    websiteUrl: "https://sayuj.net/apply-contest/NEURON-GENESIS-EiR",
    description:
      "Call for Entrepreneur-in- Residence (EiR) under Gen-Next Support for Innovative Startups (GENESIS) by Meity Startup Hub (MSH), Government of India.\nName of the Scheme: Gen-Next Support for Innovative Startups (GENESIS)\nFunding Agency: MeitY Startup Hub (MSH), Government of India\nImplementing Agency: STPI-Neuron CoE, Mohali, Punjab (AIC STPINEXT Initiatives)\nFunding Support: Upto 10 Lacs\nLast date to apply: Feb 15, 2025\nOther Support:\nCo-working space\nAccess to labs\nLegal compliance\nIP support and guidance\nPeriodic mentoring\nConnect to domain experts\nNetwork access\nEligibility Criteria:\n1. The EIR applicant should be citizen of India\n2. Early-stage startups\n3. The entity must not be older than 1 year at the time of application\n4.  The applicant must not have received significant external funding (exceeding \u20b910 lakh, including government funding)\n5. The startup idea must be original and not involve duplication of existing products/services or any form of plagiarism\nNote: \n\nPriority will be given to startups and entrepreneurs from Tier 2 and Tier 3 cities to promote regional innovation\nTo apply, kindly complete the following form.",
  },
  {
    title: "KIIT- Genesis EIR",
    registrationFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSetcvSsflEu4yR3oGfbVzEVxZseBkantejxIZAsguMEB4gI7Q/viewform",
    type: "Funding",
    subtype: "Grant",
    eligibility:
      "- Registered as a Private Limited Company or LLP\n- Startups must be incorporated within the last 12 months\n- Applicant must not have received significant external funding (exceeding \u20b910 lakh, including government grants and funding)\n- Preference for entrepreneurs from Tier II & Tier III cities \n- Startups in ideation, validation, or early stages only",
    targetProductStage: ["Ideation", "Minimum viable product (MVP)"],
    targetFundingStage: ["Pre-Seed"],
    targetIndustry:
      "Consumer Goods, AI (Artificial Intelligence), Agriculture, Healthcare & Lifesciences, Education",
    targetSector: "Machine Learning, Agri-Tech, HealthTech, EdTech",
    websiteUrl: "https://kiitincubator.in/",
    description:
      "nder the hashtag#Genesis Initiative by the Ministry of Electronics and Information Technology, startups can secure a grant of \u20b910 Lakhs to fuel their entrepreneurial journey.\n\nFocus Areas:\n 1\ufe0f\u20e3 Electronics & IT\n 2\ufe0f\u20e3 Emerging Technologies (AI, IoT, Blockchain, etc.)\n 3\ufe0f\u20e3 Digital Solutions addressing societal challenges (Health, Education, Agriculture, Sustainability)\n\nThis is your chance to gain financial, technical, and professional support to transform your ideas into impactful innovations.",
  },
  {
    title: "D2C Insider Elevate",
    registrationFormLink: "https://d2ci.pro.typeform.com/to/cYZOh0CJ",
    type: "Funding",
    subtype: "Equity",
    eligibility: "",
    targetProductStage: [
      "Minimum viable product (MVP)",
      "Product-market fit (PMF)",
      "Go-to-market",
      "Growth and scale",
    ],
    targetFundingStage: ["Pre-Seed", "Seed", "Series A"],
    targetIndustry: "Consumer Goods\u2028",
    targetSector:
      "Fast Moving Consumer Goods (FMCG), Consumer Electronics, Household Products\u2028",
    websiteUrl: "https://elevate.d2cinsider.com/",
    description:
      "Are you ready to scale your D2C startup and raise your first cheque?\n\nJoin Elevate Cohort 4, a 12-week growth accelerator designed to transform your 0-1 journey:\n- Raise your 1st Cheque up to 1 Cr. at Pre Seed/Seed stage via D2C Insider Super Angels Fund.\n- Strategic mentorship and personalized guidance for growth.\n- Exclusive Demo Day to pitch your startup to top investors for your next round.\n- Meaningful connections with industry leaders and like-minded founders.",
  },
];

const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Use a for...of loop to handle async/await properly
    for (const op of opportunities) {
      await prisma.opportunity.create({
        data: {
          ...op,
        },
      });
      console.log(`Created opportunity: ${op.title}`);
    }
    console.log("Seeding completed successfully!");
  } catch (e) {
    console.error("Error during seeding:", e);
  } finally {
    // Disconnect the Prisma client after seeding
    await prisma.$disconnect();
  }
};

// Run the seed function
seed();
