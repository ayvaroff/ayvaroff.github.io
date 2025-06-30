import dedent from "dedent";

import icons from "./icons.ts";
import logos from "./logos.ts";

export default {
  profile_image: "https://avatars.githubusercontent.com/u/10350182?v=4",
  full_name: "Anton Ayvarov",
  title: "Frontend | Fullstack Developer",
  location: "Lisbon, Portugal 🇵🇹",
  languages: ["English", "Russian", "Portuguese"],
  contacts: {
    email: "ayvaroff@gmail.com",
  },
  social: [
    {
      name: "LinkedIn",
      icon_svg: icons.social.LinkedIn,
      url: "https://linkedin.com/in/ayvaroff",
    },
    {
      name: "GitHub",
      icon_svg: icons.social.GitHub,
      url: "https://github.com/ayvaroff",
    },
  ],
  summary: dedent`
    I'm a frontend developer with over 6 years of experience and a good grasp of backend work. My background covers web, cross-platform mobile, and fullstack projects - mostly with TypeScript, React, and Node.js. I've built everything from complex web apps to internal tools, and I'm comfortable working with CI/CD, Docker, and AWS S3. If needed, I can take a feature from idea to production, including backend and database work.
  
    I don't afraid of getting out from my comfort zone and learning new things, enjoy solving complex problems, and always aim to deliver work I'm proud of.
  `,
  skills: ["TypeScript", "JavaScript", "React", "Node.js" , "Python", "Next.js", "MongoDB", "PostgreSQL", "Docker", "Docker Compose", "CI/CD", "AWS S3", "RESTful APIs", "Git"],
  experience: [
    {
      title: "Frontend | Fullstack Developer",
      logo_base64: logos.evolution,
      company: "Evolution",
      location: "Lisbon, Portugal | Riga, Latvia",
      dates: "Jan 2020 – Present",
      description: dedent`
        - Built and maintained web apps and internal tools with TypeScript, React, and Node.js
        - Moved CI/CD pipelines from Jenkins to GitLab CI and vice versa, making deployments smoother
        - Managed and extended Storybook with custom addons that teams use as tools in their daily work
        - Improved compliance and core game components, always focusing on code quality
        - Helped design and roll out a system for iOS bundle deployment and delivery
        - Participated in technical interviews and mentored junior developers in the Evolution TypeScript Bootcamp
      `,
      stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Python", "Docker", "GitLab CI", "AWS S3", "Jenkins", "Storybook"],
    },
    {
      title: "Frontend Developer",
      logo_base64: logos.movika,
      company: "Movika",
      location: "Remote | Freelance",
      dates: "Aug 2021 - Sep 2023",
      description: dedent`
        - Designed and implemented features for a custom interactive video editor (not video editor) using TypeScript, React, and D3.js
        - Made key architectural decisions to improve scalability and maintainability
        - Refactored and modularized Redux store logic for better state management
        - Introduced TypeScript and set up linters to improve code quality
        - Established Storybook for component development and testing
        - Wrote and maintained tests with Jest to ensure code reliability
      `,
      stack: ["TypeScript", "React", "Redux", "D3.js", "Jest", "Architectural Design", "Storybook"],
    },
    {
      title: "Frontend | Fullstack Developer",
      logo_base64: null,
      company: "Freelance",
      location: "Remote | Freelance",
      dates: "May 2015 - Aug 2021",
      description: dedent`
        - Developed various web and cross-platform mobile applications using React, Redux, Node.js, and Next.js
        - Built cross-platform mobile application using Cordova and Ionic Framework and published it on AppStore/Google Play
        - Created iOS-applications prototypes using Swift
      `,
      stack: ["TypeScript", "JavaScript", "React", "Node.js", "Next.js", "Cordova", "Ionic Framework", "Angular", "Swift"],
    },
    {
      title: "Frontend Developer",
      logo_base64:logos.serenity,
      company: "Serenity",
      location: "Yoshkar-Ola, Mari El, Russia",
      dates: "May 2018 - Nov 2019",
      description: dedent`
        - Developed and optimized features for a real estate platform (properstar.com) using React and Redux
        - Analyzed and refactored React application for performance improvements
        - Collaborated with the team to deliver new features and maintain high code quality
      `,
      stack: ["JavaScript", "React", "Redux", "Jest"],
    },
    {
      title: "Frontend Developer",
      logo_base64: null,
      company: "MRSPro.ru",
      location: "Yoshkar-Ola, Mari El, Russia",
      dates: "May 2017 - May 2018",
      description: dedent`
        - Developed new features using JavaScript and React for a cross-platform application "ConstructionControl" (StroyControl)
        - Developed new program interfaces using HTML5, CSS3, Material-UI
        - Improved the in-app 2D engine based on the Canvas API
        - Organized frontend meet-ups to share best practices
      `,
      stack: ["JavaScript", "React", "Canvas API", "HTML5", "CSS3", "Material-UI"],
    },
    {
      title: "Software | Game Developer",
      logo_base64: logos.elephant_games,
      company: "Elephant Games",
      location: "Yoshkar-Ola, Mari El, Russia",
      dates: "Nov 2015 - Mar 2017",
      description: dedent`
        - Developed and supported internal tools using C#/.NET, PHP, and JavaScript
        - Built admin panels for game event and player data management
        - Developed game features for “Midnight Castle” using Lua
      `,
      stack: ["Lua", "C#/.NET", "PHP", "JavaScript"],
    },
    {
      title: "Junior iOS Developer",
      logo_base64: null,
      company: "Bencom LLC",
      location: "Yoshkar-Ola, Mari El, Russia",
      dates: "Sep 2014 - May 2015",
      description: dedent`
        - Participated in iOS app development using Objective-C and Swift
        - Supported and improved the “Relax UP” mobile app
        - Prototyped a game with SpriteKit and Swift
        - Gained experience in mobile UI and app deployment
      `,
      stack: ["Objective-C", "Swift", "iOS"],
    },
  ],
  projects: [
    {
      name: "Доступное образование (eduaccess.ru)",
      stack: ["TypeScript", "React", "Next.js", "MongoDB", "Docker", "Docker Compose", "CI/CD", "S3", "RESTful APIs"],
      source_code_link: null,
      link: "https://eduaccess.ru",
      description: "A solo-developed SaaS application using Next.js with an admin dashboard for managing scholarship applications. The project features a multi-step form, secure authentication, and role-based access. Deployed on Yandex Cloud with automated CI/CD pipelines using GitHub Actions, Docker containers, and MongoDB for data storage. Integrated cloud storage, backup, and managed environment variables for both development and production.",
    },
    {
      name: "Bootcamp final project",
      stack: ["TypeScript", "Scala", "WebSockets", "Webpack", "Canvas API"],
      source_code_link: "https://github.com/ayvaroff/multiplayer-game",
      link: null,
      description: "A real-time multiplayer shooter game with a custom TypeScript frontend (ECS architecture, Canvas API) and a Scala backend (http4s, WebSocket, REST API). Built from scratch as a bootcamp final project.",
    },
    {
      name: "CS50 final project",
      stack: ["Swift", "Python", "Flask", "RESTful APIs"],
      source_code_link: "https://github.com/ayvaroff/cs50-final-project",
      link: null,
      description: "An iOS application designed for fitness and gym clubs, allowing users to view class schedules, register for classes, and communicate with the club via messages. This project was developed as a CS50 final project and includes both an iOS client and a Flask-based backend server with mocked data.",
    },
  ],
  education: [
    {
      name: "Mari State Technical University (MarSTU)",
      location: "Yoshkar-Ola, Mari El, Russia",
      degree: "Specialist, Computer and Information Systems Security/Information Assurance",
      dates: "2012 - 2016",
      description: "Studied cryptography and security, network security, information security management, risks analysis, computer programming.",
    },
    {
      name: "RUDN University: Peoples' Friendship University of Russia",
      location: "Moscow, Russia",
      degree: "Mathematics",
      dates: "2008 - 2012",
      description: "Studied mathematical analysis, linear algebra, differential equations, probability theory, mathematical statistics, numerical methods.",
    }
  ]
} as const;
