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
        section.classList.remove('visible'); // Remove visibilidade
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
        
        // Remove a classe visible de todas as seções
        section.classList.remove('visible');
        
        if (index === this.currentSection) {
            // Adiciona a classe visible apenas para a seção atual
            section.classList.add('visible');
            
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
});/*========================= Mascara telefone ==================================*/
const identificadorTelefone = (event) => {
    let input = event.target
    input.value = mascaraTelefone(input.value)
  }
  
  const mascaraTelefone = (value) => {
    if (!value) return ""
    value = value
    .replace(/\D/g,'')        // (\D) localiza tudo que não é numero e (g,'') para ser global e substituir por vazil
    .replace(/(\d{2})(\d)/,"($1) $2") 
    .replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

  /*======================== envio ===================================*/
  document.getElementById("form-Contact").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const data = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      assunto: form.assunto.value,
      mensagem: form.mensagem.value,
    };
  
    document.getElementById("loader").style.display = "block";
    document.getElementById("mensagem-status").textContent = "";
  
    try {
      const response = await 
      fetch("https://portfolio01-cyan-six.vercel.app/api/send-email", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      
      if (response.ok && result.success) {
        document.getElementById("mensagem-status").innerHTML = "✅ Message sent successfully!";
        document.getElementById("mensagem-status").style.color = "#4CAF50";
        form.reset();
      } else {
        document.getElementById("mensagem-status").innerHTML = `❌ ${result.message || result.error || 'Error sending message'}`;
        document.getElementById("mensagem-status").style.color = "#f44336";
      }
    } catch (err) {
      console.error("Erro:", err);
      document.getElementById("mensagem-status").innerHTML = "❌ Connection error. Please try again..";
      document.getElementById("mensagem-status").style.color = "#f44336";
    } finally {
      document.getElementById("loader").style.display = "none";
    }
});
  
/*======================== card tempo ===================================*/
const API_KEY = '3205254e7ef1673bd67e7e666abdbf83';


// Função para iniciar a busca
function obterLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        mostrarErro("Geolocation not supported by browser.");
    }
}

// Sucesso ao obter localização
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Busca o tempo atual na API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&lang=en_us&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                mostrarErro(data.message);
                return;
            }

            // Atualiza informações na tela
            document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°F`;
            document.getElementById("weatherDescription").textContent = data.weather[0].description;
            document.getElementById("humidity").textContent = `Humidity ${data.main.humidity}%`;
            document.getElementById("feelsLike").textContent = `${Math.round(data.main.feels_like)}°F`;
            document.getElementById("windSpeed").textContent = `${data.wind.speed} mph`;
            document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;

            // Ícone do tempo (se quiser trocar o ☀️ por ícones reais da API)
            const iconCode = data.weather[0].icon;
            document.getElementById("weatherIcon").innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description}">`;
        
            // 🔹 Depois: Nome mais preciso da localização (bairro + cidade)
         reverseGeocode(lat, lon);
        })
        .catch(() => mostrarErro("Error fetching weather data."));
}

// Erro ao pegar localização
function error() {
    mostrarErro("Unable to get your location.");
}

// Mostra erro no card
function mostrarErro(msg) {
    document.getElementById("errorMessage").textContent = msg;
}
// 🔹 Função para pegar bairro + cidade via OpenStreetMap (Nominatim)
function reverseGeocode(lat, lon) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
        .then(res => res.json())
        .then(data => {
            if (data.address) {
                const bairro = data.address.suburb || data.address.neighbourhood || "";
                const cidade = data.address.city || data.address.town || data.address.village || "";
                document.getElementById("locationName").textContent = `${cidade}`;
            } else {
                document.getElementById("locationName").textContent = "Approximate location";
            }
        })
        .catch(() => {
            document.getElementById("locationName").textContent = "Approximate location";
        });
}

// 🔥 Chama automaticamente ao carregar a página
window.addEventListener("load", obterLocalizacao);
  /*======================== navegação menu projetos ===================================*/
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const list = document.querySelectorAll('.list');

let active = 0;
const total = items.length;
let timer;

function update(direction){
    document.querySelector('.item.active').classList.remove('active');
    if(direction > 0){
        active = (active + 1) % total;
    }else if(direction < 0){
        active = (active - 1 + total) % total;
    }

    items[active].classList.add('active');
}
clearInterval(timer);
timer = setInterval(() => {
    update(1)
}, 5000);

prevButton.addEventListener('click', () => {
    update(-1);
    })
nextButton.addEventListener('click', () => {
    update(1)
    })