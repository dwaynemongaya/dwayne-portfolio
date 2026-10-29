import { profile, skills, projects, experience, certifications, education } from './content.mjs';

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const paths = {
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>',
  data: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  tools: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M7 9l3 2-3 2m5 0h4"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="m8 12-2 9 6-3 6 3-2-9"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
const external = (url, label, cls = 'text-link') => `<a class="${cls}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}${icon('arrow')}<span class="sr-only"> (opens in a new tab)</span></a>`;
const heading = (number, label, title, description = '') => `<div class="section-heading"><div><p class="eyebrow"><span class="section-number">${number}</span> ${label}</p><h2>${title}</h2></div>${description ? `<p class="section-description">${description}</p>` : ''}</div>`;
const nav = [ ['profile', 'Profile'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['certifications', 'Certifications'], ['education', 'Education'], ['contact', 'Contact'] ];

export function render() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#F8F8F8">
  <meta name="description" content="${escape(profile.name)} — graduating Computer Science student specializing in Data Science at FEU Institute of Technology. Explore projects, experience, and skills.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(profile.name)} | Computer Science &amp; Data Science">
  <meta property="og:description" content="${escape(profile.introduction)}">
  <title>${escape(profile.name)} | Computer Science &amp; Data Science</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
  <script src="/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="wordmark" href="#profile" aria-label="Dwayne Mongaya, back to profile">dm<span>.</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">${icon('menu')}<span>Menu</span></button>
      <nav id="main-nav" aria-label="Main navigation">${nav.map(([id, text]) => `<a href="#${id}">${text}</a>`).join('')}</nav>
    </div>
  </header>
  <main id="main">
    <section id="profile" class="hero container" aria-labelledby="profile-title">
      <div class="hero-main">
        <p class="availability"><span class="status-dot"></span> Seeking internship opportunities</p>
        <p class="eyebrow hero-eyebrow">Hello, I’m</p>
        <h1 id="profile-title">${escape(profile.firstLine)}<br>${escape(profile.secondLine)}<span class="name-dot">.</span></h1>
        <p class="hero-role">Computer Science student<span aria-hidden="true"> / </span><strong>${escape(profile.specialization)}</strong></p>
        <p class="hero-intro">${escape(profile.introduction)}</p>
        <div class="hero-actions"><a class="button button-dark" href="#projects">Explore my work ${icon('arrow')}</a></div>
        <p class="location">${icon('pin')} ${escape(profile.location)}</p>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="art-top"><span>THE INTERSECTION OF</span><span class="art-plus">+</span></div>
        <div class="orbit-art"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><span class="orbit-node node-one"></span><span class="orbit-node node-two"></span><span class="orbit-node node-three"></span><div class="art-monogram">dm<span>.</span></div><span class="art-tag tag-one">&lt;/&gt; &nbsp; Code</span><span class="art-tag tag-two">↗ &nbsp; Data</span></div>
        <div class="art-bottom"><p>Curiosity.<br>Code. <span>Possibility.</span></p><span class="art-caption">COMPUTER SCIENCE<br>× DATA SCIENCE</span></div>
      </div>
      <div class="hero-foot"><span>Learning by doing. Building with purpose.</span><a href="#skills">Get to know me <span aria-hidden="true">↓</span></a></div>
    </section>

    <section id="skills" class="section container" aria-labelledby="skills-title">
      ${heading('01', 'Skills', '<span id="skills-title">My technical toolkit<span class="title-dot">.</span></span>', 'Tools and technologies from my academic work and project experience.')}
      <div class="skills-grid">${skills.map(skill => `<article class="skill-card"><div class="skill-icon">${icon(skill.icon)}</div><h3>${escape(skill.title)}</h3><ul class="skill-tags">${skill.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul></article>`).join('')}</div>
    </section>

    <section id="projects" class="section project-section" aria-labelledby="projects-title"><div class="container">
      ${heading('02', 'Projects', '<span id="projects-title">Putting ideas into practice<span class="title-dot">.</span></span>')}
      ${projects.map(project => `<article class="project-card"><div class="project-visual"><a class="poster-link" href="${escape(project.image)}" target="_blank" rel="noopener noreferrer" aria-label="View the full original ${escape(project.name)} poster (opens in a new tab)"><img src="${escape(project.image)}" width="${project.imageWidth}" height="${project.imageHeight}" alt="${escape(project.imageAlt)}" loading="lazy" decoding="async"></a><a class="poster-caption" href="${escape(project.image)}" target="_blank" rel="noopener noreferrer">View full poster ${icon('arrow')}<span class="sr-only"> (opens in a new tab)</span></a></div>
      <div class="project-content"><p class="eyebrow">Featured project <span class="tiny-line"></span> ${escape(project.category)}</p><h3>${escape(project.name)}<span class="title-dot">.</span></h3><p class="project-purpose">${escape(project.purpose)}</p><p class="body-copy">${escape(project.description)}</p><div class="project-detail"><h4>Our team’s work</h4><p>${escape(project.teamOutcome)}</p></div><div class="project-detail"><h4>My contributions</h4><ul class="contribution-list">${project.contributions.map(point => `<li>${escape(point)}</li>`).join('')}</ul></div><div class="project-detail"><h4>Tools &amp; deployment</h4><ul class="tool-tags">${project.technologies.map(tech => `<li>${escape(tech)}</li>`).join('')}</ul></div><div class="project-links">${project.url ? external(project.url, 'Visit JobPath', 'button button-dark') : ''}${project.github ? external(project.github, 'View on GitHub') : ''}</div></div></article>`).join('')}
    </div></section>

    <section id="experience" class="section container" aria-labelledby="experience-title">
      ${heading('03', 'Experience', '<span id="experience-title">Learning through experience<span class="title-dot">.</span></span>')}
      <div class="experience-list">${experience.map(job => `<article class="experience-row"><div class="experience-meta"><p class="date">${escape(job.date)}</p><span class="experience-location">${escape(job.location)}</span></div><div class="experience-content"><h3>${escape(job.role)}</h3><p class="organization">${escape(job.organization)}</p><ul class="contribution-list">${job.points.map(point => `<li>${escape(point)}</li>`).join('')}</ul></div></article>`).join('')}</div>
    </section>

    <section id="certifications" class="section container" aria-labelledby="certifications-title">
      ${heading('04', 'Certifications', '<span id="certifications-title">Continuing to grow<span class="title-dot">.</span></span>', 'Training and certifications that support my technical foundation.')}
      <div class="certification-grid">${certifications.map(cert => `<article class="certification-card">${icon('award')}<div><span class="cert-year">${escape(cert.year)}</span><h3>${escape(cert.name)}</h3>${cert.url ? external(cert.url, 'View certificate') : ''}</div></article>`).join('')}</div>
    </section>

    <section id="education" class="section container" aria-labelledby="education-title">
      ${heading('05', 'Educational background', '<span id="education-title">Where it all comes together<span class="title-dot">.</span></span>')}
      <article class="education-card"><div class="education-mark" aria-hidden="true">FEU<span>TECH</span></div><div class="education-details"><p class="eyebrow">${escape(education.date)}</p><h3>${escape(education.school)}</h3><p class="degree">${escape(education.degree)}</p><p>${escape(education.specialization)}</p></div></article>
    </section>

    <section id="contact" class="contact-section" aria-labelledby="contact-title"><div class="container contact-inner"><div class="contact-main"><p class="eyebrow"><span class="section-number">06</span> Contact</p><h2 id="contact-title">Let’s build<br><span>what’s next.</span></h2><p>${escape(profile.goal)}</p><a class="button button-light" href="mailto:${escape(profile.email)}">Let’s get in touch ${icon('arrow')}</a></div><div class="contact-details"><p class="contact-label">SAY HELLO</p><a class="contact-email" href="mailto:${escape(profile.email)}">${escape(profile.email)} ${icon('arrow')}</a><div class="contact-facts"><div><span>Based in</span><p>${escape(profile.location)}</p></div><div><span>Phone</span><a href="tel:${escape(profile.phone)}">${escape(profile.phone)}</a></div></div>${profile.github || profile.linkedin ? `<div class="social-links">${profile.github ? external(profile.github, 'GitHub') : ''}${profile.linkedin ? external(profile.linkedin, 'LinkedIn') : ''}</div>` : ''}<p class="contact-note"><span class="status-dot"></span> Open to learning. Ready to contribute.</p></div></div></section>
  </main>
  <footer class="site-footer container"><a class="wordmark" href="#profile" aria-label="Back to Dwayne’s profile">dm<span>.</span></a><p>${escape(profile.name)}<span>Computer Science · Data Science</span></p><a href="#profile" class="back-top">Back to top <span aria-hidden="true">↑</span></a></footer>
</body>
</html>`;
}
