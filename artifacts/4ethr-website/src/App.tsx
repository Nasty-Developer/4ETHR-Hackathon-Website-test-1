import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import tanviPhoto from '@assets/6db3c863-775e-4157-a45c-900335789db5_1790538098467.jpg';
import sharanyaVisual from '@assets/generated_images/4ethr-signal-sharanya.png';
import yashVisual from '@assets/generated_images/4ethr-signal-yash.png';

type SectionId = 'home' | 'about' | 'team' | 'projects' | 'skills' | 'contact';

const navItems: Array<{ id: SectionId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'team', label: 'Team' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const tagline = 'Three Minds. One Digital Universe.';

const team = [
  {
    name: 'Tanvi Tapase',
    initials: 'TT',
    image: tanviPhoto,
    visual: tanviPhoto,
    visualAlt: 'Portrait of Tanvi Tapase',
    visualLabel: 'Portrait / uploaded',
    role: 'Focus area placeholder',
    bio: 'Bio placeholder — add Tanvi’s point of view, craft, and the kind of questions she brings to a room.',
    skills: ['Skill to add', 'Skill to add', 'Skill to add'],
  },
  {
    name: 'Sharanya Mestry',
    initials: 'SM',
    image: '',
    visual: sharanyaVisual,
    visualAlt: 'Abstract AI visual placeholder for Sharanya Mestry',
    visualLabel: 'AI visual / editable',
    role: 'Focus area placeholder',
    bio: 'Bio placeholder — add Sharanya’s practice, curiosities, and what she is building toward.',
    skills: ['Skill to add', 'Skill to add', 'Skill to add'],
  },
  {
    name: 'Yash Kharat',
    initials: 'YK',
    image: '',
    visual: yashVisual,
    visualAlt: 'Abstract AI visual placeholder for Yash Kharat',
    visualLabel: 'AI visual / editable',
    role: 'Focus area placeholder',
    bio: 'Bio placeholder — add Yash’s lens, technical interests, and role within the team.',
    skills: ['Skill to add', 'Skill to add', 'Skill to add'],
  },
];

const projects = [
  {
    number: '01',
    name: 'Project title to add',
    details: 'Project description placeholder — add the problem, approach, and current status.',
    status: 'Details to be added',
    technologies: ['Technology to add'],
    image: '',
    imageAlt: 'Project visual placeholder',
    github: '',
    live: '',
  },
  {
    number: '02',
    name: 'Project title to add',
    details: 'Project description placeholder — add the question this work explores and where it is now.',
    status: 'Details to be added',
    technologies: ['Technology to add'],
    image: '',
    imageAlt: 'Project visual placeholder',
    github: '',
    live: '',
  },
  {
    number: '03',
    name: 'Project title to add',
    details: 'Project description placeholder — add links, contribution notes, or a short walkthrough.',
    status: 'Details to be added',
    technologies: ['Technology to add'],
    image: '',
    imageAlt: 'Project visual placeholder',
    github: '',
    live: '',
  },
];

const skills = [
  'Skill / tool to add',
  'Skill / tool to add',
  'Skill / tool to add',
  'Skill / tool to add',
  'Skill / tool to add',
  'Skill / tool to add',
  'Skill / tool to add',
  'Skill / tool to add',
];

const socialLinks = [
  { label: 'Email', value: 'hello@your-contact-placeholder.com', href: '' },
  { label: 'GitHub', value: 'GitHub link to add', href: '' },
  { label: 'LinkedIn', value: 'LinkedIn link to add', href: '' },
  { label: 'Instagram', value: 'Instagram link to add', href: '' },
  { label: 'Other', value: 'Other social link to add', href: '' },
];

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const storedTheme = window.localStorage.getItem('4ethr-theme');
    return storedTheme === null ? true : storedTheme === 'dark';
  });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('4ethr-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 720);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.55] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const formIsValid = useMemo(
    () => form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.message.trim().length > 8,
    [form],
  );

  const updateField = (field: 'name' | 'email' | 'message', value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please add a valid email.';
    if (form.message.trim().length < 9) nextErrors.message = 'Tell us a little more about the idea.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <main className="site-shell">
      {isLoading && (
        <div className="loading-screen" role="status" aria-live="polite">
          <span className="loading-mark">4E</span>
          <span className="loading-line" />
          <span className="loading-label mono">Mapping the universe</span>
        </div>
      )}
      <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav">
          <a className="brand" href="#home" data-testid="link-brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><span>4E</span></span>
            <span>4ETHR</span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                href={`#${item.id}`}
                key={item.id}
                data-testid={`link-nav-${item.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="theme-button"
              type="button"
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              data-testid="button-theme"
              onClick={() => setDarkMode((value) => !value)}
            >
              {darkMode ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
            </button>
            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              data-testid="button-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="home" data-testid="section-home">
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker eyebrow reveal">NESCOE Hackathon 2026 / Team portfolio</div>
            <h1 className="display reveal delay-1">4<em>ETHR</em></h1>
            <p className="hero-subtitle reveal delay-2">
              {tagline} A creative technology team making space for
              sharper questions, better systems, and work that feels unmistakably ours.
            </p>
            <p className="hero-teamline mono reveal delay-2">Tanvi Tapase × Sharanya Mestry × Yash Kharat</p>
            <div className="hero-cta-row reveal delay-3">
              <button className="button-primary" type="button" data-testid="button-explore" onClick={() => scrollToSection('projects')}>
                Explore the work <ArrowDown size={15} />
              </button>
              <a className="button-quiet" href="#contact" data-testid="link-contact-hero">
                Start a conversation <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract diagram representing a shared digital universe">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <span className="orbit-node node-a" />
            <span className="orbit-node node-b" />
            <span className="orbit-node node-c" />
            <span className="hero-coordinate mono">18° 31′ N / 73° 51′ E</span>
          </div>
        </div>
        <div className="scroll-mark mono"><span /> scroll to map the universe</div>
      </section>

      <section className="section" id="about" data-testid="section-about">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">01 / The premise</div>
              <h2 className="display">Not a collection.<br /><em> A constellation.</em></h2>
            </div>
            <p>
              4ETHR is a shared space for three distinct ways of thinking. We are still writing the
              specifics; this page is the frame for the work, the people, and the ideas to come.
            </p>
          </div>
          <div className="about-layout">
            <p className="about-lede">
              The strongest work happens in the <strong>overlap</strong> — where a question meets a
              different lens, and a rough thought becomes something the whole team can stand behind.
            </p>
            <div className="about-notes">
              <div className="note">
                <span>Our signal</span>
                <p>A serious creative technology team with room for experimentation and a point of view.</p>
              </div>
              <div className="note">
                <span>Our method</span>
                <p>Make the idea legible. Share the rough version. Stay curious long enough to find the better one.</p>
              </div>
              <div className="note">
                <span>Editable note</span>
                <p>Add the team’s shared principles, origin story, or a short statement about what 4ETHR wants to change.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="team" data-testid="section-team">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">02 / The people</div>
              <h2 className="display">Different<br /><em>frequencies.</em></h2>
            </div>
            <p>Three names, three lenses, one shared practice. Replace the placeholders below with the details that make each person unmistakable.</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <article
                className={`member-card ${selectedMember === index ? 'selected' : ''}`}
                data-initials={member.initials}
                key={member.name}
                data-testid={`card-member-${index}`}
                role="button"
                tabIndex={0}
                aria-pressed={selectedMember === index}
                onClick={() => setSelectedMember(selectedMember === index ? null : index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedMember(selectedMember === index ? null : index);
                  }
                }}
              >
                <div className="member-top">
                  <span className="member-number">0{index + 1}</span>
                  <span className={`member-portrait ${member.image ? 'has-image' : ''}`} aria-label={`${member.name} avatar placeholder`}>
                    {member.image ? <img src={member.image} alt={`${member.name} portrait`} /> : member.initials}
                  </span>
                </div>
                {member.visual && (
                  <div className="member-visual" aria-label={`${member.visualLabel} for ${member.name}`}>
                    <img src={member.visual} alt={member.visualAlt} loading="lazy" />
                    <span className="member-visual-note mono">{member.visualLabel}</span>
                  </div>
                )}
                <div className="member-mid" aria-hidden="true">
                  <span className="member-mid-label mono">Member node / 0{index + 1}</span>
                </div>
                <div className="member-bottom">
                  <h3>{member.name}</h3>
                  <div className="member-role">{member.role}</div>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-skills" aria-label={`${member.name} skills`}>
                    {member.skills.map((skill, skillIndex) => <span key={`${skill}-${skillIndex}`}>{skill}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects" data-testid="section-projects">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">03 / The work</div>
              <h2 className="display">Signals in<br /><em>progress.</em></h2>
            </div>
            <p>A living index of what 4ETHR is exploring. Project names, links, and details are intentionally editable until the team is ready to publish them.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.number} data-testid={`row-project-${project.number}`}>
                <span className="project-number">{project.number}</span>
                <div className="project-visual" aria-label={project.image ? project.imageAlt : `${project.name} visual placeholder`}>
                  {project.image ? <img src={project.image} alt={project.imageAlt} loading="lazy" /> : <span className="mono">Visual to add</span>}
                </div>
                <div className="project-main">
                  <div className="project-heading">
                    <span className="project-title display">{project.name}</span>
                    <div className="project-links">
                      {project.github ? <a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a> : <span>GitHub link to add</span>}
                      {project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live link <ArrowUpRight size={13} /></a> : <span>Live link to add</span>}
                    </div>
                  </div>
                  <p className="project-details">{project.details}</p>
                  <div className="project-tech mono">{project.technologies.join(' / ')}</div>
                  <span className="project-status mono">{project.status}</span>
                </div>
                <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
              </article>
            ))}
          </div>
          <p className="project-note mono">Project links / case studies / repository URLs — add when ready.</p>
        </div>
      </section>

      <section className="section section-alt" id="skills" data-testid="section-skills">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">04 / The toolkit</div>
              <h2 className="display">Built from<br /><em>curiosity.</em></h2>
            </div>
            <p>Tools are only useful when they serve the thought. Complete this editable list with the skills and technologies the team actually brings.</p>
          </div>
          <div className="skills-layout">
            <div className="skills-intro">
              <h3 className="display">The stack is<br />a conversation.</h3>
              <p>Design, code, research, and whatever the next question needs. No fixed lane; a shared commitment to making it work.</p>
            </div>
            <div>
              <div className="skill-cloud">
                {skills.map((skill, index) => <span className="skill-tag" key={`${skill}-${index}`} data-testid={`tag-skill-${index}`}>{skill}</span>)}
              </div>
              <div className="skill-footnote mono">Add software, methods, disciplines, and strengths here.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact" data-testid="section-contact">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">05 / Open channel</div>
              <h2 className="display">Let’s build<br /><em>something.</em></h2>
            </div>
            <p>Have a question, an unfinished idea, or a problem worth sitting with? Send a note. This form is a frontend-only contact surface for now.</p>
          </div>
          <div className="contact-layout">
            <div className="contact-copy">
              <h3 className="display">The door is<br /><em>open.</em></h3>
              <p>Add the team’s preferred email, social links, or availability here when those details are ready.</p>
              <div className="social-links" aria-label="4ETHR contact links">
                {socialLinks.map((link) => (
                  link.href
                    ? <a className="social-link" key={link.label} href={link.href} target="_blank" rel="noreferrer"><span>{link.label}</span><span>{link.value}</span><ArrowUpRight size={13} /></a>
                    : <span className="social-link is-placeholder" key={link.label}><span>{link.label}</span><span>{link.value}</span></span>
                ))}
              </div>
            </div>
            {submitted ? (
              <div className="success-message" data-testid="status-contact-success">
                <strong><Check size={17} style={{ verticalAlign: 'middle', marginRight: 8 }} />Message staged.</strong>
                Thanks, {form.name}. This demo does not send email yet, but the form is ready for a future endpoint.
                <br /><br />
                <button className="button-quiet" type="button" data-testid="button-send-another" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}>
                  Send another <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate data-testid="form-contact">
                <div className="field-grid">
                  <div className="field">
                    <label htmlFor="contact-name">Your name</label>
                    <input id="contact-name" type="text" placeholder="Name" value={form.name} onChange={(event) => updateField('name', event.target.value)} data-testid="input-contact-name" />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="contact-email">Your email</label>
                    <input id="contact-email" type="email" placeholder="name@domain.com" value={form.email} onChange={(event) => updateField('email', event.target.value)} data-testid="input-contact-email" />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="contact-message">The thought</label>
                  <textarea id="contact-message" placeholder="What are you thinking about?" value={form.message} onChange={(event) => updateField('message', event.target.value)} data-testid="input-contact-message" />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>
                <div className="form-bottom">
                  <span className="form-note">No backend attached.<br />Nothing leaves this browser.</span>
                  <button className="button-primary" type="submit" disabled={!formIsValid && Object.keys(errors).length > 0} data-testid="button-contact-submit">
                    Send the signal <ArrowUpRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <small>© 2026 4ETHR / NESCOE Hackathon</small>
          <span className="footer-mark">THREE MINDS / ONE UNIVERSE</span>
          <a href="#home" className="footer-mark" data-testid="link-back-top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}

export default App;