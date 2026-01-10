// ============================================
// STARFIELD BACKGROUND WITH ENHANCED EFFECTS
// ============================================
class Starfield {
    constructor() {
        this.container = null;
        this.starCount = 150;
        this.shootingStars = [];
        this.shootingStarInterval = null;
    }
    
    init() {
        // Create stars container if it doesn't exist
        this.container = document.createElement('div');
        this.container.id = 'stars';
        document.body.appendChild(this.container);
        
        this.injectStyles();
        this.createStars();
        this.startShootingStars();
    }
    
    createStars() {
        for (let i = 0; i < this.starCount; i++) {
            this.createStar();
        }
    }
    
    createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random properties for variety
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 0.5; // 0.5-3.5px
        const duration = Math.random() * 5 + 3; // 3-8 seconds
        const opacity = 0.3 + Math.random() * 0.7; // 0.3-1.0
        const brightness = Math.random() * 0.7 + 0.3; // 0.3-1.0
        
        // Random color temperature (white to slightly blue)
        const colorTemp = Math.random() * 0.2; // 0-0.2 for blue shift
        const red = 255;
        const green = 255 - (colorTemp * 100);
        const blue = 255 - (colorTemp * 50);
        
        // Random glow intensity
        const glowIntensity = Math.random() * 15 + 5; // 5-20px
        
        // Unique animation delay for independent twinkling
        const animationDelay = Math.random() * 10; // 0-10 seconds delay
        
        Object.assign(star.style, {
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            position: 'absolute',
            borderRadius: '50%',
            backgroundColor: `rgb(${red}, ${green}, ${blue})`,
            boxShadow: `
                0 0 ${glowIntensity}px ${glowIntensity / 2}px rgba(${red}, ${green}, ${blue}, ${brightness * 0.3}),
                0 0 ${glowIntensity * 2}px ${glowIntensity}px rgba(${red}, ${green}, ${blue}, ${brightness * 0.1})
            `,
            animation: `twinkle ${duration}s ease-in-out infinite`,
            animationDelay: `-${animationDelay}s`,
            filter: `brightness(${brightness})`
        });
        
        // Set CSS custom properties for dynamic updates
        star.dataset.baseOpacity = opacity;
        star.dataset.baseGlow = glowIntensity;
        star.dataset.baseBrightness = brightness;
        
        this.container.appendChild(star);
        
