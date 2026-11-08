import { renderToStaticMarkup } from 'react-dom/server'

const email = 'helppdfcompressor@gmail.com'
const play = 'https://play.google.com/store/apps/details?id=com.pdfcompressorex.mobileapp'
const subscriptions = 'https://play.google.com/store/account/subscriptions'
const googlePrivacy = 'https://policies.google.com/privacy'
const githubPrivacy = 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement'
const updated = 'November 8, 2026'

const routes = {
  home: { path: '', title: 'PDF Compressor for Android', description: 'Reduce PDF file size on Android. Compress multiple PDFs, adjust compression strength, and save smaller copies to Downloads.' },
  features: { path: 'features/', title: 'Features', description: 'Explore batch PDF compression, adjustable strength, target file sizes, previews, and automatic saving on Android.' },
  faq: { path: 'faq/', title: 'Frequently asked questions', description: 'Get help with compressing PDFs, target file sizes, saved copies, and Google Play subscriptions.' },
  privacy: { path: 'privacy-policy/', title: 'Privacy Policy', description: 'Learn how PDF Compressor for Android handles documents, local app data, Google Play Billing, and support messages.' },
  terms: { path: 'terms/', title: 'Terms of Use', description: 'Read the terms for using the PDF Compressor Android app and support website.' },
  contact: { path: 'contact/', title: 'Contact Us', description: 'Contact PDF Compressor support for questions about compression, saved PDFs, subscriptions, and privacy.' },
}

const iconPaths = {
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  external: <><path d="M7 17 17 7M7 7h10v10" /></>,
  file: <><path d="M7 3h7l4 4v14H6V3h1Zm7 0v5h4M9 12h6m-6 4h6" /></>,
  stack: <><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5" /></>,
  sliders: <><path d="M4 7h5m4 0h7M4 17h9m4 0h3" /><circle cx="11" cy="7" r="2" /><circle cx="15" cy="17" r="2" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  folder: <path d="M3 6h6l2 3h10v10H3z" />,
  lock: <><rect x="6" y="10" width="12" height="10" rx="2" /><path d="M9 10V7a3 3 0 0 1 6 0v3m-3 4v2" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" /><circle cx="12" cy="12" r="2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  moon: <path d="M21 13.1A9 9 0 0 1 10.9 3 9 9 0 1 0 21 13.1Z" />,
  minus: <path d="M6 12h12" />,
  plus: <path d="M6 12h12m-6-6v12" />,
  check: <path d="m5 12 4 4L19 6" />,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></>,
  spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /></>,
}

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>
}

function Brand({ href, asset }) {
  return <a className="brand" href={href('home')}>
    <img src={asset('app-icon.png')} width="38" height="38" alt="" />
    <span>PDF Compressor</span>
  </a>
}

function PlayLink() {
  return <a className="play-badge" href={play} aria-label="Get PDF Compressor on Google Play">
    <svg viewBox="0 0 32 36" fill="none" aria-hidden="true"><path d="M1 2 18 18 1 34Z" fill="#41D0CD" /><path d="m1 2 21 12-4 4Z" fill="#57D883" /><path d="m18 18 4 4L1 34Z" fill="#F66E75" /><path d="m22 14 8 4-8 4-4-4Z" fill="#FFCF61" /></svg>
    <span><small>GET IT ON</small><strong>Google Play</strong></span>
  </a>
}

