import { useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import MetalAssembly from "./components/MetalAssembly";
import CelebrationShine from "./components/CelebrationShine";
import TrainJourney from "./components/TrainJourney";
const experiences = [
  {
    period: "AUG 2026 · CONTRACT",
    role: "Contract Web Developer",
    company: "Iwemi · Remote",
    description:
      "Investigated and resolved a nopCommerce first-load issue that required users to refresh the website before it worked correctly. Also reviewed registered-user access and the order-placement workflow, including the administrative experience.",
    tags: ["nopCommerce", "Debugging", "Web troubleshooting"],
  },
  {
    period: "JAN — JUN 2026",
    role: "Administrative Officer",
    company: "Slum and Rural Health Initiative Network",
    description:
      "Supported office operations, records, procurement documentation, finance-sheet reconciliation and payroll support. Helped onboard more than 30 people over three months, coordinated stakeholders, and assisted with inventory, equipment repairs and replacement.",
    tags: ["Operations", "Documentation", "Coordination"],
  },
  {
    period: "SEP — DEC 2025",
    role: "Full-Stack Developer",
    company: "Slum and Rural Health Initiative Network",
    description:
      "Developed and supported internal web applications, responsive dashboards and reporting tools for organisational and outreach activities. Worked across interface development, application logic, data workflows, debugging and version control.",
    tags: ["Full-stack development", "Dashboards", "Reporting"],
  },
  {
    period: "2025 — PRESENT",
    role: "Founder & Full-Stack Developer",
    company: "Senzy Enterprises",
    description:
      "Building a technology-focused venture across software development, digital products, branding and creative services. Leading product discovery, interface architecture, frontend and backend implementation, database planning, testing, documentation and iteration. Developing Senzy Core as a flagship organisational software concept.",
    tags: ["Entrepreneurship", "Product development", "Senzy Core"],
  },
  {
    period: "APR — JUN 2025",
    role: "Digital Marketer",
    company: "Zimcrest Technologies",
    description:
      "Contributed to digital campaigns, content planning, market research and online visibility. Worked with campaign performance information and Google Analytics setup to support more informed digital marketing activities.",
    tags: ["Digital marketing", "Research", "Analytics"],
  },
  {
    period: "PROJECT ENGAGEMENT",
    role: "Administrative Project Support",
    company: "ActFast Project · SRHIN engagement",
    description:
      "Supported project administration, event logistics, activity coordination and documentation, helping project activities stay organised and properly recorded.",
    tags: ["Project support", "Logistics", "Administration"],
  },
];

const skillGroups = [
  {
    icon: Code2,
    number: "01",
    title: "Frontend Engineering",
    description: "Building clear, responsive and engaging user experiences.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Design",
      "UI Implementation",
    ],
  },
  {
    icon: Layers3,
    number: "02",
    title: "Backend & APIs",
    description: "Connecting interfaces to application logic and services.",
    skills: [
      "Node.js",
      "Express.js",
      "PHP",
      "Laravel",
      "REST APIs",
      "API Integration",
      "Authentication",
      "Server-side Logic",
    ],
  },
  {
    icon: Database,
    number: "03",
    title: "Databases & Data",
    description: "Working with the information that powers applications.",
    skills: [
      "Firebase",
      "Firestore",
      "Realtime Database",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Data Organisation",
      "Data Workflows",
    ],
  },
  {
    icon: Monitor,
    number: "04",
    title: "Development & Tools",
    description: "The tools and practices behind reliable delivery.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Vite",
      "NPM",
      "Debugging",
      "Testing",
      "Deployment",
      "Performance Optimisation",
    ],
  },
  {
    icon: Lightbulb,
    number: "05",
    title: "Product & Design",
    description: "Turning ideas and requirements into usable products.",
    skills: [
      "Figma",
      "Canva",
      "UI/UX",
      "Prototyping",
      "Product Architecture",
      "Technical Documentation",
      "Product Development",
    ],
  },
  {
    icon: BriefcaseBusiness,
    number: "06",
    title: "Business, Admin & Marketing",
    description: "Understanding the people and processes technology serves.",
    skills: [
      "Office Administration",
      "Operations Support",
      "Project Coordination",
      "Records Management",
      "Procurement Support",
      "Reporting",
      "Digital Marketing",
      "SEO & Content",
      "Stakeholder Communication",
      "Market Research",
    ],
  },
];

