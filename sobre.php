<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site 3D Scroll Effect</title>
    <style>
        * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  overflow-x: hidden;
}

.scroll-container {
  height: 600vh; /* Altura total para permitir scroll */
  position: relative;
}

.viewport {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  perspective: 1000px;
  overflow: hidden;
  background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%);
}

.viewport::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(10, 10, 10, 0.2) 30%, rgba(10, 10, 10, 0.6) 60%, rgba(10, 10, 10, 0.9) 80%, #0a0a0a 100%);
  z-index: 1001;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.hero-text-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  pointer-events: none;
  mask: linear-gradient(90deg, black 0%, black 70%, transparent 100%);
  -webkit-mask: linear-gradient(90deg, black 0%, black 70%, transparent 100%);
  transition: mask 0.1s ease-out, -webkit-mask 0.1s ease-out;
}

.viewport.show-shadow::after {
  opacity: 1;
}

.content-section {
  position: absolute;
  width: 80%;
  max-width: 1200px;
  height: 80vh;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.section-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.section-2 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.section-3 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.section-4 {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.section-5 {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
}

h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.tech-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 255, 255, 0.1);
}

.scroll-indicator {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  z-index: 1000;
  text-align: center;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.scroll-indicator.hidden {
  opacity: 0;
}

.scroll-arrow {
  animation: bounce 2s infinite;
  margin-top: 10px;
  font-size: 1.2rem;
}

/* CORREÇÃO: @keyframes bounce corrigido */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
      opacity: 1;
  }
  40% {
      transform: translateY(-10px);
      opacity: 0.8;
  }
  60% {
      transform: translateY(-5px);
      opacity: 0.9;
  }
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe, #43e97b);
  z-index: 1001;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

/* Barra lateral de navegação */
.sidebar-nav {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 100vh;
  transform: translateY(100vh) translateZ(-300px) rotateX(-30deg);
  z-index: 1002;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(26, 26, 46, 0.8) 100%);
  backdrop-filter: blur(15px);
  padding: 40px 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 2px 0 30px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: bottom center;
}

.sidebar-nav.visible {
  opacity: 1;
  transform: translateY(0) translateZ(0px) rotateX(0deg);
}

/* Ajuste do conteúdo principal para não sobrepor */
.viewport {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  perspective: 1000px;
  overflow: hidden;
  background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%);
  transition: margin-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.viewport.with-sidebar {
  margin-left: 200px;
  width: calc(100vw - 200px);
}

.hero-text-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  pointer-events: none;
  mask: linear-gradient(90deg, black 0%, black 70%, transparent 100%);
  -webkit-mask: linear-gradient(90deg, black 0%, black 70%, transparent 100%);
  transition: margin-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), mask 0.1s ease-out, -webkit-mask 0.1s ease-out;
}

.hero-text-container.with-sidebar {
  margin-left: 200px;
  width: calc(100vw - 200px);
}

.nav-link {
  display: block;
  padding: 15px 25px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 140px;
  transform: translateY(30px) scale(0.8);
  opacity: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-nav.visible .nav-link {
  transform: translateY(0px) scale(1);
  opacity: 1;
}

.sidebar-nav.visible .nav-link:nth-child(1) { transition-delay: 0.2s; }
.sidebar-nav.visible .nav-link:nth-child(2) { transition-delay: 0.3s; }
.sidebar-nav.visible .nav-link:nth-child(3) { transition-delay: 0.4s; }
.sidebar-nav.visible .nav-link:nth-child(4) { transition-delay: 0.5s; }
.sidebar-nav.visible .nav-link:nth-child(5) { transition-delay: 0.6s; }

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(102, 126, 234, 0.3);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  border-color: rgba(102, 126, 234, 0.5);
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.5);
  border-color: #667eea;
}

/* Ajuste da barra de progresso */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe, #43e97b);
  z-index: 1003;
  transition: width 0.1s ease, margin-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.progress-bar.with-sidebar {
  margin-left: 200px;
  width: calc(var(--progress, 0%) * (100vw - 200px) / 100vw);
}

/* Efeitos de partículas */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float 6s infinite linear;
}

@keyframes float {
  0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 1;
  }
  100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
  }
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8rem;
  font-weight: 900;
  pointer-events: none;
  white-space: nowrap;
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
  text-shadow: 0 0 50px rgba(102, 126, 234, 0.5);
  letter-spacing: 0.1em;
  transition: transform 0.1s ease-out;
}

@keyframes gradientShift {
  0%, 100% {
      background-position: 0% 50%;
  }
  50% {
      background-position: 100% 50%;
  }
}

