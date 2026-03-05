import { useState, useEffect, useRef } from 'react';



const fullText = "WEB 3  ENTHUSIAST AND A  FULLSTACK WEB DEVELOPER";

 function TypewriterHero() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (displayed.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1));
      }, 60); // speed in ms per character
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [displayed]);

  // Re-insert line breaks visually
  const formattedText = displayed
    .replace("WEB 3 ", "WEB 3 \n")
    .replace("ENTHUSIAST AND A ", "ENTHUSIAST AND A \n");

  return (
    <p id="leading" style={{ whiteSpace: "pre-line" }}>
      {formattedText}
      {done && <span className="dot" />}
      {!done && <span className="cursor">|</span>}
    </p>
  );
}

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const portfolioRefs = useRef([]);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
   const action = form.getAttribute('action') || '/';

  // build plain object from form fields
    const data = Object.fromEntries(new FormData(form).entries());

 // optional simple validation
   if (!data.name || !data.email || !data.message) {
    console.warn('Please fill all fields');
     return;
  }

  try {
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      // success — reset form or show a message
      form.reset();
      console.log('Contact submitted', data);
      alert('Message sent successfully');
    } catch (err) {
      console.error('Contact submit error', err);
   }
 };



  
  // smooth-scroll handler for desktop nav links (prevents instant jump)
  const handleDesktopNavClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    // account for a fixed header so section doesn't hide under it
    const header = document.querySelector('.headerContainer');
    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12; // small gap
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    portfolioRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      portfolioRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="homePage-Container">
      <header className="headerContainer">
        <h1>SOLARCODES</h1>

        <div className='sideBar-nav'>
           <img 
          src="/menu.png" 
          alt="open menu"  
          className="openMenu-btn"
          onClick={openMenu}
        />

        <div className={`menuContainer ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-container">
            <div className="closeContainer">
              <img 
                src="/icon-close.svg"
                alt="close menu"
                onClick={closeMenu} /></div>
             <li className="nav-list"><a href="/#welcome">Home</a></li>
            <li className="nav-list"><a href="/#About-Me">About me</a></li>
            <li className="nav-list"><a href="">Blogs</a></li>
            <li className="nav-list"><a href="/#Experience">Experience</a></li>
            <div><a href="/#contact" id="nav-contact"><button>Contact</button></a></div>
          </ul>
        </div> 
        </div>
            <div className="desktopMenu-container">
             <ul className="desktopNav-container">
            <li><a href="/#welcome" onClick={(e) => handleDesktopNavClick(e, 'welcome')}>HOME</a></li>
           <li><a href="/#About-Me" onClick={(e) => handleDesktopNavClick(e, 'About-Me')}>ABOUT</a></li>
            <li><a href="/#blogs" onClick={(e) => handleDesktopNavClick(e, 'blogs')}>BLOGS</a></li>
           <li><a href="/#Experience" onClick={(e) => handleDesktopNavClick(e, 'Experience')}>EXPERIENCE</a></li>
            <li><a href="/#contact" id="desktopNav-contact" onClick={(e) => handleDesktopNavClick(e, 'contact')}><button>CONTACT</button></a></li>
          </ul>
            </div>
      </header>
      
      <section id="welcome"  className="grid">
        <div>
          <span>I'm a</span>
          <TypewriterHero />
        </div>
        <div className="btn-container">
          <a href="/#portfolio" onClick={(e) => handleDesktopNavClick(e, 'portfolio')} className="portfolio-btn Btn-one">PORTFOLIO</a>
        <a href="/tech-resume.pdf" className="resume-btn Btn-two" download>RESUME</a>
        </div>
      </section>
      <section id="About-Me">
        <div  className='aboutMe-imageContainer'>
          <div className='empty'></div>
          <div className='aboutMe-imageDiv'><img src="/my_image_two.jpeg" alt="" /></div>
        </div>
        <div  className='aboutMe-noteContainer'>
          <h2>About me</h2>
          <p>I am a Full Stack Developer and Web3 Engineer who builds scalable, production ready web and decentralized applications. I translate Figma designs into responsive, pixel accurate interfaces and implement robust backend services, APIs, and databases using modern frameworks. I develop and integrate smart contracts, wallet connections, and on chain data into user friendly interfaces using tools such as Next.js, React, TypeScript, Node.js, Solidity, and ethers.js. I focus on clean architecture, performance, security, and delivering high quality solutions with real world impact.</p>
          <a href="/#contact"  onClick={(e) => handleDesktopNavClick(e, 'contact')} className="hireMe-Btn Btn-one">HIRE ME</a>
        </div>  
      </section>
      <section id="portfolio">
        <h2>PORTFOLIO</h2>
        <p>SOME OF MY AWESOME PROJECTS</p>
        <div className='portfolioSection-divContainer' ref={(el) => portfolioRefs.current[0] = el}>
        <div  className='portfolioSection-imageContainer'> 
          <div className='portfolioSection-imageFrame'></div> 
          <div  className='portfolioSection-imageDiv'>
            <img src="/soundnerd.jpg" alt="" />
          </div>
          </div>  
        
        <div  className='portfolioSection-noteContainer'>
            <h3  className="portfolioSection-header"> PROJECT <span>01</span></h3>  
           <h4 className="project-name" >Solarman Ecommerce Website</h4>
           <p  className="project-note">This project is a small e commerce web application built with Node.js and Express, using server rendered EJS views and a simple MVC structure. It features clean backend organization with separate routes, controllers, models, and database configuration. Core functionality includes product browsing, product details and reviews, shopping cart and wishlist management, user authentication, and a multi step checkout process. The application also supports order tracking and serves static assets efficiently, demonstrating practical implementation of real world e commerce workflows and maintainable Express application design.</p> 
            <div className="projectTools-container">
              <div><img src="/java-script.png" alt="" /></div>
              <div><img src="/nodejs.png" alt="" /></div>
              <div><img src="/git.png" alt="" /></div>
             </div>
             <div className="portfolioSection-buttonContainer">
               <a href="https://e-commerce-website-3dut.onrender.com"  className="livePreview-Btn Btn-one">LIVE PREVIEW</a>
               <a href="https://github.com/SOLARMAN-png/E-Commerce-website"  className="viewCode-Btn Btn-two">VIEW CODE</a>
             </div>     
        </div> 
        </div>
       <div  className='portfolioSection-divContainer' ref={(el) => portfolioRefs.current[1] = el}>
        <div  className='portfolioSection-imageContainer'> 
          <div className='portfolioSection-imageFrame'></div> 
          <div  className='portfolioSection-imageDiv'>
            <img src="/soundnerd.jpg" alt="" />
          </div>
          </div>
        <div className='portfolioSection-noteContainer'>
           <h3  className="portfolioSection-header"> PROJECT <span>02</span></h3>
        <h4 className="project-name" >Soundnerd</h4>
         <p  className="project-note">Soundnerd is a modern e-commerce platform for premium headphones, earphones, speakers, and audio accessories. I focused on solving real-world challenges such as creating a seamless shopping experience, optimizing performance, and ensuring responsive design. The project features intuitive navigation, reusable UI components, and a clean layout that helps users explore and compare products with ease.</p>   
            <div className="projectTools-container">
              <div><img src="/java-script.png" alt="" /></div>
              <div><img src="/react.ico" alt="" /></div>
              <div><img src="/css-3.png" alt="" /></div>
             </div>
             <div className="portfolioSection-buttonContainer">
               <a href="https://soundnerd-peach.vercel.app/"  className="livePreview-Btn Btn-one">LIVE PREVIEW</a>
               <a href="https://github.com/SOLARMAN-png/soundnerd-peach"  className="viewCode-Btn Btn-two">VIEW CODE</a>
             </div>
        </div>
        </div>
        <div  className='portfolioSection-divContainer' ref={(el) => portfolioRefs.current[2] = el}>
        <div  className='portfolioSection-imageContainer'> 
          <div className='portfolioSection-imageFrame'></div>
          <div  className='portfolioSection-imageDiv'>
            <img src="/projectOne_img.jpg" alt="" />
          </div>
          </div>
        <div  className='portfolioSection-noteContainer'>
          <h3  className="portfolioSection-header"> PROJECT <span>03</span></h3>
        <h4 className="project-name" >Solar-blog</h4> 
         <p  className="project-note">This project is a compact blog platform built with Node.js and Express, using EJS for server-side rendering and a file-based SQLite database for persistence. It supports user registration, authentication, profile creation and editing, and CRUD operations for blog posts, including file uploads stored in a public uploads directory. The codebase separates concerns across routes, controllers, and models, and provides templates and partials for consistent UI. Static assets live in a public folder and configuration is centralized in a DB module. Designed for simplicity and clarity, the application is suitable for learning and small deployments while remaining extensible for additional features.</p>  
           <div className="projectTools-container">
              <div><img src="/java-script.png" alt="" /></div>
              <div><img src="/nodejs.png" alt="" /></div>
              <div><img src="/git.png" alt="" /></div>
             </div>
             <div className="portfolioSection-buttonContainer">
               <a href="https://solar-blogs.onrender.com/"  className="livePreview-Btn Btn-one">LIVE PREVIEW</a>
               <a href="https://github.com/SOLARMAN-png/solar-blogs"  className="viewCode-Btn Btn-two">VIEW CODE</a>
             </div>
             </div>     
        </div>
           <div  className='portfolioSection-divContainer' ref={(el) => portfolioRefs.current[3] = el}>
        <div  className='portfolioSection-imageContainer'> 
          <div className='portfolioSection-imageFrame'></div> 
          <div  className='portfolioSection-imageDiv'>
            <img src="/projectOne_img.jpg" alt="" />
          </div>
          </div>
        <div className='portfolioSection-noteContainer'>
           <h3  className="portfolioSection-header"> PROJECT <span>04</span></h3>
        <h4 className="project-name" >JobFinder Website</h4>
        <p  className="project-note">Job Finder Website is a responsive React single page application that simulates a lightweight job marketplace and onboarding experience. It uses local JSON data and client side routing to power job search, job details, company profiles, and career content. The app includes multi step onboarding, job posting interfaces, and account management flows such as login and password recovery. The project highlights solid front end fundamentals including component composition, form handling, state driven navigation, and user centered flow design.</p> 
            <div className="projectTools-container">
              <div><img src="/java-script.png" alt="" /></div>
              <div><img src="/nodejs.png" alt="" /></div>
              <div><img src="/git.png" alt="" /></div>
             </div>
             <div className="portfolioSection-buttonContainer">
               <a href="https://job-finder-app-qbc2.vercel.app/"  className="livePreview-Btn Btn-one">LIVE PREVIEW</a>
               <a href=""  className="viewCode-Btn Btn-two">VIEW CODE</a>
             </div>
        </div>
        </div>
      </section>
      <section id="Experience">
        <h2>EXPERIENCE</h2>
        <p>Main Technology Stacks</p>
        <ul class="grid">
        <li>
          <img src="/java-script.png" alt="JavaScript" />
          <h4 className="language">JavaScript</h4>
        </li>
        <li>
          <img src="/react.ico" alt="React.js" />
          <h4  className="language">React.js</h4>
        </li>
        <li>
          <img src="/html.png" alt="HTML" />
          <h4   className="language">HTML</h4>
        </li>
        <li>
          <img src="/css-3.png" alt="CSS" />
          <h4  className="language">CSS</h4>
        </li>
        <li>
          <img src="/git.png" alt="Git" />
          <h4 className="language">Git</h4>
        </li>
        <li>
          <img src="/github.png" alt="GitHub" />
          <h4  className="language">GitHub</h4>
        </li>
        <li>
          <img src="/nodejs.png" alt="Node.js" />
          <h4   className="language">Node.js</h4>
        </li>
        <li>
          <img src="/access.png" alt="MongoDB" />
          <h4  className="language">Mongodb</h4>
        </li>
        <li>
          <img src="/nextjs-icon.png" alt="next" />
          <h4 className="language">Nextjs</h4>
        </li>
        <li>
          <img src="/tailwind-icon.png" alt="Tailwind CSS" />
          <h4  className="language">Tailwind Css</h4>
        </li>
        <li>
          <img src="/typescript-icon.png" alt="Typescript" />
          <h4   className="language">Typescript</h4>
        </li>
        <li>
          <img src="/css-3.png" alt="CSS" />
          <h4  className="language">CSS</h4>
        </li>
      </ul>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla
        lacus diam. Mauris fringilla consectetur nibh, sit amet tempus augue.
      </p>
      </section>
        <section id="contact">
          <h2>CONTACT ME</h2>
          <div  className='contactSection-container'>
            <div  className="contactInfo-container">
          <h3>DROP ME A MESSAGE</h3>
        <p>Have a project in mind? Let's talk.</p>
         <div className='info-container'>
          <div className='Image-container'><img src="/call.png" alt="" /></div>
          <div className='actual-container'><p>+2349038109598</p></div>
         </div>
          <div className='info-container'>
            <div className='Image-container'><img src="/email.png" alt="" /></div>
            <div className='actual-container'><p className='actualContainer-text'>sanusitaiwo123@gmail.com</p></div>
         </div>
          <div className='info-container'> 
            <div className='Image-container'><img src="/location.png" alt="" /></div>
            <div className='actual-container'><p>Remote</p></div>
         </div>
        </div>  
        <div className='contactForm-container'>
          <form className='contactForm' action="https://formspree.io/f/xpqajnon" method="post" onSubmit={handleContactSubmit}>
           <input name="name" type="text" placeholder="Name" />
           <input name="email" type="email" placeholder="Email" />
           <textarea name="message" placeholder="MESSAGE"></textarea>
            <div><button className='button' type='submit'>send</button></div>
          </form>
        </div>
       </div>
        
    
         <footer className='footer-section'>
          <h3>Solarcodes</h3>
          <p>2025 solarcodes. All right reserved</p>
          <div  className='footer-socials'>
            <a href="https://www.instagram.com/solarman_png"><div><img src="/icon-instagram.svg" alt="" className='footerSocial-icon'/></div></a>
            <a href="https://x.com/sanusiT37489537"><div><img src="/x.png" alt="" className='footerSocial-icon'/></div></a>
            <a href="https://github.com/SOLARMAN-png"><div><img src="/github-2.png" alt="" className='footerSocial-icon'/></div></a>
            <a href="https://www.linkedin.com/in/taiwo-sanusi"><div><img src="/linkedIn.png" alt="" className='footerSocial-icon'/></div></a>
          </div>
         </footer>
      </section> 
    </div>
       
        
  );
};

export default HomePage;