const projects = [
  {
    number: "01",
    name: "Senzy Core",
    category: "FLAGSHIP PRODUCT · IN DEVELOPMENT",
    year: "2025 — PRESENT",
    description:
      "An organisational software and data-solutions platform in development. Its direction is centred on bringing information, operational workflows and useful insights into a more structured environment through dashboards, access management and automation.",
    image: "/assets/images/senzy-core.png",
    link: "https://github.com/Senzyenterprises/senzy-core",
    linkLabel: "VIEW SOURCE",
    featured: true,
  },
  {
    number: "02",
    name: "MindStack",
    category: "E-LEARNING PLATFORM",
    year: "2025",
    description:
      "A digital learning experience exploring course discovery, learning content, authentication and administrative oversight. Built around an organised interface and Firebase-backed application workflows.",
    image: "/assets/images/mindstack.png",
    link: "https://senzyenterprises.github.io/Mindstack/",
    linkLabel: "VISIT PROJECT",
  },
  {
    number: "03",
    name: "KingdomSites",
    category: "DIGITAL PLATFORM",
    year: "2025",
    description:
      "A platform concept for religious organisations, bringing together organisational information, content presentation, sermon media and online engagement in one web experience.",
    image: "/assets/images/kingdomsites.png",
    link: "https://senzyenterprises.github.io/KingdomSites/",
    linkLabel: "VISIT PROJECT",
  },
  {
    number: "04",
    name: "Amora",
    category: "SOCIAL MATCHMAKING CONCEPT",
    year: "2025",
    description:
      "A relationship-focused digital experience exploring meaningful connections, interactive user experiences, compatibility features and private communication.",
    image: "/assets/images/amora.png",
    link: "https://senzyenterprises.github.io/Amora/",
    linkLabel: "VISIT PROJECT",
  },
  {
    number: "05",
    name: "Yumbrix",
    category: "E-COMMERCE EXPERIENCE",
    year: "2025",
    description:
      "A responsive shopping experience featuring product discovery, category navigation, promotional content and newsletter interaction, with Firebase-backed data handling.",
    image: "/assets/images/yumbrix.png",
    link: "https://senzyenterprises.github.io/yumbrix/",
    linkLabel: "VISIT PROJECT",
  },
  {
    number: "06",
    name: "Senzy Enterprises",
    category: "BUSINESS & CREATIVE PLATFORM",
    year: "2025 — PRESENT",
    description:
      "The digital home of Senzy Enterprises, presenting its direction across software development, branding, graphic design, digital experiences and emerging data solutions.",
    image: "/assets/images/senzy-enterprises.png",
    link: "https://senzyenterprises.github.io/1/",
    linkLabel: "VISIT PROJECT",
  },
  {
    number: "07",
    name: "Behind the Smile",
    category: "CONTENT & STORYTELLING",
    year: "2025",
    description:
      "A React-based information and content platform exploring everyday life, news, business ideas and digital storytelling through a web publishing experience.",
    image: "/assets/images/behind-the-smile.png",
    link: "https://senzy01.github.io/My-Elite-World/",
    linkLabel: "VISIT PROJECT",
  },
];

const achievements = [
  {
    icon: Code2,
    title: "End-to-End Product Engineering",
    description:
      "Growing from frontend development into full-stack product work across interfaces, application logic, APIs, databases, debugging and deployment.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Technology Meets Operations",
    description:
      "Combining software development with practical experience in administration, documentation, coordination and organisational workflows.",
  },
  {
    icon: Rocket,
    title: "Building Senzy Enterprises",
    description:
      "Establishing a technology-focused venture bringing software development, digital products, branding and creative services together.",
  },
  {
    icon: Lightbulb,
    title: "Senzy Core — Flagship Product",
    description:
      "Developing the direction for an organisational data-solutions platform focused on structured information, dashboards, workflows and automation.",
  },
];