/* === SEÇÃO DO PORTFÓLIO - AJUSTADA === */
.portfolio-container {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Área de visualização do carrossel */
.portfolio-banner {
  width: 100%;
  height: 300px;
  text-align: center;
  overflow: visible;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Configurações do carrossel 3D */
.portfolio-slider {
  position: relative;
  width: 200px;
  height: 125px;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(-9deg);
  transition: 1s;
}

/* Cada item (projeto) do carrossel */
.portfolio-slider .item {
  position: absolute;
  inset: 0;
  transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(250px);
  transform-style: preserve-3d;
  border-radius: 1rem;
  overflow: hidden;
}

.portfolio-slider .item:hover {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
}

/* Cards dos projetos - AJUSTADOS */
.skill-card {
  width: 200px;
  height: 125px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.skill-card:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.5);
}

.skill-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
}

.skill-card p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
  line-height: 1.3;
}

/* Faces do carrossel */
.portfolio-slider .front,
.portfolio-slider .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 1rem;
  overflow: hidden;
}

.portfolio-slider .back {
  transform: rotateY(180deg);
  background: rgba(0, 0, 0, 0.8);
}

/* Instrução de navegação */
.navigation-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin: 1rem 0;
}

/* Botões de navegação do carrossel */
.navigation-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-nav {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.btn-nav:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
}

.btn-nav:active {
  transform: translateY(0);
}

/* Responsividade melhorada */
@media (max-width: 768px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  p { font-size: 1rem; }
  .hero-text { font-size: 4rem; }
  .content-section {
      width: 95%;
      height: 70vh;
      padding: 20px;
  }
  .tech-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
  }
  .sidebar-nav {
      width: 150px;
  }
  .viewport.with-sidebar {
      margin-left: 150px;
      width: calc(100vw - 150px);
  }
  .hero-text-container.with-sidebar {
      margin-left: 150px;
      width: calc(100vw - 150px);
  }
  .progress-bar.with-sidebar {
      margin-left: 150px;
  }
  .nav-link {
      padding: 12px 15px;
      font-size: 0.9rem;
      width: 110px;
  }
  
  .portfolio-banner {
      height: 250px;
  }
  
  .portfolio-slider,
  .skill-card {
      width: 160px;
      height: 100px;
  }
  
  .skill-card h4 {
      font-size: 1rem;
  }
  
  .skill-card p {
      font-size: 0.8rem;
  }
  
  .navigation-buttons {
      gap: 15px;
  }
  
  .btn-nav {
      padding: 10px 18px;
      font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-text { font-size: 3rem; }
  .sidebar-nav {
      width: 120px;
      padding: 30px 15px;
  }
  .viewport.with-sidebar {
      margin-left: 120px;
      width: calc(100vw - 120px);
  }
  .hero-text-container.with-sidebar {
      margin-left: 120px;
      width: calc(100vw - 120px);
  }
  .progress-bar.with-sidebar {
      margin-left: 120px;
  }
  .nav-link {
      padding: 10px 12px;
      font-size: 0.8rem;
      width: 90px;
  }
  
  .portfolio-slider,
  .skill-card {
      width: 140px;
      height: 90px;
  }
  
  .navigation-buttons {
      flex-direction: column;
      gap: 10px;
  }
  
  .btn-nav {
      padding: 8px 16px;
      font-size: 0.8rem;
  }
}
    </style>
