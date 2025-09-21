class ScrollEffect3D {
  constructor() {
      this.sections = document.querySelectorAll('.content-section');
      this.heroText = document.getElementById('heroText');
      this.heroContainer = document.getElementById('heroContainer');
      this.viewport = document.querySelector('.viewport');
      this.sidebarNav = document.getElementById('sidebarNav');
      this.navLinks = document.querySelectorAll('.nav-link');
      this.scrollIndicator = document.getElementById('scrollIndicator');
      this.totalSections = this.sections.length;
      this.currentSection = 0;
      this.scrollProgress = 0;
      this.isScrolling = false;
      this.scrollTimeout = null;
      
      this.init();
      this.createParticles();
  }
  
  init() {
      window.addEventListener('scroll', this.handleScroll.bind(this));
      window.addEventListener('resize', this.handleResize.bind(this));
      
      // Remove os eventos de clique da navegação, pois agora são links externos
      this.updateSections();
  }
  
  // Remove a função scrollToSection pois não é mais necessária
  
  updateNavigation() {
      this.navLinks.forEach((link, index) => {
          link.classList.toggle('active', index === this.currentSection);
      });
  }
  
  handleScroll() {
      this.isScrolling = true;
      
      clearTimeout(this.scrollTimeout);
      
      const scrollTop = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = scrollTop / scrollHeight;
      
      // Atualiza a barra de progresso
      const progressBar = document.getElementById('progressBar');
      progressBar.style.width = (this.scrollProgress * 100) + '%';
      progressBar.style.setProperty('--progress', this.scrollProgress * 100);
      
      // Controla o indicador de scroll
      if (this.scrollProgress > 0.1) {
          this.scrollIndicator.classList.add('hidden');
      } else {
          this.scrollIndicator.classList.remove('hidden');
      }
      
      this.updateHeroText();
      
      const heroProgress = 0.3;
      
      if (this.scrollProgress > heroProgress) {
          const sectionsProgress = (this.scrollProgress - heroProgress) / (1 - heroProgress);
          const sectionProgress = sectionsProgress * this.totalSections;
          const newCurrentSection = Math.min(Math.floor(sectionProgress), this.totalSections - 1);
          
          if (newCurrentSection !== this.currentSection) {
              this.currentSection = newCurrentSection;
              this.updateNavigation();
          }
          
          const sectionOffset = sectionProgress - this.currentSection;
          this.updateSections(sectionOffset);
      } else {
          if (this.currentSection !== 0) {
              this.currentSection = 0;
              this.updateNavigation();
          }
          this.hideAllSections();
      }
      
      this.scrollTimeout = setTimeout(() => {
          this.isScrolling = false;
      }, 150);
  }
  
  updateHeroText() {
      const heroExitPoint = 0.3;
      
      if (this.scrollProgress < heroExitPoint) {
          const progress = this.scrollProgress / heroExitPoint;
          const translateX = -50 + (80 * progress);
          const maskEnd = Math.max(50, 100 - (progress * 50));
          const maskStart = Math.max(30, 70 - (progress * 40));
          
          this.heroText.style.transform = `translate(${translateX}%, -50%)`;
          this.heroContainer.style.mask = `linear-gradient(90deg, black 0%, black ${maskStart}%, transparent ${maskEnd}%)`;
          this.heroContainer.style.webkitMask = `linear-gradient(90deg, black 0%, black ${maskStart}%, transparent ${maskEnd}%)`;
          this.heroContainer.style.opacity = 1;
          
          // Esconde a barra lateral enquanto o hero está ativo
          this.sidebarNav.classList.remove('visible');
          this.viewport.classList.remove('with-sidebar');
          this.heroContainer.classList.remove('with-sidebar');
          document.getElementById('progressBar').classList.remove('with-sidebar');
          
          if (this.isScrolling) {
              this.heroText.style.transition = 'none';
              this.heroContainer.style.transition = 'none';
          } else {
              this.heroText.style.transition = 'transform 0.1s ease-out';
              this.heroContainer.style.transition = 'mask 0.1s ease-out, -webkit-mask 0.1s ease-out';
          }
      } else {
          // Texto hero completamente fora - mostra a barra lateral
          this.heroContainer.style.opacity = 0;
          
          // Mostra a barra lateral com animação de baixo para cima
          setTimeout(() => {
              this.sidebarNav.classList.add('visible');
              this.viewport.classList.add('with-sidebar');
              this.heroContainer.classList.add('with-sidebar');
              document.getElementById('progressBar').classList.add('with-sidebar');
              
              // Atualiza a variável CSS para a barra de progresso
              const progressBar = document.getElementById('progressBar');
              progressBar.style.setProperty('--progress', (this.scrollProgress * 100) + '%');
          }, 100); // Pequeno delay para suavizar a transição
      }
  }
  
  hideAllSections() {
      this.sections.forEach(section => {
          section.style.opacity = 0;
          section.style.transform = `
              translate(-50%, -50%) 
              translateZ(-1000px) 
              scale(0.1) 
              rotateX(60deg)
          `;
      });
  }
  
  updateSections(offset = 0) {
      this.sections.forEach((section, index) => {
          let scale, translateZ, rotateX, opacity;
          
          if (index === this.currentSection) {
              if (offset < 0.3) {
                  const progress = offset / 0.3;
                  scale = 0.1 + (0.9 * progress);
                  translateZ = -800 + (800 * progress);
                  rotateX = 45 - (45 * progress);
                  opacity = progress;
              } else if (offset >= 0.3 && offset <= 0.6) {
                  scale = 1;
                  translateZ = 0;
                  rotateX = 0;
                  opacity = 1;
              } else {
                  const progress = (offset - 0.6) / 0.4;
                  scale = 1 + (2 * progress);
                  translateZ = 0 + (500 * progress);
                  rotateX = 0 - (30 * progress);
                  opacity = 1 - progress;
              }
          } else if (index === this.currentSection + 1) {
              scale = 0.1;
              translateZ = -800;
              rotateX = 45;
              opacity = 0;
          } else if (index < this.currentSection) {
              scale = 3;
              translateZ = 800;
              rotateX = -30;
              opacity = 0;
          } else {
              scale = 0.1;
              translateZ = -1000;
              rotateX = 60;
              opacity = 0;
          }
          
          const transition = this.isScrolling ? 'none' : 'all 0.3s ease-out';
          
          section.style.transition = transition;
          section.style.transform = `
              translate(-50%, -50%) 
              translateZ(${translateZ}px) 
              scale(${scale}) 
              rotateX(${rotateX}deg)
          `;
          section.style.opacity = opacity;
          section.style.zIndex = this.totalSections - Math.abs(index - this.currentSection);
      });
  }
  
  createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particlesCount = 50;
      
      for (let i = 0; i < particlesCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 6 + 's';
          particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
          particlesContainer.appendChild(particle);
      }
  }
  
  handleResize() {
      this.updateSections();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ScrollEffect3D();
});