        // Add random independent glowing effect
        this.randomGlowEffect(star);
    }
    
    randomGlowEffect(star) {
        // Each star glows independently at random intervals
        const randomGlow = () => {
            const baseOpacity = parseFloat(star.dataset.baseOpacity);
            const baseGlow = parseFloat(star.dataset.baseGlow);
            const baseBrightness = parseFloat(star.dataset.baseBrightness);
            
            // Random glow pulse
            const pulseIntensity = Math.random() * 1.5 + 0.5; // 0.5-2x multiplier
            const glowDuration = Math.random() * 1000 + 500; // 500-1500ms
            
            // Animate the glow
            star.style.transition = `all ${glowDuration}ms ease-in-out`;
            star.style.opacity = baseOpacity * pulseIntensity;
            star.style.filter = `brightness(${baseBrightness * pulseIntensity})`;
            star.style.boxShadow = `
                0 0 ${baseGlow * pulseIntensity}px ${(baseGlow * pulseIntensity) / 2}px rgba(255, 255, 255, ${baseBrightness * 0.3 * pulseIntensity}),
                0 0 ${baseGlow * 2 * pulseIntensity}px ${baseGlow * pulseIntensity}px rgba(255, 255, 255, ${baseBrightness * 0.1 * pulseIntensity})
            `;
            
            // Reset after pulse
            setTimeout(() => {
                star.style.transition = `all ${Math.random() * 2000 + 1000}ms ease-in-out`;
                star.style.opacity = baseOpacity;
                star.style.filter = `brightness(${baseBrightness})`;
                star.style.boxShadow = `
                    0 0 ${baseGlow}px ${baseGlow / 2}px rgba(255, 255, 255, ${baseBrightness * 0.3}),
                    0 0 ${baseGlow * 2}px ${baseGlow}px rgba(255, 255, 255, ${baseBrightness * 0.1})
                `;
                
                // Schedule next glow
                const nextGlowDelay = Math.random() * 5000 + 2000; // 2-7 seconds
                setTimeout(randomGlow, nextGlowDelay);
            }, glowDuration);
        };
        
        // Start first glow after random delay
        const initialDelay = Math.random() * 3000; // 0-3 seconds
        setTimeout(randomGlow, initialDelay);
    }
    
    createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random starting position (from top)
        const startX = Math.random() * 100;
        
        // Random angle (mostly horizontal with some variation)
        const angle = Math.random() * 30 - 15; // -15 to 15 degrees
        
        // Random speed and distance
        const speed = Math.random() * 1000 + 2000; // 2000-3000ms
        const distance = Math.random() * 100 + 150; // 150-250vw
        
        // Random size and brightness
        const size = Math.random() * 4 + 2; // 2-6px
        const brightness = Math.random() * 0.8 + 0.2; // 0.2-1.0
        
        // Color variation (white to blue-white)
        const colorTemp = Math.random() * 0.3;
        const red = 255;
        const green = 255 - (colorTemp * 80);
        const blue = 255 - (colorTemp * 40);
        
        Object.assign(shootingStar.style, {
            position: 'fixed',
            top: '0',
            left: `${startX}%`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: `rgb(${red}, ${green}, ${blue})`,
            boxShadow: `
                0 0 ${size * 3}px ${size}px rgba(${red}, ${green}, ${blue}, ${brightness}),
                0 0 ${size * 6}px ${size * 2}px rgba(${red}, ${green}, ${blue}, ${brightness * 0.5})
            `,
            pointerEvents: 'none',
            zIndex: '1',
            opacity: '0',
            transform: `rotate(${angle}deg)`,
            filter: `brightness(${brightness}) blur(0.5px)`
        });
        
        document.body.appendChild(shootingStar);
        
        // Create tail
        const tail = document.createElement('div');
        tail.className = 'shooting-star-tail';
        tail.style.cssText = `
            position: fixed;
            top: 0;
            left: ${startX}%;
            width: 0;
            height: 0;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            border-bottom: 100px solid rgba(${red}, ${green}, ${blue}, 0.3);
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            transform: rotate(${angle}deg);
            filter: blur(2px);
        `;
        
        document.body.appendChild(tail);
        
        // Animate shooting star
        shootingStar.animate([
            { 
                opacity: 0,
                transform: `translate(0, 0) rotate(${angle}deg)`,
                filter: 'brightness(1) blur(0.5px)'
            },
            { 
                opacity: brightness,
                transform: `translate(${Math.cos(angle * Math.PI / 180) * distance}vw, ${Math.sin(angle * Math.PI / 180) * distance}vh) rotate(${angle}deg)`,
                filter: 'brightness(3) blur(2px)'
            },
            { 
                opacity: 0,
                transform: `translate(${Math.cos(angle * Math.PI / 180) * distance * 1.2}vw, ${Math.sin(angle * Math.PI / 180) * distance * 1.2}vh) rotate(${angle}deg)`,
                filter: 'brightness(0) blur(4px)'
            }
        ], {
            duration: speed,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        // Animate tail
        tail.animate([
            { 
                opacity: 0,
                transform: `translate(0, 0) rotate(${angle}deg) scale(0.5)`,
                borderBottomWidth: '0px'
            },
            { 
                opacity: brightness * 0.3,
                transform: `translate(${Math.cos(angle * Math.PI / 180) * distance * 0.5}vw, ${Math.sin(angle * Math.PI / 180) * distance * 0.5}vh) rotate(${angle}deg) scale(1)`,
                borderBottomWidth: '150px'
            },
            { 
                opacity: 0,
                transform: `translate(${Math.cos(angle * Math.PI / 180) * distance * 0.6}vw, ${Math.sin(angle * Math.PI / 180) * distance * 0.6}vh) rotate(${angle}deg) scale(1.2)`,
                borderBottomWidth: '0px'
            }
        ], {
            duration: speed * 0.8,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        // Remove elements after animation
        setTimeout(() => {
            if (shootingStar.parentNode) {
                document.body.removeChild(shootingStar);
            }
            if (tail.parentNode) {
                document.body.removeChild(tail);
            }
        }, speed);
        
        this.shootingStars.push(shootingStar);
    }
    
    startShootingStars() {
        // Create first shooting star after random delay
        const initialDelay = Math.random() * 10000 + 5000; // 5-15 seconds
        setTimeout(() => {
            this.createShootingStar();
            // Start regular interval
            this.shootingStarInterval = setInterval(() => {
                if (Math.random() > 0.3) { // 70% chance to create a shooting star
                    this.createShootingStar();
                }
            }, Math.random() * 15000 + 10000); // 10-25 seconds between attempts
        }, initialDelay);
    }
    
    injectStyles() {
        if (!document.getElementById('starfield-styles')) {
            const style = document.createElement('style');
            style.id = 'starfield-styles';
            style.textContent = `
                #stars {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                    overflow: hidden;
                }
                
                @keyframes twinkle {
                    0%, 100% {
                        opacity: 0.5;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.1);
                    }
                }
                
                .star {
                    position: absolute;
                    background-color: white;
                    border-radius: 50%;
                    transition: all 2s ease-in-out;
                    will-change: opacity, box-shadow, filter;
                }
                
                .shooting-star {
                    position: fixed;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 2;
                    will-change: transform, opacity, filter;
                }
                
                .shooting-star-tail {
                    position: fixed;
                    pointer-events: none;
                    z-index: 1;
                    will-change: transform, opacity, border-bottom-width;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    destroy() {
        if (this.shootingStarInterval) {
            clearInterval(this.shootingStarInterval);
        }
        
        // Remove all shooting stars
        this.shootingStars.forEach(star => {
            if (star.parentNode) {
                document.body.removeChild(star);
            }
        });
        
        this.shootingStars = [];
        
        // Remove stars container
        if (this.container && this.container.parentNode) {
            document.body.removeChild(this.container);
        }
    }
}

// ============================================
// RAIN EFFECT
// ============================================
class RainEffect {
    constructor() {
        this.container = null;
        this.dropCount = 100;
        this.maxDrops = this.dropCount * 1.5;
        this.intervalId = null;
    }
    
    init() {
        this.container = document.createElement('div');
        this.container.className = 'rain';
        this.container.style.zIndex = '1';
        document.body.appendChild(this.container);
        
        // Initial raindrops
        for (let i = 0; i < this.dropCount; i++) {
            setTimeout(() => this.createDrop(), Math.random() * 2000);
        }
        
        // Continuous creation
        this.intervalId = setInterval(() => {
            if (this.container.children.length < this.maxDrops) {
                this.createDrop();
            }
        }, 100);
    }
    
    createDrop() {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        
        // Random properties
        const left = Math.random() * 100;
        const animationDuration = 0.5 + Math.random();
        const animationDelay = Math.random() * 2;
        const opacity = 0.2 + Math.random() * 0.5;
        const length = 30 + Math.random() * 40;
        const blur = Math.random() * 2; // Random blur for depth
        
        // Apply styles
        Object.assign(drop.style, {
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `-${animationDelay}s`,
            opacity: opacity,
            height: `${length}px`,
            filter: `blur(${blur}px)`,
            zIndex: '1'
        });
        
        this.container.appendChild(drop);
        
        // Auto-remove
        setTimeout(() => {
            if (drop.parentNode === this.container) {
                this.container.removeChild(drop);
            }
        }, animationDuration * 1000);
    }
    
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        if (this.container && this.container.parentNode) {
            document.body.removeChild(this.container);
        }
    }
}

// ============================================
// LIGHTNING EFFECT
// ============================================
class LightningEffect {
    constructor() {
        this.thunderSound = document.getElementById('thunderSound');
        this.nextLightningTimeout = null;
    }
    
    init() {
        // Start after 5 seconds
        setTimeout(() => this.create(), 5000);
    }
    
    create() {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, 
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(255, 255, 255, 0) 100%);
            pointer-events: none;
            z-index: 3;
            opacity: 0;
            animation: lightningFlash 0.3s ease-out;
        `;
        
        document.body.appendChild(lightning);
        
        // Play thunder sound with random timing
        if (this.thunderSound) {
            const volume = 0.3 + Math.random() * 0.2;
            const soundDelay = 500 + Math.random() * 1000;
            
            setTimeout(() => {
                try {
                    this.thunderSound.volume = volume;
                    this.thunderSound.playbackRate = 0.9 + Math.random() * 0.2;
                    this.thunderSound.currentTime = 0;
                    this.thunderSound.play();
                } catch (e) {
                    console.log('Audio play failed:', e);
                }
            }, soundDelay);
        }
        
        // Remove lightning after animation
        setTimeout(() => {
            if (lightning.parentNode === document.body) {
                document.body.removeChild(lightning);
            }
        }, 8000);
        
        // Schedule next lightning (10-30 seconds)
        const delay = Math.random() * 20000 + 10000;
        this.nextLightningTimeout = setTimeout(() => this.create(), delay);
    }
    
    destroy() {
        if (this.nextLightningTimeout) {
            clearTimeout(this.nextLightningTimeout);
        }
    }
}

// ============================================
// TERMINAL SIMULATION (Previous code remains the same)
// ============================================
class Terminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.tabs = document.querySelectorAll('.tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.commands = {
            help: this.helpCommand.bind(this),
            clear: this.clearCommand.bind(this),
            cd: this.cdCommand.bind(this),
            about: this.aboutCommand.bind(this),
            cv: this.cvCommand.bind(this),
            ls: this.lsCommand.bind(this),
            whoami: this.whoamiCommand.bind(this),
            date: this.dateCommand.bind(this),
            echo: this.echoCommand.bind(this),
            contact: this.contactCommand.bind(this)
        };
    }
    
    init() {
        this.setupEventListeners();
        this.showTab('terminal');
        this.addWelcomeMessage();
        this.focusInput();
    }
    
    setupEventListeners() {
        // Tab switching
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                this.showTab(tabName);
                this.updatePrompt(tabName);
                
                if (tabName !== 'terminal') {
                    this.addToOutput(`$ cd ${tabName}`, 'command');
                    this.addToOutput('', 'output');
                }
            });
        });
        
        // Terminal input
        if (this.input) {
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.processInput();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateHistory(-1);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateHistory(1);
                }
            });
        }
        
        // Focus input when clicking terminal
        document.querySelector('.terminal-body')?.addEventListener('click', () => {
            this.focusInput();
        });
    }
    
    processInput() {
        const command = this.input.value.trim();
        if (!command) return;
        
        // Add to history
        this.commandHistory.unshift(command);
        this.historyIndex = -1;
        
        // Display command
        this.addToOutput(`$ ${command}`, 'command');
        
        // Process command
        this.executeCommand(command);
        
        // Clear input and scroll
        this.input.value = '';
        this.scrollToBottom();
    }
    
    executeCommand(fullCommand) {
        const args = fullCommand.split(' ');
        const cmd = args[0].toLowerCase();
        const params = args.slice(1);
        
        if (this.commands[cmd]) {
            this.commands[cmd](params);
        } else if (cmd) {
            this.addToOutput(`Command not found: ${cmd}`, 'error');
            this.addToOutput('Type \'help\' for a list of available commands', 'info');
        }
    }
    
    showTab(tabName) {
        // Hide all tabs
        this.tabContents.forEach(tab => tab.classList.remove('active'));
        this.tabs.forEach(tab => tab.classList.remove('active'));
        
        // Show selected tab
        const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);
        
        if (activeTab) activeTab.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
        
        // Focus input if terminal tab
        if (tabName === 'terminal') {
            this.focusInput();
        }
    }
    
    updatePrompt(tabName) {
        const prompt = document.querySelector('.terminal-title');
        if (prompt) {
            const path = tabName === 'terminal' ? '~' : tabName;
            prompt.textContent = `simon@portfolio: ${path}`;
        }
    }
    
    addToOutput(text, type = 'output') {
        const line = document.createElement('div');
        line.className = `command-line ${type}`;
        
        if (type === 'command') {
            const activeTab = document.querySelector('.tab.active')?.getAttribute('data-tab') || 'terminal';
            const path = activeTab === 'terminal' ? '~' : activeTab;
            line.innerHTML = `
                <span class="prompt">simon@portfolio:${path}$</span>
                <span class="command">${text.substring(2)}</span>
            `;
        } else if (type === 'error') {
            line.innerHTML = `<span class="command-error">${text}</span>`;
        } else if (type === 'info') {
            line.innerHTML = `<span class="command-info">${text}</span>`;
        } else {
            line.textContent = text;
        }
        
        this.output.appendChild(line);
    }
    
    addWelcomeMessage() {
        this.addToOutput('Welcome to Simon\'s Interactive Terminal. Type \'help\' to get started.', 'info');
    }
    
    scrollToBottom() {
        if (this.output) {
            this.output.scrollTop = this.output.scrollHeight;
        }
    }
    
    focusInput() {
        if (this.input) {
            this.input.focus();
        }
    }
    
    navigateHistory(direction) {
        if (direction === -1 && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 1 && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 1 && this.historyIndex === 0) {
            this.historyIndex = -1;
            this.input.value = '';
        }
    }
    
    // Command implementations (same as before)
    helpCommand() {
        const helpText = `
  ┌───────────────────────────────────────────────┐
  │              AVAILABLE COMMANDS               │
  ├───────────────┬───────────────────────────────┤
  │ help          │ Show this help message        │
  │ clear         │ Clear the terminal            │
  │ about         │ Show about information        │
  │ cv            │ Download CV                   │
  │ ls            │ List directory contents       │
  │ whoami        │ Show current user             │
  │ date          │ Show current date and time    │
  │ echo [text]   │ Display a line of text        │
  │ contact       │ Switch to contact tab         │
  ├───────────────┼───────────────────────────────┤
  │ NAVIGATION                                    │
  ├───────────────┬───────────────────────────────┤
  │ cd about      │ View about section            │
  │ cd projects   │ View projects                 │
  │ cd contact    │ View contact information      │
  │ cd ..         │ Return to terminal            │
  └───────────────┴───────────────────────────────┘
`;
        helpText.trim().split('\n').forEach(line => {
            this.addToOutput(line, 'info');
        });
    }
    
    clearCommand() {
        if (this.output) {
            this.output.innerHTML = '';
            this.addWelcomeMessage();
        }
    }
    
    cdCommand(params) {
        if (params.length === 0) {
            this.addToOutput('Usage: cd [directory]', 'error');
            return;
        }
        
        const dir = params[0].toLowerCase();
        const validDirs = ['about', 'projects', 'contact', 'erpnext'];
        
        if (dir === '..') {
            this.showTab('terminal');
            this.updatePrompt('terminal');
        } else if (validDirs.includes(dir)) {
            this.showTab(dir);
            this.updatePrompt(dir);
        } else {
            this.addToOutput(`cd: no such directory: ${dir}`, 'error');
        }
    }
    
    aboutCommand() {
        this.showTab('about');
        this.updatePrompt('about');
    }
    
    cvCommand() {
        downloadCV();
        this.addToOutput('Downloading CV...', 'info');
    }
    
    lsCommand() {
        const activeTab = document.querySelector('.tab.active')?.getAttribute('data-tab') || 'terminal';
        let output = '';
        
        if (activeTab === 'terminal') {
            output = 'about/    projects/    contact/    erpnext/\n\n' +
                    'Files:\n' +
                    '  cv.pdf';
        } else if (activeTab === 'projects') {
            output = 'kinda-ecommerce-flutter/    erpnext-delivery-app/\n' +
                    'erpnext-zra-integration/    erpnext-pawapay-integration/\n' +
                    'kindamashinani-backend/';
        } else {
            output = `No files in ${activeTab} directory`;
        }
        
        this.addToOutput(output, 'info');
    }
    
    whoamiCommand() {
        this.addToOutput('simon', 'info');
    }
    
    dateCommand() {
        this.addToOutput(new Date().toLocaleString(), 'info');
    }
    
    echoCommand(params) {
        this.addToOutput(params.join(' '), 'info');
    }
    
    contactCommand() {
        this.showTab('contact');
        this.updatePrompt('contact');
    }
}