</head>
<body>
    <div class="progress-bar" id="progressBar"></div>
    
    <div class="hero-text-container" id="heroContainer">
        <div class="hero-text" id="heroText">I am Leonardo!</div>
    </div>
    
    <!-- Barra lateral de navegação -->
    <div class="sidebar-nav" id="sidebarNav">
        <a href="#exemplo1" class="nav-link" target="_blank">Start</a>
        <a href="#exemplo2" class="nav-link" target="_blank">Skills</a>
        <a href="#exemplo3" class="nav-link" target="_blank">About me</a>
        <a href="#exemplo4" class="nav-link" target="_blank">Projects</a>
        <a href="#exemplo5" class="nav-link" target="_blank">Contact</a>
    </div>
    
    <div class="particles" id="particles"></div>
    
    <div class="scroll-container">
        <div class="viewport">
            <div class="content-section section-1" data-section="0">
                <h1>Welcome to my Portfólio.</h1>
                <p>I am a FullStack Software Engineer.</p>
            </div>
            
            <div class="content-section section-2" data-section="1">
                <h2>Skills</h2>
                <h3>Programming Languages</h3>
                <div class="tech-grid">
                    <div class="tech-card">
                        <h3>HTML5</h3>
                        <p>Semantic structure.</p>
                    </div>
                    <div class="tech-card">
                        <h3>CSS3</h3>
                        <p>Fluid animations.</p>
                    </div>
                    <div class="tech-card">
                        <h3>JavaScript</h3>
                        <p>Dynamic interactivity.</p>
                    </div>
                    <div class="tech-card">
                        <h3>Ruby</h3>
                        <p>full-stack framework</p>
                    </div>
                </div>
            </div>
            
            <div class="content-section section-3" data-section="2">
                <h2>About Me!</h2>
                <p>A dedicated and hard-working person, always looking to improve my skills to be a good professional, quick to learn new skills and very focused, I am very sociable and spare no effort to achieve my goals.</p>
            </div>
            
            <!-- Seção de portfólio ajustada -->
            <div class="content-section section-4" data-section="3">
                <div class="portfolio-container">
                    <h2>Latest <span style="color: #43e97b;">Projects</span></h2>
                    
                    <!-- Carrossel 3D de projetos -->
                    <div class="portfolio-banner">
                        <div class="portfolio-slider" style="--quantity: 4">
                            <!-- Projeto 1 -->
                            <div class="item" style="--position: 1">
                                <div class="front">
                                    <div class="skill-card">
                                        <h4>E-commerce</h4>
                                        <p>Loja online completa com Ruby on Rails</p>
                                    </div>
                                </div>
                                <div class="back"></div>
                            </div>
                            
                            <!-- Projeto 2 -->
                            <div class="item" style="--position: 2">
                                <div class="front">
                                    <div class="skill-card">
                                        <h4>Task Manager</h4>
                                        <p>App de gerenciamento com JavaScript</p>
                                    </div>
                                </div>
                                <div class="back"></div>
                            </div>
                            
                            <!-- Projeto 3 -->
                            <div class="item" style="--position: 3">
                                <div class="front">
                                    <div class="skill-card">
                                        <h4>Portfolio Site</h4>
                                        <p>Site responsivo com HTML5 e CSS3</p>
                                    </div>
                                </div>
                                <div class="back"></div>
                            </div>
                            
                            <!-- Projeto 4 -->
                            <div class="item" style="--position: 4">
                                <div class="front">
                                    <div class="skill-card">
                                        <h4>API REST</h4>
                                        <p>Backend robusto com autenticação</p>
                                    </div>
                                </div>
                                <div class="back"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Instrução de navegação -->
                    <div class="navigation-text">
                        Click nos botões para navegar ou utilize as teclas A e D.
                    </div>
                    
                    <!-- Botões de navegação do carrossel -->
                    <div class="navigation-buttons">
                        <button class="btn-nav" id="fotoAnterior">
                            ← Anterior
                        </button>
                        <button class="btn-nav" id="proximaFoto">
                            Próximo →
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="content-section section-5" data-section="4">
                <h2>Contato.</h2>
                <p>Cada scroll revela uma nova dimensão, criando uma narrativa visual que mantém o usuário envolvido do início ao fim.</p>
            </div>
        </div>
    </div>
    
    <div class="scroll-indicator" id="scrollIndicator">
        <div>Role para explorar</div>
        <div class="scroll-arrow">↓</div>
    </div>

    <script>
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
      
      this.updateSections();
  }
  
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

// Classe para controlar o carrossel 3D
class PortfolioCarousel {
    constructor() {
        this.slider = document.querySelector(".portfolio-slider");
        this.btnNext = document.querySelector("#proximaFoto");
        this.btnPrev = document.querySelector("#fotoAnterior");
        this.rotateDeg = 0;
        
        this.init();
    }
    
    init() {
        if (this.btnNext && this.btnPrev) {
            this.btnNext.addEventListener('click', () => this.rotateNext());
            this.btnPrev.addEventListener('click', () => this.rotatePrev());
        }
        
        // Controle por teclado
        document.addEventListener("keypress", (e) => {
            if (e.key === "d") {
                this.rotateNext();
            }
            if (e.key === "a") {
                this.rotatePrev();
            }
        });
    }
    
    rotateNext() {
        this.rotateDeg -= 90;
        this.updateTransform();
    }
    
    rotatePrev() {
        this.rotateDeg += 90;
        this.updateTransform();
    }
    
    updateTransform() {
        if (this.slider) {
            this.slider.style.transform = `perspective(1000px) rotateX(-9deg) rotateY(${this.rotateDeg}deg)`;
        }
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ScrollEffect3D();
    new PortfolioCarousel();
});

// Desativa o scroll suave do navegador para melhor controle
document.documentElement.style.scrollBehavior = 'auto';