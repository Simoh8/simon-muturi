
// Create starry background
function createStarryBackground() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 150;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (0.5px to 2px)
        const size = Math.random() * 1.5 + 0.5;
        
        // Random animation duration (2s to 5s)
        const duration = Math.random() * 3 + 2;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
}

// Function to handle CV download
function downloadCV() {
    // Create a link to the actual CV file
    const link = document.createElement('a');
    link.href = 'Simon_Muturi_CV_Flutter_ERPNext_F.pdf';
    link.download = 'Simon_Muturi_CV_Flutter_ERPNext_F.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Return a message for terminal output
    return 'Downloading CV...';
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    createStarryBackground();
    
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Set up CV download
    const cvDownloadLink = document.getElementById('cv-download-link');
    if (cvDownloadLink) {
        cvDownloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Call the download function
            downloadCV();
        });
    }
    
    // Terminal functionality
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const commandHistory = [];
    let historyIndex = -1;

    // Available commands
    const commands = {
        help: function() { 
            return 'Available commands:\n' +
                   '  help         - Show this help message\n' +
                   '  clear       - Clear the terminal\n' +
                   '  about       - Show about information\n' +
                   '  cv          - Download Simon\'s CV\n' +
                   '  ls          - List directory contents\n' +
                   '  whoami      - Show current user\n' +
                   '  date        - Show current date and time\n' +
                   '  echo [text] - Display a line of text\n' +
                   '  contact     - Switch to contact tab';
        },
        
        clear: function() {
            terminalOutput.innerHTML = '';
            return '';
        },
        
        about: function() {
            // Switch to about tab
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            document.querySelector('[data-tab="about"]').classList.add('active');
            document.getElementById('about').classList.add('active');
            return 'Switching to about tab...';
        },
        
        cv: function() {
            // Call the download function
            downloadCV();
            
            return 'Downloading CV...';
        },
        
        ls: function(args) {
            if (args.length > 0) {
                if (args[0] === 'projects' || args[0] === 'project') {
                    // Switch to projects tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    document.querySelector('[data-tab="projects"]').classList.add('active');
                    document.getElementById('projects').classList.add('active');
                    return 'Switching to projects tab...';
                } else if (args[0] === 'contact' || args[0] === 'contacts') {
                    // Switch to contact tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    document.querySelector('[data-tab="contact"]').classList.add('active');
                    document.getElementById('contact').classList.add('active');
                    return 'Switching to contact tab...';
                }
            }
            return 'about    projects    contact    cv.pdf';
        },
        
        contact: function() {
            // Switch to contact tab
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            document.querySelector('[data-tab="contact"]').classList.add('active');
            document.getElementById('contact').classList.add('active');
            return 'Switching to contact tab...';
        },
        
        whoami: function() { return 'guest'; },
        date: function() { return new Date().toLocaleString(); },
        echo: function(args) { return args.join(' '); }
    };

    // Handle command input
    if (terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = terminalInput.value.trim();
                
                // Add to history if not empty
                if (command) {
                    commandHistory.unshift(command);
                    historyIndex = -1;
                }
                
                // Add command to output
                const commandLine = document.createElement('div');
                commandLine.className = 'command-line';
                commandLine.innerHTML = '<span class="prompt">guest@simon-muturi:~$</span>' +
                                      '<span class="command">' + command + '</span>';
                terminalOutput.appendChild(commandLine);
                
                // Process command
                const args = command.split(' ');
                const cmd = args.shift().toLowerCase();
                let output = '';
                
                if (commands[cmd]) {
                    try {
                        output = commands[cmd](args) || '';
                    } catch (e) {
                        output = 'Error: ' + (e.message || 'Unknown error');
                    }
                } else if (cmd) {
                    output = '<span class="command-error">Command not found: ' + cmd + '. Type \'help\' for available commands.</span>';
                }
                
                // Add output
                if (output) {
                    const outputDiv = document.createElement('div');
                    outputDiv.className = 'command-output';
                    outputDiv.innerHTML = output;
                    terminalOutput.appendChild(outputDiv);
                }
                
                // Clear input and scroll to bottom
                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    terminalInput.value = '';
                }
            }
        });
        
        // Initial welcome message
        if (terminalOutput) {
            const welcomeMsg = "Welcome to Simon's Interactive Terminal. Type 'help' to get started.";
            const welcomeDiv = document.createElement('div');
            welcomeDiv.className = 'command-output';
            welcomeDiv.textContent = welcomeMsg;
            terminalOutput.appendChild(welcomeDiv);
        }
        
        // Focus the input
        terminalInput.focus();
    }

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Simulate form submission
        const contactTab = document.querySelector('#contact .output');
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
        
        // Clear form
        this.reset();
        
        // Scroll to bottom
        contactTab.scrollTop = contactTab.scrollHeight;
    });

    // Terminal window controls
    document.querySelector('.close').addEventListener('click', () => {
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

    document.querySelector('.minimize').addEventListener('click', () => {
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

    document.querySelector('.maximize').addEventListener('click', () => {
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
});