// ============================================
// UTILITY FUNCTIONS (Previous code remains the same)
// ============================================
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'Simon_Muturi_CV_Flutter_ERPNext_F.pdf';
    link.download = 'Simon_Muturi_CV_Flutter_ERPNext_F.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        const contactTab = document.querySelector('#contact .output');
        
        if (!contactTab) return;
        
        const newOutput = document.createElement('div');
        newOutput.innerHTML = `
            <div class="command-line">
                <span class="prompt">simon@portfolio:~$</span>
                <span class="command">echo "Message sent successfully!"</span>
            </div>
            <div style="margin: 1rem 0;">
                <p style="color: var(--text-success); margin-bottom: 1rem;">
                    ✓ Message queued for delivery<br>
                    ✓ Recipient: simomutu8@gmail.com<br>
                    ✓ Subject: ${data.subject}<br>
                    ✓ Expected response time: Within 24 hours
                </p>
                <div class="git-section">
                    <div class="git-header">📨 Message Preview</div>
                    <div style="font-size: 13px; margin-top: 12px;">
                        <div><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</div>
                        <div><strong>Subject:</strong> ${data.subject}</div>
                        <div style="margin-top: 8px;"><strong>Message:</strong></div>
                        <div style="padding: 8px; background: var(--bg-primary); border-radius: 4px; margin-top: 4px;">
                            ${data.message}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        contactTab.appendChild(newOutput);
        this.reset();
        contactTab.scrollTop = contactTab.scrollHeight;
    });
}

function setupWindowControls() {
    // Close button
    document.querySelector('.close')?.addEventListener('click', () => {
        if (confirm('Close terminal? Your session will be lost.')) {
            const terminal = document.querySelector('.terminal-window');
            terminal.style.animation = 'closeWindow 0.5s cubic-bezier(0.4, 0, 1, 1)';
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: 'JetBrains Mono', monospace; color: var(--text-primary); background: var(--bg-primary);">
                        <div style="text-align: center; animation: fadeIn 0.5s ease;">
                            <div style="font-size: 4rem; margin-bottom: 2rem;">💻</div>
                            <h1 style="color: var(--text-accent); margin-bottom: 1rem;">Terminal Session Ended</h1>
                            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Connection to simon@portfolio closed.</p>
                            <button onclick="location.reload()" style="background: linear-gradient(45deg, var(--text-accent), var(--purple)); color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-family: inherit; font-weight: 600;">
                                🔄 Reconnect
                            </button>
                        </div>
                    </div>
                `;
            }, 500);
        }
    });
    
    // Minimize button
    document.querySelector('.minimize')?.addEventListener('click', () => {
        const terminal = document.querySelector('.terminal-window');
        const content = terminal.querySelector('.tab-content-container');
        const tabs = terminal.querySelector('.terminal-tabs');
        
        if (terminal.style.height === '40px') {
            // Restore
            terminal.style.height = 'auto';
            content.style.display = 'block';
            tabs.style.display = 'flex';
            terminal.style.animation = 'expandWindow 0.3s ease';
        } else {
            // Minimize
            terminal.style.height = '40px';
            content.style.display = 'none';
            tabs.style.display = 'none';
            terminal.style.animation = 'collapseWindow 0.3s ease';
        }
    });
    
    // Maximize button
    document.querySelector('.maximize')?.addEventListener('click', () => {
        const terminal = document.querySelector('.terminal-window');
        if (terminal.style.position === 'fixed') {
            // Restore
            terminal.style.position = 'static';
            terminal.style.top = 'auto';
            terminal.style.left = 'auto';
            terminal.style.width = 'auto';
            terminal.style.height = 'auto';
            terminal.style.margin = '20px';
            terminal.style.borderRadius = '8px';
        } else {
            // Maximize
            terminal.style.position = 'fixed';
            terminal.style.top = '0';
            terminal.style.left = '0';
            terminal.style.width = '100vw';
            terminal.style.height = '100vh';
            terminal.style.margin = '0';
            terminal.style.borderRadius = '0';
        }
    });
}

// ============================================
// MAIN INITIALIZATION
// ============================================
let starfield, rainEffect, lightningEffect, terminal;

function init() {
    // Initialize starfield first (background) - with new enhanced effects
    starfield = new Starfield();
    starfield.init();
    
    // Initialize rain effect
    rainEffect = new RainEffect();
    rainEffect.init();
    
    // Initialize lightning effect
    lightningEffect = new LightningEffect();
    lightningEffect.init();
    
    // Initialize terminal (make sure terminal is above effects)
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        terminalWindow.style.zIndex = '10';
        terminalWindow.style.position = 'relative';
    }
    
    terminal = new Terminal();
    terminal.init();
    
    // Setup other components
    setupContactForm();
    setupWindowControls();
    
    // Setup CV download link
    document.getElementById('cv-download-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        downloadCV();
    });
    
    // Add click effects for package items
    document.querySelectorAll('.package-item').forEach(pkg => {
        pkg.addEventListener('click', function() {
            this.style.background = 'var(--bg-tertiary)';
            const checkmark = document.createElement('span');
            checkmark.style.color = 'var(--text-success)';
            checkmark.textContent = '✓ Ready to deploy';
            this.appendChild(checkmark);
        });
    });
}

// Start everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}