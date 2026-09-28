import dedent from "dedent";

import icons from "./icons.ts";
import logos from "./logos.ts";

export default {
  profile_image: "https://avatars.githubusercontent.com/u/10350182?v=4",
  full_name: "Anton Ayvarov",
  title: "Senior Frontend | Fullstack Developer",
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
    I'm a Senior Frontend | Fullstack developer with 9+ years of experience building production web applications with TypeScript, React, Node.js, and Next.js. I work across the full stack, from building responsive UI and reusable frontend architecture to designing APIs, backend services, and database-driven features. I'm comfortable owning features end-to-end, including implementation, testing, CI/CD, Docker-based delivery and cloud integrations.

    I focus on writing maintainable code, shipping reliable releases, and solving product problems with practical, scalable solutions.
  `,
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Redux",
    "Storybook",
    "Jest",
    "PostgreSQL",
    "MongoDB",
    "Python",
    "Docker",
    "CI/CD",
    "GitLab CI",
    "GitHub Actions",
    "AWS S3",
    "REST APIs",
  ],
  experience: [
    {
      logo_base64: logos.evolution,
      company: "Evolution",
      location: "Lisbon, Portugal | Riga, Latvia",
      dates: "Jan 2020 - Present",
      positions: [
        {
          title: "Senior Frontend | Fullstack Developer",
          dates: "2023 - Present",
          description: dedent`
            - Own frontend platform tooling for a large TypeScript monorepo used by multiple game and core teams: a shared ESLint config and custom ESLint plugin, Jest and Storybook upgrades, and an internal Docusaurus docs site.
            - Migrated build, validation, and release pipelines from Jenkins to GitLab CI.
            - Contributed to incremental CI validation tooling that checks only changed packages, adding governance rules and unit test coverage.
            - Automated recurring team work with Node.js services and scripts: Jira issue sync from pipelines, Slack notifications, and scheduled maintenance pipelines.
            - Ran technical interviews and mentored in the Evolution TypeScript Bootcamp, supporting hiring and team growth.
          `,
        },
        {
          title: "Frontend | Fullstack Developer",
          dates: "Jan 2020 - 2023",
          description: dedent`
            - Built and maintained the shared regulatory-compliance layer used across all games: reality checks, session limits and timers, regulator session handling, and responsible-gaming UI.
            - Co-designed the build and delivery system for game clients embedded in native iOS and Android apps: automated builds, localization asset publishing, and image optimization.
            - Built a Storybook-based platform for in-game documentation with custom addons.
            - Extended the client integration API used by native and operator integrations, and hardened core game UI components.
          `,
        },
      ],
      stack: [
        "TypeScript",
        "React",
        "Redux",
        "Node.js",
        "Webpack",
        "Storybook",
        "Jest",
        "WebdriverIO",
        "ESLint",
        "GitLab CI",
        "Jenkins",
        "Docker",
        "Docusaurus",
        "PostgreSQL",
        "Python",
        "AWS S3",
      ],
    },
    {
      logo_base64: logos.movika,
      company: "Movika (interactive video constructor for VK)",
      location: "Remote | Part-time contract",
      dates: "Aug 2021 - Sep 2023",
      positions: [
        {
          title: "Senior Frontend Developer",
          dates: "Aug 2021 - Sep 2023",
          description: dedent`
            - Designed and implemented features for a custom interactive video constructor using TypeScript, React, and D3.js.
            - Made architectural changes that helped the app scale and made it easier to maintain.
            - Refactored the Redux store to improve state management and speed up adding new features.
            - Set up TypeScript, linting, and Jest unit tests to keep the codebase clean and reliable.
            - Introduced Storybook to make component development and testing smoother for the team.
          `,
        },
      ],
      stack: ["TypeScript", "React", "Redux", "D3.js", "Jest", "Architectural Design", "Storybook"],
    },
    {
      logo_base64: logos.serenity,
      company: "Serenity",
      location: "Yoshkar-Ola, Mari El, Russia",
      dates: "May 2018 - Nov 2019",
      positions: [
        {
          title: "Frontend Developer",
          dates: "May 2018 - Nov 2019",
          description: dedent`
            - Developed and optimized features for a real estate platform (properstar.com) using React and Redux.
            - Analyzed and refactored the React application for performance improvements.
            - Collaborated with the team to deliver new features and maintain high code quality.
          `,
        },
      ],
      stack: ["JavaScript", "React", "Redux", "Jest"],
    },
    {
      logo_base64: null,
      company: "MRSPro.ru",
      location: "Yoshkar-Ola, Mari El, Russia",
      dates: "May 2017 - May 2018",
      positions: [
        {
          title: "Frontend Developer",
          dates: "May 2017 - May 2018",
          description: dedent`
            - Developed new features using JavaScript and React for a cross-platform application, "ConstructionControl" (StroyControl).
            - Developed new user interfaces using HTML5, CSS3, Material-UI.
            - Improved the in-app 2D engine based on the Canvas API.
            - Organized frontend meet-ups to share best practices.
          `,
        },
      ],
      stack: ["JavaScript", "React", "Canvas API", "HTML5", "CSS3", "Material-UI"],
    },
    {
      logo_base64: logos.elephant_games,
      company: "Elephant Games",
      location: "Yoshkar-Ola, Mari El, Russia",
      dates: "Nov 2015 - Mar 2017",
      positions: [
        {
          title: "Software | Game Developer",
          dates: "Nov 2015 - Mar 2017",
          description: dedent`
            - Developed and supported internal tools using C#/.NET, PHP, and JavaScript.
            - Built admin panels for game event and player data management.
            - Developed game features for “Midnight Castle” using Lua.
          `,
        },
      ],
      stack: ["Lua", "C#/.NET", "PHP", "JavaScript"],
    },
    {
      logo_base64: null,
      company: "Bencom LLC",
      location: "Yoshkar-Ola, Mari El, Russia",
      dates: "Sep 2014 - May 2015",
      positions: [
        {
          title: "Junior iOS Developer",
          dates: "Sep 2014 - May 2015",
          description: dedent`
            - Participated in iOS app development using Objective-C and Swift.
            - Supported and improved the “Relax UP” mobile app.
            - Prototyped a game with SpriteKit and Swift.
            - Gained experience in mobile UI and app deployment.
          `,
        },
      ],
      stack: ["Objective-C", "Swift", "iOS"],
    },
  ],
  projects: [
    {
      name: "eduaccess.ru (Accessible Education)",
      stack: ["TypeScript", "React", "Next.js", "MongoDB", "Docker", "Docker Compose", "CI/CD", "S3", "RESTful APIs"],
      source_code_link: null,
      link: "https://eduaccess.ru",
      description:
        "A solo-developed SaaS application built with Next.js, featuring an admin dashboard for managing scholarship applications. The project includes a multi-step form, secure authentication, and role-based access. Deployed on Yandex Cloud with automated CI/CD pipelines using GitHub Actions, Docker containers, and MongoDB for data storage. Integrated cloud storage, backup, and managed environment variables for both development and production.",
    },
    {
      name: "Multiplayer Game with Scala Backend",
      stack: ["TypeScript", "Scala", "WebSockets", "Webpack", "Canvas API"],
      source_code_link: "https://github.com/ayvaroff/multiplayer-game",
      link: null,
      description:
        "A real-time multiplayer shooter game with a custom TypeScript frontend (ECS architecture, Canvas API) and a Scala backend (http4s, WebSocket, REST API). Built from scratch, including the game loop, networking protocol, and server-side state management.",
    },
    {
      name: "Fitness App",
      stack: ["Swift", "Python", "Flask", "RESTful APIs"],
      source_code_link: "https://github.com/ayvaroff/cs50-final-project",
      link: null,
      description:
        "An iOS application designed for fitness and gym clubs, allowing users to view class schedules, register for classes, and communicate with the club via messages. Includes both a native iOS client and a Flask-based REST backend.",
    },
    {
      name: "Freelance web and mobile apps (2015 - 2021)",
      stack: ["TypeScript", "React", "Next.js", "Node.js", "Cordova", "Ionic Framework", "Angular", "Swift"],
      source_code_link: null,
      link: null,
      description: dedent`
        Part-time contract work alongside full-time roles.
        - Delivered web products end-to-end with Next.js and Node.js, from UI implementation to REST APIs, authentication flows, and database operations.
        - Built SaaS-style admin functionality and server-side data handling.
        - Developed and published cross-platform mobile apps with Cordova and Ionic to the App Store and Google Play, and shipped iOS prototypes in Swift to validate product ideas quickly.
      `
    },
  ],
  education: [
    {
      name: "Mari State Technical University (MarSTU)",
      location: "Yoshkar-Ola, Mari El, Russia",
      degree: "Specialist degree (5-year, MSc-equivalent), Computer and Information Systems Security",
      dates: "2012 - 2016",
      description:
        "Studied cryptography and security, network security, information security management, risk analysis, and computer programming.",
    },
    {
      name: "RUDN University: Peoples' Friendship University of Russia",
      location: "Moscow, Russia",
      degree: "Mathematics",
      dates: "2008 - 2012",
      description:
        "Studied mathematical analysis, linear algebra, differential equations, probability theory, mathematical statistics, and numerical methods.",
    },
  ],
} as const;
