export const npcDialogues = {
  university: {
    name: "Professor Francis",
    sprite: "professor",
    color: [100, 150, 255],
    dialogues: [
      "Welcome to the University of Saint Francis!",
      "Phoenix graduated magna cum laude in April 2021 with a B.S. in Computer Information Systems and a minor in Music Technology.",
      "He was a dedicated band member for four years and received the Roger Bacon Scholarship and Richard Lugar Scholarship.",
      "His time here built the foundation for his technical career ahead!",
    ],
    skillReward: "education"
  },
  
  school: {
    name: "Principal Hessen",
    sprite: "principal",
    color: [255, 200, 100],
    dialogues: [
      "Hello! I'm from Saint Joseph Hessen Cassel.",
      "Phoenix was our Technology Teacher from August 2018 to July 2020.",
      "He implemented lesson plans for K-8 following Indiana state standards for computer science.",
      "He taught data analytics, troubleshooting, HTML, Java, C#, web programming, Python/robotics & Office 365!",
      "Phoenix coached our Robotics team to 10th place at state finals!",
      "He even composed a YouTube series for children during the COVID-19 pandemic.",
    ],
    skillReward: "teaching"
  },
  
  annies: {
    name: "Annie",
    sprite: "annie",
    color: [255, 150, 200],
    dialogues: [
      "Hey there! I'm Annie from Annie's Publishing.",
      "Phoenix worked here as a Web Developer from May 2021 to January 2025 full-time, and continues contract work starting April 2025.",
      "He developed and maintained our eCommerce platforms using Adobe Magento and Laravel.",
      "Phoenix played a key role in our PHP 8.2 and Red Hat 8.0 infrastructure upgrades!",
      "He delivered daily promotional campaigns to around 1.25 MILLION users via email!",
      "He managed UI updates with ADA compliance using AudioEye API and implemented Google Analytics 4.",
      "Phoenix wrote optimized SQL queries and worked with cross-functional teams using Agile sprints.",
      "He even acted as project manager on workflow initiatives!",
    ],
    skillReward: "web_development"
  },
  
  revive: {
    name: "Director Revive",
    sprite: "director",
    color: [150, 255, 150],
    dialogues: [
      "Welcome to Revive Home Brands!",
      "Phoenix joined us as a System Specialist in January 2025 and continues to this day.",
      "He leads system integration initiatives across ERP, SQL databases, WordPress and Laravel-based intranet.",
      "Phoenix built a custom intranet dashboard using Laravel and React with real-time KPIs!",
      "He created Golang-based microservices to send API data to WordPress plugins, improving customer experience.",
      "He implemented Google Analytics 4 and Microsoft Clarity for improved tracking.",
      "Phoenix automated workflows with Go, PowerShell and Python, helping everyone in every department!",
      "He introduced Agile processes to our internal IT team.",
      "Phoenix even scripted in Go to fetch ERP data and display analytics on TVs throughout our facility!",
    ],
    skillReward: "system_integration"
  },
  
  certifications: {
    name: "Achievement Board",
    sprite: "board",
    color: [255, 215, 0],
    dialogues: [
      "Phoenix's Additional Qualifications:",
      "✓ Certificate in Data Analytics from Stanford",
      "✓ Google Data Analytics Professional Certificate",
      "✓ Proficiency in mixing and editing audio with Dolby Atmos",
      "✓ Dedicated mixed martial artist",
      "These certifications showcase his commitment to continuous learning!",
    ],
    skillReward: "certifications"
  }
};

export const npcPositions = {
  university: { x: 300, y: 150 },
  school: { x: 150, y: 300 },
  annies: { x: 450, y: 300 },
  revive: { x: 300, y: 450 },
  certifications: { x: 300, y: 650 }
};