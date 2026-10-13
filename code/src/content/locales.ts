import type { RawSite } from "@/content/schema";
import { localRawSite } from "@/content/mock";
import type { Locale } from "@/i18n/locales";

function cloneSite() {
  return JSON.parse(JSON.stringify(localRawSite)) as RawSite;
}

function seo(title: string, description: string, indexable = true) {
  return {
    title,
    description,
    indexable,
    ogImage: "/media/web2go-logo.jpg",
  };
}

function imageAlt(image: { alt: string }, alt: string) {
  image.alt = alt;
}

function buildEnglishSite() {
  const site = cloneSite();
  const company = site.company[0];

  company.description =
    "Web2Go develops connected web products, business systems, and digital operations for organisations that need clear delivery and dependable handover.";
  company.seo = seo(
    "Web2Go",
    "Web2Go corporate information: sectors, group companies, projects, careers, and contact paths.",
  );
  imageAlt(company.logo, "Web2Go corporate logo");

  const sectorCopy = [
    {
      name: "Digital platforms",
      excerpt:
        "Shared portals, web applications, and digital channels for teams, customers, and partners.",
      body: "The digital platforms team builds interfaces, sign-in flows, and reusable components for portals and web products. Delivery includes the agreed product scope and editorial guidance.",
      capabilities: [
        "Information architecture and web interface design",
        "Internal and partner portals",
        "Reusable component libraries",
      ],
      unit: "delivered portals",
      seo: seo(
        "Digital platforms | Web2Go",
        "Web2Go digital platforms cover portals, web applications, and reusable interface components.",
      ),
    },
    {
      name: "Business systems",
      excerpt:
        "Operational software for sales, inventory, and approval workflows inside organisations.",
      body: "The business systems team models workflows, connects existing records, and hands over an operating environment with clear documentation. The scope does not include financial advice or audit services.",
      capabilities: [
        "Business process analysis",
        "Integration with existing systems",
        "Operational handover and training",
      ],
      unit: "business systems",
      seo: seo(
        "Business systems | Web2Go",
        "Web2Go business systems support sales, inventory, and approval workflows.",
      ),
    },
    {
      name: "Digital operations",
      excerpt:
        "Monitoring, backup, and operational support for systems that have entered use.",
      body: "The digital operations team monitors incidents, scheduled backups, and agreed maintenance windows. It complements, but does not replace, a third-party data centre or cloud provider.",
      capabilities: [
        "Incident monitoring",
        "Scheduled backups",
        "Business-hours support",
      ],
      unit: "active operations agreements",
      seo: seo(
        "Digital operations | Web2Go",
        "Web2Go digital operations cover monitoring, backup, and support for delivered systems.",
      ),
    },
  ];

  site.sectors.forEach((sector, index) => {
    const copy = sectorCopy[index];
    sector.name = copy.name;
    sector.excerpt = copy.excerpt;
    sector.body = copy.body;
    sector.capabilities = copy.capabilities;
    const statistic = sector.statistics[0] as {
      unit: string;
      source: string;
    };
    statistic.unit = copy.unit;
    statistic.source = "Web2Go planning ledger, internal demo reference, 2025";
    sector.seo = copy.seo;
    imageAlt(sector.image, `${copy.name} visual for Web2Go`);
  });

  const subsidiaryCopy = [
    {
      legalName: "Web2Go Studio Company Limited",
      excerpt: "Design and development team for portals and web applications.",
      body: "Web2Go Studio receives briefs, structures information, and hands over source code with editorial guidance for portals and web products.",
      relationshipNote:
        "The group unit responsible for digital platform design and development.",
      location: "District 1, Ho Chi Minh City",
      email: "studio@web2go.vn",
      description: "Web2Go Studio designs and develops portals and web applications for the Web2Go group.",
    },
    {
      legalName: "Web2Go Systems Company Limited",
      excerpt: "Implementation team for business software and data integration.",
      body: "Web2Go Systems documents workflows, connects existing accounting or warehouse records, and hands over operating accounts with clear instructions.",
      relationshipNote:
        "The group unit responsible for business systems and data integration.",
      location: "District 1, Ho Chi Minh City",
      email: "systems@web2go.vn",
      description: "Web2Go Systems implements business software and data integrations for the Web2Go group.",
    },
    {
      legalName: "Web2Go Cloud Company Limited",
      excerpt: "Monitoring, backup, and support team for systems in use.",
      body: "Web2Go Cloud receives handover from Studio or Systems, schedules maintenance, and reports operating incidents on a regular cycle.",
      relationshipNote:
        "The group unit responsible for monitoring, backup, and operational support.",
      location: "District 1, Ho Chi Minh City",
      email: "cloud@web2go.vn",
      description: "Web2Go Cloud monitors, backs up, and supports Web2Go systems in operation.",
    },
    {
      legalName: "Web2Go Labs Company Limited",
      excerpt: "Integration testing and shared technical documentation team.",
      body: "Web2Go Labs records reproducible issues, prepares technical notes, and shares findings with Studio, Systems, or Cloud.",
      relationshipNote:
        "The group unit responsible for integration experiments and shared technical notes.",
      location: "District 1, Ho Chi Minh City",
      email: "labs@web2go.vn",
      description: "Web2Go Labs tests integrations and prepares shared technical documentation.",
    },
  ];

  site.subsidiaries.forEach((item, index) => {
    const copy = subsidiaryCopy[index];
    item.legalName = copy.legalName;
    item.excerpt = copy.excerpt;
    item.body = copy.body;
    item.relationshipNote = copy.relationshipNote;
    item.locations = [copy.location];
    item.email = copy.email;
    item.seo = seo(item.name, copy.description);
    imageAlt(item.image, `${item.name} team visual`);
  });

  const projects = [
    {
      title: "Internal information portal",
      summary: "A single sign-in space for staff news, shared documents, and controlled access.",
      body: "The project replaced scattered file-sharing with a portal for news, folders, and access history. Web2Go Studio handed it over in November 2024, while Web2Go Cloud maintained the nightly backup schedule.",
      location: "Ho Chi Minh City",
      unit: "departments using the portal",
      image: "Internal information portal homepage",
      gallery: "Document list in the internal portal",
      seo: seo("Internal information portal | Web2Go", "An internal information portal handed over by Web2Go Studio in 2024."),
    },
    {
      title: "Omnichannel sales system",
      summary: "A shared order register for store and phone channels with delivery status.",
      body: "The project brings store and call-centre orders into one register. Web2Go Systems is running the second phase for daily inventory reconciliation. No revenue figure is published on this page.",
      location: "Ho Chi Minh City",
      unit: "",
      image: "Omnichannel order register screen",
      gallery: "Order detail in the omnichannel system",
      seo: seo("Omnichannel sales system | Web2Go", "An omnichannel order register implemented by Web2Go Systems in 2025."),
    },
    {
      title: "Central warehouse coordination",
      summary: "Inbound, outbound, and pallet-location tracking for an operating warehouse.",
      body: "The project assigns location codes to pallets and prints shift-based dispatch notes. Web2Go Systems handed over the software, while Web2Go Cloud monitors print incidents and backups.",
      location: "Binh Duong",
      unit: "warehouse operating on the system",
      image: "Central warehouse location board",
      gallery: "Dispatch note printed from the warehouse system",
      seo: seo("Central warehouse coordination | Web2Go", "A central warehouse coordination project handed over by Web2Go in 2025."),
    },
    {
      title: "Partner service portal",
      summary: "A partner workspace for contracts, handover dates, and support requests.",
      body: "The project has a published scope and kick-off schedule. Web2Go Studio has not opened the live environment. The status is announced, not complete.",
      location: "Ho Chi Minh City",
      unit: "",
      image: "Partner service portal concept",
      gallery: "Partner portal information architecture",
      seo: seo("Partner service portal | Web2Go", "A Web2Go partner portal announced in 2026."),
    },
  ];

  site.projects.forEach((item, index) => {
    const copy = projects[index];
    item.title = copy.title;
    item.summary = copy.summary;
    item.body = copy.body;
    item.location = copy.location;
    item.seo = copy.seo;
    imageAlt(item.image, copy.image);
    item.gallery.forEach((image) => imageAlt(image, copy.gallery));
    if (copy.unit && item.statistics[0]) {
      const statistic = item.statistics[0] as {
        unit: string;
        source: string;
      };
      statistic.unit = copy.unit;
      statistic.source = "Web2Go project register, internal demo reference, 2025";
    }
  });

  const news = [
    {
      title: "Web2Go publishes its software handover process",
      summary: "Web2Go introduces a four-step process for scope, handover, and post-delivery support.",
      body: "On 12 June 2026, Web2Go published a handover process covering discovery, review, acceptance, and support. Customers receive an acceptance record and an access checklist. The article does not publish contract values or revenue.",
      category: "Operations",
      author: "Web2Go communications team",
      image: "Web2Go software handover process cover",
      seo: seo("Software handover process | Web2Go", "Web2Go publishes a four-step software handover process."),
    },
    {
      title: "District 1 office opens for scheduled meetings",
      summary: "Web2Go's work and meeting space is located in central Ho Chi Minh City.",
      body: "On 3 March 2025, Web2Go opened its office at Floor 8, 123 Nguyen Hue, District 1, Ho Chi Minh City. The space supports product teams, operations, and scheduled meetings.",
      category: "Company",
      author: "Web2Go administration team",
      image: "Web2Go office reception",
      seo: seo("District 1 office | Web2Go", "Web2Go opens a working and meeting office in District 1, Ho Chi Minh City."),
    },
    {
      title: "Web2Go publishes its personal data policy set",
      summary: "Privacy, terms, and cookie pages are now grouped under Web2Go legal information.",
      body: "On 20 January 2026, Web2Go published its privacy, terms, and cookie pages. Visitors can send data-related requests to privacy@web2go.vn.",
      category: "Legal information",
      author: "Web2Go legal team",
      image: "Web2Go legal information pages",
      seo: seo("Personal data policy | Web2Go", "Web2Go publishes privacy, terms, and cookie information."),
    },
  ];

  site.news.forEach((item, index) => {
    const copy = news[index];
    item.title = copy.title;
    item.summary = copy.summary;
    item.body = copy.body;
    item.category = copy.category;
    item.author = copy.author;
    item.seo = copy.seo;
    imageAlt(item.image, copy.image);
  });

  const leaders = [
    ["Nguyen Minh An", "Chief Executive Officer", "Nguyen Minh An leads product direction, partner relationships, and coordination across the Web2Go group.", "Leadership", "Nguyen Minh An portrait, Web2Go Chief Executive Officer"],
    ["Tran Khanh Linh", "Chief Operating Officer", "Tran Khanh Linh leads handover processes, support schedules, and operating standards for active projects.", "Project operations", "Tran Khanh Linh portrait, Web2Go Chief Operating Officer"],
    ["Le Hoang Nam", "Chief Technology Officer", "Le Hoang Nam leads software architecture, technical standards, and integration capability across product teams.", "Software architecture", "Le Hoang Nam portrait, Web2Go Chief Technology Officer"],
  ];

  site.leadership.forEach((item, index) => {
    const [name, role, biography, expertise, alt] = leaders[index];
    item.name = name;
    item.role = role;
    item.biography = biography;
    item.expertise = [expertise];
    imageAlt(item.portrait, alt);
  });

  const careers = [
    {
      title: "Frontend engineer",
      department: "Web2Go Studio",
      location: "Ho Chi Minh City",
      workType: "Full-time",
      level: "Professional",
      description: "Build interfaces from approved designs and check experiences across 375 to 1440 px viewports.",
      requirements: ["Experience with HTML, CSS, and TypeScript", "Comfort working from Ho Chi Minh City or in a hybrid arrangement"],
      benefits: ["Statutory insurance", "Company-provided work equipment"],
      seo: seo("Frontend engineer | Web2Go", "A frontend engineer role at Web2Go Studio, open until 31 December 2026."),
    },
    {
      title: "Implementation specialist",
      department: "Web2Go Systems",
      location: "Ho Chi Minh City",
      workType: "Full-time",
      level: "Professional",
      description: "Record processes, prepare handover checklists, and train users on delivered systems.",
      requirements: ["Experience working with business teams", "Clear written documentation in Vietnamese or English"],
      benefits: ["Statutory insurance", "Travel support for warehouse or branch visits"],
      seo: seo("Implementation specialist | Web2Go", "An implementation specialist role at Web2Go Systems, open until 31 December 2026."),
    },
  ];

  site.careers.forEach((item, index) => {
    const copy = careers[index];
    item.title = copy.title;
    item.department = copy.department;
    item.location = copy.location;
    item.workType = copy.workType;
    item.level = copy.level;
    item.description = copy.description;
    item.requirements = copy.requirements;
    item.benefits = copy.benefits;
    item.seo = copy.seo;
  });

  const partners = [
    ["Dong A Retail", "Retail", "Dong A Retail wordmark"],
    ["Mekong Health", "Healthcare", "Mekong Health wordmark"],
    ["Pacific Ports", "Logistics", "Pacific Ports wordmark"],
    ["Song Han Materials", "Materials", "Song Han Materials wordmark"],
  ];
  site.partners.forEach((item, index) => {
    const [name, category, alt] = partners[index];
    item.name = name;
    item.category = category;
    imageAlt(item.logo, alt);
  });

  const timeline = [
    ["Web2Go is established", "Web2Go begins in Ho Chi Minh City with a focus on web products and business systems.", "Web2Go founding record, 2018", "Web2Go founding record"],
    ["Studio and Systems separate their briefs", "The two group units take separate design and business-system briefs.", "Web2Go group planning note, 2022", "Web2Go Studio and Systems structure, 2022"],
    ["Internal information portal is handed over", "The first staff portal enters use at the District 1 office.", "Web2Go project register, 2024", "Internal portal handover day"],
    ["Cloud and Labs join the operating model", "Operations and integration testing are added to the group delivery model.", "Web2Go group planning note, 2025", "Web2Go group operating model, 2025"],
  ];
  site.timeline.forEach((item, index) => {
    const [title, description, source, alt] = timeline[index];
    item.title = title;
    item.description = description;
    item.source = source;
    imageAlt(item.image, alt);
  });

  const sustainability = [
    ["Operating environment", "Web2Go tracks office electricity and powers down test servers outside agreed hours.", "Record office electricity monthly", "saved electricity records", "Web2Go office operations ledger, 2025", "Web2Go records office electricity and scheduled test-server shutdowns."],
    ["People and work", "Web2Go publishes roles, employment information, and working conditions for candidates and team members.", "Publish open roles on the website", "open roles", "Web2Go careers register, 2026", "Web2Go publishes roles and working conditions for candidates."],
    ["Governance and disclosure", "Web2Go keeps governance notes, legal information, and responsible contact paths available on the website.", "Keep legal information reachable", "public policy pages", "Web2Go legal information index, 2026", "Web2Go keeps governance notes and legal information available online."],
  ];
  site.sustainability.forEach((item, index) => {
    const [pillar, body, goal, unit, source, description] = sustainability[index];
    item.pillar = pillar;
    item.body = body;
    item.goals = [goal];
    const statistic = item.statistics[0] as {
      unit: string;
      source: string;
    };
    statistic.unit = unit;
    statistic.source = source;
    item.report.title = "Web2Go responsibility operations note 2025";
    item.seo = seo(`${pillar} | Web2Go`, description);
    imageAlt(item.image, `${pillar} at Web2Go`);
  });

  site.offices[0].name = "Ho Chi Minh City office";
  site.offices[0].address = "Floor 8, 123 Nguyen Hue, District 1, Ho Chi Minh City";
  site.offices[0].email = "hello@web2go.vn";
  site.offices[0].phone = "+84 28 3822 2000";

  const pages = {
    about: ["About Web2Go", "Web2Go is a technology group focused on web products, business systems, and digital operations. Studio, Systems, Cloud, and Labs work together from design and implementation to handover and support. Investor relations are not open on this website.", "About | Web2Go", "Web2Go develops web products, business systems, and digital operations."],
    history: ["History", "Web2Go began in Ho Chi Minh City in 2018, separated Studio and Systems briefs in 2022, handed over an internal portal in 2024, and added Cloud and Labs to the operating model in 2025.", "History | Web2Go", "Key Web2Go milestones from 2018, 2022, 2024, and 2025."],
    vision: ["Vision", "Web2Go aims to leave customers with digital products they can operate after handover, supported by clear documentation and a responsible contact path.", "Vision | Web2Go", "Web2Go's approach to durable digital products and clear support."],
    mission: ["Mission", "Web2Go records requirements in writing, hands over the agreed scope, and keeps support channels clear for the agreed contract period.", "Mission | Web2Go", "Web2Go records scope, delivers clearly, and supports agreed operations."],
    values: ["Values", "Three internal principles guide Web2Go: write the scope before work begins, attach sources to figures, and keep drafts away from public pages until reviewed.", "Values | Web2Go", "Web2Go values clear scope, sourced figures, and disciplined publishing."],
    governance: ["Governance", "Web2Go operates across three layers: group direction, specialist unit management, and project-scope control. Audited financial information and investor disclosures are outside this website's current scope.", "Governance | Web2Go", "Web2Go governance combines group direction, specialist units, and project-scope control."],
    process: ["Recruitment process", "Candidates choose a role, send details through the contact form, and receive a response within three business days. Web2Go does not charge candidates and uses application information only to review a suitable opportunity.", "Recruitment process | Web2Go", "How Web2Go receives applications and communicates with candidates."],
    privacy: ["Privacy notice", "This notice explains how Web2Go receives and uses name, email, organisation, topic, and message details to respond to contact requests. Access is limited to the responsible team and data is removed when it is no longer needed. Contact privacy@web2go.vn to request access, correction, or deletion.", "Privacy | Web2Go", "How Web2Go receives, uses, and protects contact and recruitment data."],
    terms: ["Terms of use", "The Web2Go website provides information about the group, sectors, projects, careers, and contact paths. It is not an offer, investment invitation, quotation, or service-level commitment. Do not reproduce the logo, images, or brand content for commercial use without written permission.", "Terms of use | Web2Go", "Web2Go website terms, content rights, and information limits."],
    cookies: ["Cookie notice", "The website uses essential cookies to remember language and session state. Measurement tools load only after consent and only when a provider configuration is enabled. Web2Go does not load advertising pixels, chat tools, or measurement code before that point. Contact privacy@web2go.vn with cookie questions.", "Cookies | Web2Go", "Essential cookies, measurement consent, and visitor choices on Web2Go."],
    investors: ["Investor relations", "Investor relations are not currently open. When Web2Go has a disclosure decision and an approved information policy, this page will publish reports, notices, and an official IR contact.", "Investor relations | Web2Go", "The Web2Go investor relations module is not currently open."],
    press: ["Press resources", "Press teams may use the Web2Go logo at /media/web2go-logo.jpg for confirmed editorial coverage. Recolouring, co-branding, or use with a partner or product name requires prior Web2Go approval. Contact press@web2go.vn for media requests.", "Press resources | Web2Go", "Web2Go logo, press information, and media contact path."],
    recruitment: ["Recruitment notice", "Application information submitted through the contact form is used to review a suitable role, arrange interviews, and manage the conversation. Access is limited to the recruitment team and names, portraits, or testimonials are not published without consent.", "Recruitment notice | Web2Go", "How Web2Go receives and protects candidate information."],
    brand: ["Brand use", "The Web2Go logo is used in approved introduction and media materials. Do not change its proportions, colours, or structure. Use of the logo with a partner, customer, or other product name requires prior review by Web2Go.", "Brand use | Web2Go", "Web2Go logo and brand-use guidance."],
    disclaimer: ["Contact disclaimer", "Submitting the contact form does not create a contract, quotation, investment invitation, or complaint resolution commitment. Web2Go routes the enquiry to the responsible team and responds within the information it can provide.", "Contact disclaimer | Web2Go", "Scope and limits of information submitted through the Web2Go contact form."],
  } as const;

  for (const [id, [title, body, seoTitle, seoDescription]] of Object.entries(pages)) {
    const page = site.pages[id as keyof typeof site.pages];
    page.title = title;
    page.body = body;
    page.seo = seo(seoTitle, seoDescription, page.seo.indexable);
  }

  site.faqs = [
    {
      id: "faq-1",
      question: "How do I apply for a role?",
      answer: "Open a role, read the description, and send the contact form with Careers selected. Web2Go aims to acknowledge applications within three business days.",
    },
    {
      id: "faq-2",
      question: "Does Web2Go charge candidates?",
      answer: "No. Web2Go does not charge candidates at any stage of recruitment.",
    },
  ];

  return site;
}

export const localRawSites: Record<Locale, RawSite> = {
  vi: localRawSite,
  en: buildEnglishSite(),
};
