export const personalInfo = {
  name: "Phoenix Keiner",
  title: "Full Stack Developer & Systems Integration Engineer",
  email: "keinerphoenix@gmail.com",
  description: "Results-driven Full Stack Developer and Systems Integration Engineer with 6+ years of experience building scalable web applications, automating enterprise workflows, and integrating ERP systems. Proven track record of eliminating significant manual overhead through custom database tooling, API integrations, and analytics pipelines. Available for contract engagements.",
}

export const techSkills = [
  "PHP", "Python", "Go", "JavaScript", "TypeScript", "SQL", "PowerShell", "C#", "HTML", "CSS",
  "Laravel", "Vue.js", "React", "Next.js", "Node.js", "Express.js", "Tailwind CSS",
  "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Microsoft SQL Server",
  "Azure", "AWS", "Red Hat Linux", "Docker", "CI/CD",
  "Google Analytics 4", "Google Tag Manager", "Google Search Console", "Microsoft Clarity", "Power BI", "SEO",
  "Innergy ERP", "NetSuite", "Adobe Commerce", "Monday.com",
  "Git", "REST APIs", "Test-driven Development", "Agile", "Jupyter Notebook", "Prophet",
]

export const experiences = [
  {
    date: "Apr. 2026 - Present",
    role: "Full Stack Developer",
    company: "Messenger - Fort Wayne, IN",
    paragraphs: [
      "Architecting a Laravel REST API powering a Vue.js storefront template system for funeral home clients. Inventory is consolidated into a single centralized API and filtered dynamically per client via authentication keys, allowing new funeral home storefronts to be created from a single codebase without duplicating backend logic.",
      "Implemented test-driven development using PHP Pest, ensuring code reliability and reducing regression risk across the application.",
      "Optimized Thumbies.com, reducing initial page load time from 26 seconds to 6 seconds. Rebuilt legacy PHP finance reporting pages into modern interactive dashboards with CSV export and automated recurring reports using Python.",
      "Collaborating with a team of 2 developers and 1 director on Microsoft Azure-hosted infrastructure.",
    ],
  },
  {
    date: "Jan. 2025 - Mar. 2026",
    role: "System Specialist",
    company: "Revive Home Brands - Grabill, IN",
    paragraphs: [
      "Built the company's entire internal technology stack by integrating Innergy ERP, NetSuite and Monday.com APIs into a custom Laravel and React intranet that serves every employee. The platform delivers real-time KPI dashboards, labor tracking, shipment management, color inventory auditing, and financial reporting from a single interface.",
      "Replaced a manual monthly inventory process, previously a two-business-week effort done in Excel, with a concurrent-access database form that completes in under 10 hours. Built a paperless QC tracking system for the quality control department that auto-generates graphs, distributes scheduled reports and eliminates 60 hours of manual work per month.",
      "Developed a Go microservice to retrieve structured ERP API data and push it to a custom WordPress plugin, extending site functionality and improving data flow between systems without impacting performance. Overhauled and launched dutchmade.com on a new WordPress theme, including project gallery, dealer portal, door style catalog and showroom finder.",
      "Built Python forecasting pipelines using Prophet and Jupyter Notebook for production trend analysis, with output deployed to leadership screens and production-floor displays. Implemented Google Analytics 4 and Microsoft Clarity across WordPress properties for behavior tracking and funnel analysis.",
      "Introduced Agile sprint methodology to internal IT, improving delivery speed, cross-departmental transparency and task accountability.",
    ],
  },
  {
    date: "Jan. 2025 - Apr. 2026 (Contract)",
    role: "Contract Web Developer",
    company: "Annie's Publishing - Fort Wayne, IN",
    paragraphs: [
      "Contracted to support the ongoing replatforming of Annie's eCommerce portfolio, consolidating 4 legacy Laravel websites into Adobe Commerce (Magento) as part of a broader modernization initiative.",
      "Led the migration of the customer digital bookshelf from a legacy Laravel system into Magento, restoring access to missing products for customers and clearing a backlog of unresolved fulfillment issues. Responsible for maintaining and enhancing the Magento platform, including troubleshooting technical issues, implementing feature enhancements and ensuring a consistent user experience across properties.",
      "Provided technical support across internal teams and customer issues, diagnosing and resolving platform problems to minimize downtime and maintain business continuity.",
    ],
  },
  {
    date: "May 2021 - Jan. 2025 (Full Time)",
    role: "Web Developer",
    company: "Annie's Publishing - Fort Wayne, IN",
    paragraphs: [
      "Developed and maintained Adobe Commerce (Magento) eCommerce platforms supporting approximately 1.25 million daily promotional email recipients.",
      "Led front-end development for the Annie's Attic website replatforming initiative, handling UI/UX refinement, content architecture and ADA compliance via AudioEye API.",
      "Executed PHP 5.6 to 7.2 to 8.0 migrations across 20 sites using PHP CodeSniffer to identify and resolve compatibility issues. Contributed to PHP 8.2 and Red Hat 8.0 infrastructure upgrades and migrated MySQL 5.6 to 8.0 as part of a full-stack infrastructure upgrade.",
      "Led the migration from Universal Analytics to Google Analytics 4 ahead of UA deprecation, created isolated dev and production environments in Google Tag Manager to prevent data contamination and ensure accurate traffic routing. Also managed the migration of hardcoded JavaScript tracking pixels to tag-based implementations, modernizing the company's data collection infrastructure.",
      "Documented and led User Acceptance Testing (UAT) for the Adobe Magento platform migration. Led the adoption of ClickUp as the team's project management system, trained staff on the platform and restructured the web development workflow around Agile sprint methodology.",
      "Wrote and optimized SQL queries via phpMyAdmin on AWS-hosted infrastructure for site updates, database maintenance and data reporting.",
    ],
  },
  {
    date: "Aug. 2018 - July 2020",
    role: "Technology Teacher",
    company: "Saint Joseph Hessen Cassel - Fort Wayne, IN",
    paragraphs: [
      "Designed and delivered K-8 computer science curriculum for 112 students, aligned with Indiana state standards. Lessons covered data analytics, HTML, web programming, Python, robotics and Office 365.",
      "Coached the VEX Robotics team to a top-10 finish at Indiana state finals.",
      "Collaborated with other teachers to integrate technology projects into their lesson plans.",
      "During COVID-19, independently produced an educational YouTube video series to maintain learning continuity for students during the shift to remote instruction.",
    ],
  },
]

export const education = [
  {
    date: "Apr. 2021",
    institution: "University of Saint Francis - Fort Wayne, IN",
    degree: "B.S. Computer Information Systems | Minor: Music Technology | Magna Cum Laude",
    details: [
      "Roger Bacon & Richard Lugar Scholarship Recipient.",
    ],
  },
]

export const qualifications = [
  "Certificate in Data Analytics - Stanford University.",
  "Google Data Analytics Professional Certificate.",
  "Google Analytics 4 Certified.",
]

export const projects = [
  {
    title: "AntFarm",
    url: "https://github.com/phoenixkeiner/AntFarm",
    description: "Python-based ant colony optimization engine for mapping optimal machinery placement and routing on production floors. Supports parallel and sequential pathfinding modes, cart-size collision detection, real-time visualization, and CSV-based layout import. Built to solve an actual warehouse logistics problem.",
  },
  {
    title: "BMT Notes",
    url: "https://phoenixkeiner.github.io/bmt-notes",
    description: "Deployed React application built for personal use during martial arts training. Demonstrates component architecture and React state management in a production-deployed context.",
  },
]

export const socials = [
  { icon: 'GitHubIcon', url: 'https://github.com/phoenixkeiner' },
]