function Layout({ page, root, publicUrl, children }) {
  const route = routes[page]
  const href = (key) => root + routes[key].path
  const asset = (file) => root + 'assets/' + file
  const pageUrl = publicUrl && new URL(route.path, publicUrl).href
  const title = page === 'home' ? route.title : route.title + ' | PDF Compressor'
  return <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#f8f7f3" />
      <title>{title}</title>
      <meta name="description" content={route.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={route.description} />
      {pageUrl && <link rel="canonical" href={pageUrl} />}
      {pageUrl && <meta property="og:url" content={pageUrl} />}
      {publicUrl && <meta property="og:image" content={new URL('assets/app-icon.png', publicUrl).href} />}
      <link rel="icon" type="image/png" href={asset('app-icon.png')} />
      <link rel="stylesheet" href={root + 'site.css'} />
      <script src={root + 'site.js'} defer="" />
    </head>
    <body>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <div className="wrap header-row">
          <Brand href={href} asset={asset} />
          <nav className="nav" aria-label="Main navigation">
            {['features', 'faq', 'contact'].map((key) =>
              <a key={key} href={href(key)} aria-current={page === key ? 'page' : undefined}>
                {key === 'faq' ? 'FAQ' : key === 'contact' ? 'Contact' : routes[key].title}
              </a>)}
          </nav>
          <a className="header-play" href={href('home') + '#download'}>Get the app <Icon name="external" /></a>
        </div>
      </header>
      <main id="main" tabIndex="-1">{children({ href, asset })}</main>
      <footer className="footer">
        <div className="wrap footer-main">
          <div><Brand href={href} asset={asset} /><p>A little less file.<br />A lot more possibility.</p></div>
          <nav aria-label="Explore"><span>Explore</span><a href={href('home')}>Home</a><a href={href('features')}>Features</a><a href={href('home') + '#download'}>Download for Android</a></nav>
          <nav aria-label="Support"><span>Here to help</span><a href={href('faq')}>FAQs</a><a href={href('contact')}>Contact support</a><a href={'mailto:' + email}>Email us <Icon name="external" /></a></nav>
          <nav aria-label="Legal"><span>The details</span><a href={href('privacy')}>Privacy Policy</a><a href={href('terms')}>Terms of Use</a></nav>
        </div>
        <div className="wrap footer-bottom"><p>© 2026 PDF Compressor</p><p>Made for your everyday PDFs. <span className="footer-dot">✳</span></p></div>
      </footer>
    </body>
  </html>
}

function PageIntro({ label, title, description }) {
  return <section className="page-intro">
    <span className="eyebrow">{label}</span>
    <h1>{title}</h1>
    <p>{description}</p>
  </section>
}

function AppPreview({ asset }) {
  return <figure className="app-scene">
    <div className="scene-orbit orbit-one" /><div className="scene-orbit orbit-two" />
    <div className="floating-file"><div className="pdf-symbol"><Icon name="file" /></div><span>Big attachment?<strong>Let’s make it smaller.</strong></span><Icon name="spark" /></div>
    <div className="phone">
      <div className="phone-status"><span>9:41</span><div className="phone-camera" /><span>••• ▰</span></div>
      <div className="phone-brand"><img src={asset('app-icon.png')} width="30" height="30" alt="" /><strong>PDF Compressor</strong><span>•••</span></div>
      <div className="phone-body">
        <span className="phone-kicker">LESS SIZE. MORE POSSIBILITIES.</span><h2>Ready to<br />lighten things up?</h2>
        <div className="preview-document"><div className="pdf-symbol"><Icon name="file" /></div><div><strong>Design proposal.pdf</strong><span>PDF document · 8.4 MB</span></div><span className="selected-check"><Icon name="check" /></span></div>
        <div className="demo-setting"><div><label htmlFor="demo-strength">Compression strength</label><output id="demo-strength-value" htmlFor="demo-strength">65%</output></div><input id="demo-strength" type="range" min="1" max="100" defaultValue="65" aria-describedby="demo-disclaimer" /><div className="range-labels"><span>More detail</span><span>Smaller file</span></div></div>
        <div className="demo-result"><span className="result-check"><Icon name="check" /></span><span>Small file. Big difference.<strong>8.4 MB <Icon name="arrow" /> <output id="demo-size" htmlFor="demo-strength">1.9 MB</output></strong></span><span className="saving" id="demo-saving">−77%</span></div>
        <a className="phone-cta" href={play}><Icon name="download" /> Get the Android app</a>
        <p className="demo-disclaimer" id="demo-disclaimer">Interactive illustration. Actual results vary by PDF and settings.</p>
      </div>
      <div className="phone-tabs"><span className="active"><Icon name="sliders" />Compress</span><span><Icon name="folder" />Files</span><span><Icon name="check" />Saved</span></div>
      <div className="phone-home" />
    </div>
    <div className="floating-privacy"><span><Icon name="lock" /></span><div><strong>Your files stay yours.</strong><small>Compression happens on your device.</small></div></div>
    <figcaption>Meet your lighter document workflow.</figcaption>
  </figure>
}

const features = [
  { icon: 'stack', title: 'Compress in batches', text: 'Select one PDF or add several to a batch. Apply the same settings to each file, then review the results individually.' },
  { icon: 'sliders', title: 'Control compression strength', text: 'Slide from 1 to 100 to balance image detail and file size. Lower settings favor detail, while higher settings aim for a smaller file.' },
  { icon: 'target', title: 'Set a target file size', text: 'Enter a limit in KB or MB. The app chooses compression settings and shows whether the result reached your target.' },
  { icon: 'eye', title: 'Preview before you share', text: 'Open PDFs in the built-in preview and zoom in to check pages. Remove individual PDFs from your selection before compressing.' },
  { icon: 'folder', title: 'Save and share copies', text: 'Compressed copies go to Downloads → PDF Compressor. Find them in Saved, preview them, or open them in another app. Originals stay intact.' },
  { icon: 'moon', title: 'Choose your appearance', text: 'Use light mode, dark mode, or the Android system setting. Find appearance options and the app version in Settings.' },
]

function FeatureCard({ icon, title, text }) {
  return <article className="feature-card">
    <div className="icon-tile"><Icon name={icon} /></div>
    <h3>{title}</h3>
    <p>{text}</p>
  </article>
}

function DownloadSection({ asset }) {
  return <section id="download" className="wrap download-section" aria-labelledby="download-title">
    <div className="download-copy"><span className="eyebrow">GOOD THINGS COME IN SMALLER FILES</span><h2 id="download-title">Less waiting.<br />More sending.</h2><p>Take PDF Compressor with you. Get the Android app and make your next attachment a little lighter.</p><PlayLink /><span className="download-note">Start with 3 free successful compressions.</span></div>
    <div className="qr-panel"><div className="qr-heading"><img src={asset('app-icon.png')} width="44" height="44" alt="" /><span><strong>PDF Compressor</strong><small>Your next smaller PDF starts here.</small></span></div><a className="qr-link" href={play} aria-label="Open PDF Compressor on Google Play"><img className="play-qr" src={asset('google-play-qr.svg')} width="204" height="204" alt="QR code for PDF Compressor on Google Play" loading="lazy" /></a><strong>Scan. Download. Compress.</strong><p>Point your phone’s camera at the QR code.</p><a className="text-link" href={play}>Open in Google Play <Icon name="external" /></a></div>
  </section>
}

function QuestionList({ items = questions }) {
  return <div className="faq-list">{items.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus"><Icon name="plus" /></span><span className="faq-minus"><Icon name="minus" /></span></summary><p>{answer}</p></details>)}</div>
}

function Home({ href, asset }) {
  return <>
    <section className="wrap hero">
      <div className="hero-content">
        <span className="hero-pill"><span className="status-dot" /> A lighter way to PDF <span>FOR ANDROID</span></span>
        <h1>Big ideas.<br /><em>Smaller PDFs.</em><span className="hero-spark">✳</span></h1>
        <p>Keep the document. Lose the extra weight. Compress your PDFs on Android and get back to sharing what matters.</p>
        <div className="button-row">
          <PlayLink />
          <a className="hero-secondary" href="#how-it-works">See how it works <Icon name="arrow" /></a>
        </div>
        <div className="hero-notes"><span><Icon name="check" /> On-device compression</span><span><Icon name="check" /> Originals stay intact</span></div>
      </div>
      <AppPreview asset={asset} />
    </section>
    <section className="benefit-strip" aria-label="Built for everyday sharing"><div className="wrap"><span>SMALLER FILES.<br /><strong>FEWER ROADBLOCKS.</strong></span><p><Icon name="mail" /> Email attachments</p><p><Icon name="file" /> Online applications</p><p><Icon name="stack" /> Work & study</p><p><Icon name="folder" /> Everyday sharing</p></div></section>
    <section className="home-features">
      <div className="wrap">
        <div className="section-heading">
          <div><span className="eyebrow">A SMALL APP. A BIG HELP.</span><h2>Everything you need.<br /><span>Less of what you don’t.</span></h2></div>
          <a className="text-link" href={href('features')}>See all features <Icon name="arrow" /></a>
        </div>
        <div className="feature-bento">
          <article className="batch-feature"><div><span className="icon-tile"><Icon name="stack" /></span><h3>One PDF? A whole batch?<br />You’re all set.</h3><p>Select several documents, choose your settings once, and review each result. A little less repeat work.</p></div><div className="batch-stack" aria-hidden="true">{['Project brief.pdf', 'Lecture notes.pdf', 'Application.pdf'].map((name, i) => <div key={name}><span className="pdf-mini">PDF</span><span>{name}<small>{['Ready to compress', 'Added to your batch', 'Added to your batch'][i]}</small></span><Icon name="check" /></div>)}</div></article>
          <FeatureCard {...features[2]} />
          <article className="privacy-feature"><span className="icon-tile"><Icon name="lock" /></span><div><h3>Personal documents.<br />Personal space.</h3><p>Compression runs on your device. Your PDFs aren’t sent to the developer for processing.</p><a className="text-link" href={href('privacy')}>Our approach to privacy <Icon name="arrow" /></a></div><div className="privacy-art" aria-hidden="true"><Icon name="lock" /></div></article>
          <FeatureCard {...features[3]} />
        </div>
      </div>
    </section>
    <section id="how-it-works" className="wrap how-section"><div className="section-heading"><div><span className="eyebrow">FROM ATTACHMENT TO SENT</span><h2>Three steps.<br />One lighter PDF.</h2></div><p>No complicated workflow.<br />Just choose, compress, and carry on.</p></div><div className="steps">{[
      ['01', 'file', 'Pick your PDFs', 'Choose a document from your files, add a batch, or share a PDF from another app.'],
      ['02', 'sliders', 'Find your balance', 'Adjust compression strength or set a target size in KB or MB. You’re in control.'],
      ['03', 'download', 'Save. Share. Done.', 'Review the result and find your smaller copy in Downloads → PDF Compressor.'],
    ].map(([number, icon, title, text]) => <article key={number}><div className="step-top"><span>{number}</span><Icon name={icon} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <DownloadSection asset={asset} />
    <section className="wrap home-faq"><div><span className="eyebrow">A FEW GOOD QUESTIONS</span><h2>Wondering<br />about something?</h2><p>Let’s clear a few things up.</p><a className="text-link" href={href('faq')}>All questions & answers <Icon name="arrow" /></a></div><QuestionList items={[questions[1], questions[2], questions[4], questions[5]]} /></section>
    <section className="wrap home-support">
      <div className="icon-tile"><Icon name="mail" /></div>
      <div><h2>A little help goes a long way.</h2><p>Have a question about the app? We’re here for you.</p></div>
      <a className="button button-secondary" href={href('contact')}>Get in touch <Icon name="arrow" /></a>
    </section>
  </>
}

function Features({ href }) {
  return <div className="wrap inner-page">
    <PageIntro label="Features" title="Control how your PDFs get smaller."
      description="Pick the files, choose how much to compress, and find the copies in Downloads. The whole compression step happens on your Android device." />
    <section aria-label="Compression and document features" className="card-grid">
      {features.map((feature) => <FeatureCard key={feature.icon} {...feature} />)}
    </section>
    <section className="feature-extra">
      <div className="icon-tile"><Icon name="file" /></div>
      <div><h2>Bring in a PDF from another app</h2>
        <p>Use the Files tab or Android file picker to browse local files and connected storage providers. You can also choose PDF Compressor from another app’s Share menu.</p>
        <p>For further reduction, you can allow page flattening. Flattened pages become images, so text selection, links, and interactive forms are lost in that copy.</p>
        <a className="text-link" href={href('faq')}>Read compression FAQs <Icon name="arrow" /></a>
      </div>
    </section>
  </div>
}

const questions = [
  ['How do I compress a PDF?', 'Open the Compress tab and select one or more PDFs. Adjust the compression strength or enter a target size, then tap Compress. The results show the original and output sizes.'],
  ['Will every file reach my target size?', 'The app tries to meet the target, but achievable sizes depend on the document and settings. Check the result before uploading. If the app finds no smaller version with those settings, it reports that the original is the smallest.'],
  ['Where are my compressed PDFs?', 'Find compressed copies in the Saved tab or in Downloads → PDF Compressor using your Android file manager. The original documents remain in their original locations.'],
  ['What does page flattening do?', 'It converts PDF pages to images and can help reduce file size. Text selection, clickable links, and interactive forms are lost in the flattened copy. Leave flattening off if you need those features.'],
  ['Can I compress several PDFs at once?', 'Yes. Use the file picker or share PDFs from another app. The same compression settings apply to each file, and the results show what happened to each one.'],
  ['How many free compressions are included?', 'The app starts with three free successful compressions. Plan availability depends on the version of the app and your Google Play region.'],
  ['How do I manage a subscription?', <>For purchases made through Google Play, open <a href={subscriptions}>Google Play subscriptions</a> using the Google account that made the purchase. The app also provides a restore option when billing is available.</>],
]

function FAQ({ href }) {
  return <div className="wrap inner-page">
    <PageIntro label="Help center" title="Frequently asked questions"
      description="Answers about choosing settings, finding compressed PDFs, and managing Google Play purchases." />
    <QuestionList />
    <div className="help-link"><a className="text-link" href={href('contact')}>Contact support <Icon name="arrow" /></a></div>
  </div>
}

function LegalPage({ title, intro, sections }) {
  return <div className="wrap inner-page legal-page">
    <PageIntro label={'Last updated · ' + updated} title={title} description={intro} />
    <div className="legal-layout">
      <nav className="contents" aria-label={'On this page: ' + title}>
        <p>On this page</p>
        {sections.map(({ id, heading }) => <a key={id} href={'#' + id}>{heading}</a>)}
      </nav>
      <article className="legal-content">
        {sections.map(({ id, heading, body }) => <section id={id} key={id}><h2>{heading}</h2>{body}</section>)}
      </article>
    </div>
  </div>
}

function Privacy() {
  const sections = [
    { id: 'scope', heading: 'Who this policy covers', body: <p>This policy applies to the PDF Compressor Android app (com.pdfcompressorex.mobileapp) and this support website. The PDF Compressor developer can be reached at <a href={'mailto:' + email}>{email}</a> for privacy questions and requests.</p> },
    { id: 'documents', heading: 'Documents and device access', body: <>
      <p>The app reads the PDF files you choose in the Android file picker, open with the app, or share to it. Depending on your Android version and permissions, the Files screen can also list PDF names and metadata, such as size and location, available through Android’s media library. This helps you find, preview, compress, and save documents.</p>
      <p>Preview and compression run on your device. The developer does not receive your PDFs as part of compression. The app uses temporary working files in its Android app cache and writes smaller copies to Downloads when it saves a result. If you send a document to another app, use a cloud file provider, or share a compressed copy, the recipient or provider handles it under its own policies.</p>
    </> },
    { id: 'local-data', heading: 'App settings and local records', body: <p>The app stores preferences such as appearance and the count of free compressions used on your device. Earlier app versions may also have local compression history, including file names, paths, sizes, and dates. Depending on your Android backup and transfer settings, Android may back up or transfer eligible app data. The app uses Android’s app storage for private settings, cache, and local history.</p> },
    { id: 'billing', heading: 'Google Play and purchases', body: <p>Where billing is available, Google Play handles payment details and processes subscription transactions. The app receives purchase information from Google Play Billing, such as product identifiers, purchase status, and purchase tokens, to verify and restore access. The developer does not receive your card details through the app. See the <a href={googlePrivacy}>Google Privacy Policy</a> for how Google handles its data.</p> },
    { id: 'website-support', heading: 'Website visits and support', body: <>
      <p>This website has no account system, PDF upload, or site analytics. GitHub Pages hosts the site and logs visitors’ IP addresses for security. See the <a href={githubPrivacy}>GitHub General Privacy Statement</a> for details.</p>
      <p>If you email support, we receive your email address, message, and anything you attach. We use this information to respond, troubleshoot, and resolve your request. Our email provider processes these messages. Please avoid sending confidential documents or payment details.</p>
    </> },
    { id: 'retention', heading: 'Retention and deletion', body: <>
      <p>Delete PDFs you no longer need from Downloads using your file manager. Saved PDFs in shared Downloads can remain after app data is cleared or the app is uninstalled. You can clear the app’s cache or data from Android Settings and clear earlier compression history from the app’s Settings where available. Backups may be managed through your Android or backup provider settings.</p>
      <p>Support messages are kept as needed to respond, handle follow-up, and meet applicable obligations. For access, correction, or deletion requests about messages sent to us, email <a href={'mailto:' + email}>{email}</a>. Google and GitHub manage data they collect under their own policies.</p>
    </> },
  ]
  return <LegalPage title="Privacy Policy" intro="How PDF Compressor handles your documents and information when you use the Android app or this website." sections={sections} />
}

function Terms() {
  const sections = [
    { id: 'using-the-app', heading: 'Using PDF Compressor', body: <p>These terms cover the PDF Compressor Android app and this support website. Use the app lawfully and only with documents you own or have permission to process or share. You are responsible for where you send your files.</p> },
    { id: 'results', heading: 'Compression results', body: <p>Results depend on the PDF and selected settings. Some files may stay the same size or exceed your target. Compression can reduce image quality, and page flattening removes features such as selectable text, links, and interactive forms in the output. Keep your originals and review compressed copies before sharing or submitting them.</p> },
    { id: 'subscriptions', heading: 'Free use and subscriptions', body: <p>The app starts with three free successful compressions. Where paid plans are available, Google Play shows the price, billing period, and whether a plan renews before you purchase. Use <a href={subscriptions}>Google Play subscriptions</a> to manage or cancel a purchase. Refund requests are handled through <a href="https://support.google.com/googleplay/answer/2479637">Google Play’s refund process</a> and applicable law. Uninstalling the app does not cancel a subscription.</p> },
    { id: 'availability', heading: 'Availability and consumer rights', body: <p>Features can vary by app version, device, and Google Play region. We may update the app or this website as features and requirements change. These terms do not limit any consumer rights or remedies that cannot be waived under applicable law.</p> },
    { id: 'contact', heading: 'Questions about these terms', body: <p>Contact the PDF Compressor developer at <a href={'mailto:' + email}>{email}</a>.</p> },
  ]
  return <LegalPage title="Terms of Use" intro="Terms for using the PDF Compressor Android app and this website." sections={sections} />
}

function Contact({ href }) {
  return <div className="wrap inner-page">
    <PageIntro label="Support" title="Contact Us" description="Get help with PDF compression, saved files, purchases, or privacy." />
    <div className="contact-grid">
      <section className="contact-card">
        <div className="icon-tile"><Icon name="mail" /></div>
        <h2>Email support</h2>
        <a className="contact-email" href={'mailto:' + email}>{email}</a>
        <p>For an app issue, include your device model, Android version, app version from Settings, and what happened. A short error message or redacted screenshot can help.</p>
        <a className="button button-primary" href={'mailto:' + email + '?subject=PDF%20Compressor%20support'}>Open email app <Icon name="external" /></a>
      </section>
      <section className="contact-card">
        <div className="icon-tile"><Icon name="lock" /></div>
        <h2>Privacy and billing</h2>
        <p>Use the same support email for privacy questions. For billing changes, open Google Play using the account that made the purchase.</p>
        <a className="text-link" href={href('privacy')}>Read the Privacy Policy <Icon name="arrow" /></a>
        <a className="text-link" href={subscriptions}>Manage Google Play subscriptions <Icon name="external" /></a>
      </section>
    </div>
  </div>
}

const pages = { home: Home, features: Features, faq: FAQ, privacy: Privacy, terms: Terms, contact: Contact }

export function renderPages(publicUrl) {
  return Object.entries(pages).map(([page, Page]) => {
    const { path } = routes[page]
    const root = path ? '../' : './'
    const html = renderToStaticMarkup(<Layout page={page} root={root} publicUrl={publicUrl}>
      {(props) => <Page {...props} />}
    </Layout>)
    return { path, html: '<!doctype html>\n' + html + '\n' }
  })
}
