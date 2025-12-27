import { useState, useEffect, useRef } from 'react';

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
      <header className="headerContainer grid">
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
        <span>I'm a</span>
        <p  className="leading">WEB 3 <br /> ENGINEER AND A FULLSTACK DEVELOPER <span className='dot'></span> </p>
        <div className="btn-container">
          <a href="/#portfolio" onClick={(e) => handleDesktopNavClick(e, 'portfolio')} className="portfolio-btn Btn-one">PORTFOLIO</a>
        <a href=""  className="resume-btn Btn-two">RESUME</a>
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
        <p>Some of my awesome projects</p>
        <div className='portfolioSection-divContainer' ref={(el) => portfolioRefs.current[0] = el}>
        <div  className='portfolioSection-imageContainer'> 
          <div className='portfolioSection-imageFrame'></div> 
          <div  className='portfolioSection-imageDiv'>
            <img src="/projectOne_img.jpg" alt="" />
          </div>
          </div>  
        
        <div  className='portfolioSection-noteContainer'>
            <h3  className="portfolioSection-header"> PROJECT <span>01</span></h3>  
           <h4 className="project-name" >Solarman Ecommerce Website</h4>
           <p  className="project-note">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto quasi molestiae amet deleniti veritatis, a dolorem doloremque, nam hic fugit nobis dicta voluptatem ipsam, tempore incidunt pariatur. Recusandae voluptates veniam voluptate sit magnam praesentium iure sint, quia minima maiores numquam, distinctio earum quas aperiam totam soluta autem tempore adipisci? Optio?</p> 
            <div className="projectTools-container">
              <div><img src="/java-script.png" alt="" /></div>
              <div><img src="/nodejs.png" alt="" /></div>
              <div><img src="/git.png" alt="" /></div>
             </div>
             <div className="portfolioSection-buttonContainer">
               <a href="https://e-commerce-website-3dut.onrender.com"  className="livePreview-Btn Btn-one">LIVE PREVIEW</a>
               <a href=""  className="viewCode-Btn Btn-two">VIEW CODE</a>
             </div>     
        </div> 
        </div>
       <div  className='portfolioSection-divContainer' ref={(el) => portfolioRefs.current[1] = el}>
        <div  className='portfolioSection-imageContainer'> 
          <div className='portfolioSection-imageFrame'></div> 
          <div  className='portfolioSection-imageDiv'>
            <img src="/projectOne_img.jpg" alt="" />
          </div>
          </div>
        <div className='portfolioSection-noteContainer'>
           <h3  className="portfolioSection-header"> PROJECT <span>02</span></h3>
        <h4 className="project-name" >Solarman JobFinder Website</h4>
        <p  className="project-note">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto quasi molestiae amet deleniti veritatis, a dolorem doloremque, nam hic fugit nobis dicta voluptatem ipsam, tempore incidunt pariatur. Recusandae voluptates veniam voluptate sit magnam praesentium iure sint, quia minima maiores numquam, distinctio earum quas aperiam totam soluta autem tempore adipisci? Optio?</p> 
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
        <div  className='portfolioSection-divContainer' ref={(el) => portfolioRefs.current[2] = el}>
        <div  className='portfolioSection-imageContainer'> 
          <div className='portfolioSection-imageFrame'></div>
          <div  className='portfolioSection-imageDiv'>
            <img src="/projectOne_img.jpg" alt="" />
          </div>
          </div>
        <div  className='portfolioSection-noteContainer'>
          <h3  className="portfolioSection-header"> PROJECT <span>03</span></h3>
        <h4 className="project-name" >Solarman Recipe Website</h4>
         <p  className="project-note">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto quasi molestiae amet deleniti veritatis, a dolorem doloremque, nam hic fugit nobis dicta voluptatem ipsam, tempore incidunt pariatur. Recusandae voluptates veniam voluptate sit magnam praesentium iure sint, quia minima maiores numquam, distinctio earum quas aperiam totam soluta autem tempore adipisci? Optio?</p>  
           <div className="projectTools-container">
              <div><img src="/java-script.png" alt="" /></div>
              <div><img src="/nodejs.png" alt="" /></div>
              <div><img src="/git.png" alt="" /></div>
             </div>
             <div className="portfolioSection-buttonContainer">
               <a href=""  className="livePreview-Btn Btn-one">LIVE PREVIEW</a>
               <a href=""  className="viewCode-Btn Btn-two">VIEW CODE</a>
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
        <h4 className="project-name" >Solarman JobFinder Website</h4>
        <p  className="project-note">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto quasi molestiae amet deleniti veritatis, a dolorem doloremque, nam hic fugit nobis dicta voluptatem ipsam, tempore incidunt pariatur. Recusandae voluptates veniam voluptate sit magnam praesentium iure sint, quia minima maiores numquam, distinctio earum quas aperiam totam soluta autem tempore adipisci? Optio?</p> 
            <div className="projectTools-container">
              <div><img src="/java-script.png" alt="" /></div>
              <div><img src="/nodejs.png" alt="" /></div>
              <div><img src="/git.png" alt="" /></div>
             </div>
             <div className="portfolioSection-buttonContainer">
               <a href=""  className="livePreview-Btn Btn-one">LIVE PREVIEW</a>
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
          <img src="/java-script.png" alt="comet" />
          <h4 className="language">JavaScript</h4>
        </li>
        <li>
          <img src="/react.ico" alt="comet" />
          <h4  className="language">React.js</h4>
        </li>
        <li>
          <img src="/html.png" alt="comet" />
          <h4   className="language">HTML</h4>
        </li>
        <li>
          <img src="/css-3.png" alt="comet" />
          <h4  className="language">CSS</h4>
        </li>
        <li>
          <img src="/git.png" alt="comet" />
          <h4 className="language">Git</h4>
        </li>
        <li>
          <img src="/github.png" alt="comet" />
          <h4  className="language">GitHub</h4>
        </li>
        <li>
          <img src="/nodejs.png" alt="comet" />
          <h4   className="language">Node.js</h4>
        </li>
        <li>
          <img src="/access.png" alt="comet" />
          <h4  className="language">Mongodb</h4>
        </li>
        <li>
          <img src="/nextjs-icon.png" alt="comet" />
          <h4 className="language">Nextjs</h4>
        </li>
        <li>
          <img src="/tailwind-icon.png" alt="comet" />
          <h4  className="language">Tailwind Css</h4>
        </li>
        <li>
          <img src="/typescript-icon.png" alt="comet" />
          <h4   className="language">Typescript</h4>
        </li>
        <li>
          <img src="/css-3.png" alt="comet" />
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