document.documentElement.style.scrollBehavior = 'auto';
/*============================= botào navegação portfolio =========================*/

const btnProx = document.querySelector(".btnProxFt");
const btnAnte = document.querySelector(".btnAnteFt");
const slider = document.querySelector(".portfolio-slider");

let rotateDeg = 0;
btnAnte.addEventListener('click', () => {
rotateDeg = rotateDeg + 90;
slider.style.transform = 'perspective(1000px) rotateX(-9deg) rotateY('+rotateDeg+'deg)';
});
btnProx.addEventListener('click', () => {
rotateDeg = rotateDeg - 90;
slider.style.transform = 'perspective(1000px) rotateX(-9deg) rotateY('+rotateDeg+'deg)';
});

/*========================== acionamento por teclado ==============================*/
document.addEventListener("keypress", function (e) {

if(e.key === "d") {

const btn2 = document.querySelector("#proximaFoto");

btn2.click();
}
if(e.key === "a") {

const btn1 = document.querySelector("#fotoAnterior");

btn1.click();
}
});

/*========================== animacao da pagina botao navegacao ==============================*/
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Remove ativo de todos
                navLinks.forEach(l => l.classList.remove('active'));
                // Adiciona ativo no clicado
                this.classList.add('active');
                
                // Calcula posição CORRETA para seu sistema 3D
                const sectionIndex = Array.from(document.querySelectorAll('.content-section')).indexOf(targetElement);
                let scrollPercent;
                
                // Posições específicas para cada seção
                switch(sectionIndex) {
                    case 0: scrollPercent = 0.35; break;  // Start
                    case 1: scrollPercent = 0.49; break;  // Skills  
                    case 2: scrollPercent = 0.65; break;  // About
                    case 3: scrollPercent = 0.80; break;  // Projects
                    case 4: scrollPercent = 0.93; break;  // Contact
                    default: scrollPercent = 0.35;
                }
                
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const targetScroll = scrollPercent * scrollHeight;
                
                // Scroll suave
                // ANIMAÇÃO SUAVE CUSTOMIZADA:
                smoothScrollTo(targetScroll);

                function smoothScrollTo(targetPosition) {
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1500; // 1.5 segundos - mais suave
                    let startTime = null;
                    
                    // Função de easing suave (ease-in-out-cubic)
                    function easeInOutCubic(t) {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    }
                    
                    function animation(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        const easedProgress = easeInOutCubic(progress);
                        const currentPosition = startPosition + (distance * easedProgress);
                        
                        window.scrollTo(0, currentPosition);
                        
                        if (progress < 1) {
                            requestAnimationFrame(animation);
                        }
                    }
                    
                    requestAnimationFrame(animation);
                };
            }
        });
    });
});