const education = [
  {
    qualification: "BSc Computer Science",
    institution: "Tai Solarin University of Education",
    period: "2017 — 2024",
    detail:
      "Academic foundation in computing, software concepts and analytical problem-solving.",
  },
  {
    qualification: "Data Science with Python",
    institution: "Clusters",
    period: "IN PROGRESS",
    detail:
      "Continuing to explore data science and practical work with Python.",
  },
  {
    qualification: "Office Administration",
    institution: "Coursera",
    period: "PROFESSIONAL DEVELOPMENT",
    detail:
      "Additional learning in administrative and organisational practice.",
  },
];

function ImageWithFallback({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`image-frame ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="image-fallback" aria-label={`${alt} image placeholder`}>
          <span>SENZY</span>
          <small>PROJECT PREVIEW</small>
        </div>
      )}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#home" onClick={closeMenu}>
          SENZY<span>.</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {[
            ["About", "#about"],
            ["Capabilities", "#capabilities"],
            ["Journey", "#journey"],
            ["Projects", "#projects"],
            ["Recognition", "#recognition"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a href={href} key={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </div>

        <a className="nav-cta" href="#contact">
          LET'S TALK <ArrowUpRight size={15} />
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <MetalAssembly />

        <div className="hero-content">
          <p className="eyebrow">
            <span className="status-dot" />
            INDEPENDENT DEVELOPER & DIGITAL CREATOR
          </p>

          <h1>
            I BUILD
            <br />
            <span>DIGITAL</span>
            <br />
            EXPERIENCES<span className="accent">.</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              I'm <strong>Adeshina Attoe</strong> — a full-stack developer and
              digital creator connecting thoughtful engineering with practical
              ideas. From interfaces to application logic, I build digital
              experiences designed to be useful.
            </p>

            <a className="text-link" href="#about">
              DISCOVER MY STORY <ArrowDownRight size={17} />
            </a>
          </div>
        </div>

        <div className="hero-coordinate">
          <span>LAGOS, NIGERIA</span>
          <span>AVAILABLE FOR SELECT PROJECTS</span>
        </div>

        <div className="hero-index">01 / 09</div>

        <a className="hero-scroll" href="#about">
          <span />
          SCROLL TO EXPLORE
          <ArrowDown size={14} />
        </a>

        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />
          <div className="orbit-core">S<span>.</span></div>
        </div>
      </section>

      <section className="intro section-padding" id="about">
        <CelebrationShine />
        <div className="section-label">
          <span>01</span> / THE PERSON BEHIND THE CODE
        </div>

        <div className="intro-content">
          <p className="intro-heading">
            I believe technology should do more than look impressive. It should
            <span> solve real problems</span>, make work clearer and turn ideas
            into possibilities.
          </p>

          <div className="about-columns">
            <div className="intro-details">
              <p>
                I'm Adeshina Attoe, a Computer Science graduate and full-stack
                developer based in Lagos, Nigeria. My path into software
                development has been shaped by curiosity, persistence and a
                willingness to work through difficult problems. A significant
                part of my learning has come from building, debugging,
                researching and figuring things out beyond the lecture hall.
              </p>

              <p>
                I enjoy understanding how an entire application works — from
                the interface a person interacts with, through the application
                logic and APIs, to the database that stores information and the
                result that helps someone get something done. My work spans
                frontend experiences, backend services, authentication,
                databases, dashboards and deployment.
              </p>

              <p>
                My experience in administration and business operations has
                also shaped how I approach technology. Working with records,
                documentation, finance support, procurement, onboarding and
                coordination taught me the importance of accuracy,
                communication, structure and follow-through. Those lessons
                influence the way I think about products, teams and the
                organisations that use software.
              </p>

              <p>
                Through <strong>Senzy Enterprises</strong>, I'm building a
                technology-focused venture around software development,
                digital products, branding and creative services. One of its
                central ambitions is <strong>Senzy Core</strong> — an
                organisational data-solutions concept exploring better ways to
                manage information, workflows and operational insight.
              </p>

              <p>
                I'm especially interested in creating software that makes
                information easier to manage, decisions easier to make and
                organisations more capable. I value continuous learning,
                thoughtful execution and technology that has a clear purpose.
              </p>
            </div>

            <aside className="about-aside">
              <div className="about-aside-mark">S<span>.</span></div>
              <p className="aside-kicker">A PRACTICAL MINDSET</p>
              <h3>Understand the problem. Build the right thing.</h3>
              <p>
                Engineering, product thinking and operational awareness —
                brought together to create useful digital experiences.
              </p>
              <a
                className="text-link"
                href="/assets/document/AdeshinaAttoeResume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                VIEW MY RESUME <ArrowUpRight size={16} />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="capabilities section-padding" id="capabilities">
        <div className="section-label">
          <span>02</span> / WHAT I BRING TO THE TABLE
        </div>

        <div className="section-heading">
          <h2>
            THINK. BUILD.
            <br />
            <span>MAKE IT WORK.</span>
          </h2>
          <p>
            A growing toolkit across software engineering, product development
            and the operational side of getting things done.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article className="skill-card" key={group.number}>
                <div className="skill-card-top">
                  <span>{group.number} / 06</span>
                  <Icon size={22} strokeWidth={1.4} />
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

       <TrainJourney />

      <section className="achievements section-padding" id="recognition">
        <div className="section-label">
          <span>04</span> / MILESTONES & DIRECTION
        </div>

        <div className="section-heading">
          <h2>
            PROGRESS IS
            <br />
            <span>BUILT, NOT CLAIMED.</span>
          </h2>
          <p>
            The milestones that reflect how I work, what I've built and where
            I'm directing my energy.
          </p>
        </div>

        <div className="achievement-grid">
          {achievements.map((item, index) => {
            const Icon = item.icon;

            return (
              <article className="achievement-card" key={item.title}>
                <span className="achievement-number">
                  0{index + 1}
                </span>
                <Icon size={25} strokeWidth={1.4} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="projects section-padding" id="projects">
        <div className="section-label">
          <span>05</span> / SELECTED WORK & EXPERIMENTS
        </div>

        <div className="section-heading">
          <h2>
            IDEAS INTO
            <br />
            <span>EXPERIENCES.</span>
          </h2>
          <p>
            A growing collection of products, platforms and experiments.
            Each project represents a different problem space and an
            opportunity to learn by building.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article
              className={`project-card ${project.featured ? "project-featured" : ""}`}
              key={project.number}
            >
              <ImageWithFallback
                src={project.image}
                alt={`${project.name} project preview`}
                className="project-visual"
              />

              <div className="project-meta">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>

              <div className="project-title-row">
                <h3>{project.name}</h3>
                <span className="project-number">{project.number}</span>
              </div>

              <p>{project.description}</p>

              <a href={project.link} target="_blank" rel="noreferrer">
                {project.linkLabel} <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="senzy-feature section-padding" id="senzy">
        <div className="section-label">
          <span>06</span> / BUILDING BEYOND THE PORTFOLIO
        </div>

        <div className="senzy-feature-content">
          <div>
            <p className="eyebrow">
              <Sparkles size={15} /> FOUNDER'S NOTE
            </p>
            <h2>
              MORE THAN A
              <br />
              <span>PERSONAL BRAND.</span>
            </h2>
            <p>
              Senzy Enterprises is the platform through which I explore the
              intersection of technology, creativity and practical business
              needs. It brings together software development, digital
              experiences, branding and emerging data solutions.
            </p>
            <p>
              At the centre of that direction is Senzy Core — a product
              concept focused on helping organisations structure information,
              manage workflows and make better use of their data. It is a work
              in progress, and I'm building it one thoughtful step at a time.
            </p>
            <a
              className="text-link"
              href="https://senzyenterprises.github.io/1/"
              target="_blank"
              rel="noreferrer"
            >
              EXPLORE SENZY ENTERPRISES <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="senzy-emblem" aria-hidden="true">
            <div className="emblem-ring emblem-ring-one" />
            <div className="emblem-ring emblem-ring-two" />
            <span>S<span>.</span></span>
            <small>IDEAS INTO SYSTEMS</small>
          </div>
        </div>
      </section>

      <section className="education section-padding" id="education">
        <div className="section-label">
          <span>07</span> / EDUCATION & CONTINUOUS LEARNING
        </div>

        <div className="section-heading">
          <h2>
            ALWAYS
            <br />
            <span>IN PROGRESS.</span>
          </h2>
          <p>
            A foundation in computer science, supported by ongoing learning
            and practical exploration.
          </p>
        </div>

        <div className="education-list">
          {education.map((item, index) => (
            <article className="education-item" key={item.qualification}>
              <GraduationCap size={23} strokeWidth={1.4} />
              <div>
                <span className="experience-period">{item.period}</span>
                <h3>{item.qualification}</h3>
                <p className="experience-company">{item.institution}</p>
                <p>{item.detail}</p>
              </div>
              <span className="education-index">0{index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="blog section-padding" id="blog">
        <div className="section-label">
          <span>08</span> / NOTES FROM THE JOURNEY
        </div>

        <div className="blog-panel">
          <div className="blog-mark">S<span>.</span></div>
          <div className="blog-copy">
            <p className="eyebrow">SENZYSCRIPT</p>
            <h2>
              IDEAS, NOTES
              <br />
              <span>& PERSPECTIVES.</span>
            </h2>
            <p>
              SenzyScript is where I share thoughts, learning experiences and
              perspectives around technology, building, creativity and the
              ideas shaping my journey.
            </p>
            <a
              className="text-link"
              href="https://senzyscripts.hashnode.dev"
              target="_blank"
              rel="noreferrer"
            >
              READ SENZYSCRIPT <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="contact section-padding" id="contact">
        <div className="section-label">
          <span>09</span> / THE NEXT CHAPTER
        </div>

        <p className="eyebrow">
          <span className="status-dot" />
          OPEN TO MEANINGFUL OPPORTUNITIES
        </p>

        <h2>
          HAVE AN IDEA?
          <br />
          <span>LET'S BUILD IT.</span>
        </h2>

        <p className="contact-description">
          Whether it's a product idea, a development opportunity or a
          conversation about technology and business, I'd be glad to hear from
          you.
        </p>

        <a
          className="contact-email"
          href="mailto:adeshinaattoe23@gmail.com"
        >
          <Mail size={20} />
          adeshinaattoe23@gmail.com
          <ArrowUpRight size={18} />
        </a>

        <div className="contact-details">
          <span><MapPin size={15} /> LAGOS, NIGERIA</span>
          <a href="tel:+2347078693662">+234 707 869 3662</a>
        </div>

        <div className="social-links">
          <a href="https://github.com/Senzy01/" target="_blank" rel="noreferrer">
            GITHUB <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/adeshina-attoe-1ab51b36a"
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN <ArrowUpRight size={14} />
          </a>
          <a href="https://x.com/senzywf?s=21" target="_blank" rel="noreferrer">
            X / TWITTER <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.tiktok.com/@senzymiles23"
            target="_blank"
            rel="noreferrer"
          >
            TIKTOK <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#home">
          SENZY<span>.</span>
        </a>
        <p>DESIGNED TO BUILD. BUILT TO EVOLVE.</p>
        <a href="#home" className="back-to-top">
          BACK TO TOP <ArrowUpRight size={14} />
        </a>
        <span>© {new Date().getFullYear()} ADESHINA ATTOE</span>
      </footer>
    </main>
  );
}

export default App;