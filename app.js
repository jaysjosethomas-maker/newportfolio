// Jays Jose Thomas Portfolio Engine
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    
    // Check if device is desktop (has mouse hover capability)
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    
    if (isDesktop) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Subtle delayed smooth follow for dot
            cursorDot.animate({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            }, { duration: 100, fill: 'forwards' });
        });

        // Add hover effects
        const interactiveElements = document.querySelectorAll('a, button, .clickable-card, .const-node, .hotspot, .lead-tab, .beyond-btn, .dash-tab');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                cursorDot.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                cursorDot.classList.remove('hovered');
            });
        });
    } else {
        // Hide custom cursors on touchscreen devices
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        document.body.style.cursor = 'default';
    }

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu on nav link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // 3. Navigation Highlight & Theme Toggle on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });

        // Theme Toggle: Alternate sections between Dark Navy and White
        const activeSection = document.getElementById(current);
        if (activeSection) {
            if (activeSection.classList.contains('light-section') || activeSection.classList.contains('grey-section')) {
                document.body.classList.add('light-theme');
                document.body.classList.remove('dark-theme');
            } else {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
            }
        }
    });

    // 4. Hero Particle Canvas
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 80;

    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Blueprint
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce boundary checks
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dist = Math.hypot(particlesArray[i].x - particlesArray[j].x, particlesArray[i].y - particlesArray[j].y);
                if (dist < 80) {
                    ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 * (1 - dist/80)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 5. Rotator Typewriter Text (Hero)
    const rotatorText = document.getElementById('rotator-text');
    const roles = [
        "Product Leader",
        "Systems Thinker",
        "AI & Cloud Builder",
        "Physics Graduate",
        "Therapist",
        "Author",
        "Photographer",
        "Astrophotographer",
        "Traveller",
        "Expedition Leader",
        "Community Builder",
        "Storyteller"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRoles() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            rotatorText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            rotatorText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeRoles, typingSpeed);
    }
    setTimeout(typeRoles, 1000);

    // 6. Constellation Interaction
    const constNodes = document.querySelectorAll('.const-node');
    const defaultInfoCard = document.getElementById('info-card-default');
    
    constNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const nodeId = node.getAttribute('data-node');
            
            // Highlight SVG lines linked to this node
            const lines = document.querySelectorAll(`.c-line[data-node="${nodeId}"]`);
            lines.forEach(l => {
                l.style.stroke = 'var(--accent-blue)';
                l.style.strokeWidth = '3px';
            });

            // Toggle info panels
            const panels = document.querySelectorAll('.constellation-info .info-card');
            panels.forEach(p => p.classList.add('hidden'));
            
            const targetPanel = document.getElementById(`info-card-${nodeId}`);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });

        node.addEventListener('mouseleave', () => {
            const nodeId = node.getAttribute('data-node');
            
            // Restore SVG lines
            const lines = document.querySelectorAll(`.c-line[data-node="${nodeId}"]`);
            lines.forEach(l => {
                l.style.stroke = '';
                l.style.strokeWidth = '';
            });

            // Return to default info card
            const panels = document.querySelectorAll('.constellation-info .info-card');
            panels.forEach(p => p.classList.add('hidden'));
            defaultInfoCard.classList.remove('hidden');
        });
    });

    // 7. Counter Animation (Cloud Centerpiece)
    const statsValues = document.querySelectorAll('.stat-value');
    
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const targetValue = parseFloat(el.getAttribute('data-target'));
                const prefix = el.getAttribute('data-prefix');
                const suffix = el.getAttribute('data-suffix');
                
                let currentCount = 0;
                const duration = 1500; // 1.5s
                const stepTime = 20;
                const stepValue = targetValue / (duration / stepTime);

                const counter = setInterval(() => {
                    currentCount += stepValue;
                    if (currentCount >= targetValue) {
                        el.textContent = prefix + targetValue + suffix;
                        clearInterval(counter);
                    } else {
                        // Formatting float values nicely
                        if (targetValue % 1 !== 0) {
                            el.textContent = prefix + currentCount.toFixed(1) + suffix;
                        } else {
                            el.textContent = prefix + Math.floor(currentCount) + suffix;
                        }
                    }
                }, stepTime);

                // Animate associated progress bar
                const bar = el.parentElement.querySelector('.progress-bar');
                if (bar) {
                    bar.style.width = bar.parentElement.style.width || '100%';
                }

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statsValues.forEach(val => countObserver.observe(val));

    // 8. Keynote Cloud Dashboard Tab System
    const dashTabs = document.querySelectorAll('.dash-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    dashTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dashTabs.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPane = document.getElementById(`pane-${tab.getAttribute('data-tab')}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // 9. Case Studies Dynamic Modals
    const caseCards = document.querySelectorAll('.clickable-card');
    const caseModal = document.getElementById('case-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalBodyContent = document.getElementById('modal-body-content');

    const caseData = {
        krutrim: {
            title: "Ola Krutrim AI Cloud Architecture",
            tag: "AI Platforms & Infrastructure",
            metrics: [
                { label: "ARR Scaled", val: "$44.4 Million" },
                { label: "CSAT Score", val: "99%" },
                { label: "GPU Splicing", val: "100% Utilized" }
            ],
            sections: [
                {
                    title: "The Problem",
                    desc: "Krutrim started as a basic dashboard with a manual form request where clients specified VM requirements. SRE teams then allocated GPUs manually in the backend. To build India's first public sovereign AI cloud, we had to architect a fully scalable, secure, multi-tenant automated console."
                },
                {
                    title: "The Architecture & Splicing",
                    desc: "To maximize efficiency under high hardware costs, we designed a spliced GPU scheduling model inside Kubernetes pods (patent-pending). Instead of dedicating absolute GPUs to single processes, Kubernetes dynamically routes training, evaluation, and inference workloads across shared clusters. Sustained 100% hardware allocation saved 1 Crore monthly in idle infrastructure cost."
                },
                {
                    title: "Outcome",
                    desc: "Scaled Krutrim's service catalog from 6 core services (basic VM, block storage) to 31 full-stack services inside a single year. Handled all support operations, created the SOP logs, and drove platform metrics to 76K monthly active users (MAU)."
                }
            ]
        },
        "ola-consumer": {
            title: "Ola Driver Onboarding Revamp",
            tag: "B2C Funnel Optimization",
            metrics: [
                { label: "Gross Attachments", val: "+171.17% MoM" },
                { label: "Overall Conversion", val: "+44.08%" },
                { label: "Onboarding TAT", val: "-1.63 Days" }
            ],
            sections: [
                {
                    title: "The Context & Opportunity",
                    desc: "Ola Partner onboarding was historically bogged down by manual verification checks of government IDs and driver certifications, causing heavy registration leakage. Our objective was to fully digitize document validation and automate the verification pipeline."
                },
                {
                    title: "Product Execution & Automation",
                    desc: "Implemented automated OCR readers linked directly to public APIs for instantaneous DL (Driving License) and RC (Registration Certificate) verification. Designed a dynamic OCR verification loop that allowed drivers to re-upload blurred items in real-time, preventing drop-offs."
                },
                {
                    title: "Business Impact",
                    desc: "Drove gross attachments up by 171.17% month-on-month. Replaced manual overhead and slashed verification TAT by 1.63 days, saving massive operational expenditures. Earned a direct commendation from Ola Group CEO Bhavish Aggarwal."
                }
            ]
        },
        joveo: {
            title: "Joveo Programmatic Platform Stabilization",
            tag: "B2B Analytics & Anomaly Guard",
            metrics: [
                { label: "Monthly Jira Bugs", val: "-20%" },
                { label: "Spike Anomaly Bugs", val: "-30%" },
                { label: "Add-on Bot Revenue", val: "+$85K USD/mo" }
            ],
            sections: [
                {
                    title: "System Stability Challenges",
                    desc: "The programmatic job advertising engine at Joveo tracks millions of clicks and conversions daily using pixels and cookies. Bug backlogs were causing tracking discrepancies and billing disputes with global recruitment clients."
                },
                {
                    title: "Algorithmic Problem Solving",
                    desc: "Introduced a programmatic spike-detection system that automatically identified tracking discrepancies in real-time. Created bot protection triggers that filtered malicious crawler actions, improving job qualification conversion percentages by 2.6%."
                },
                {
                    title: "Outcomes",
                    desc: "Reduced outstanding system bug logs from 3-digits to single digits in 3 months (20% total reduction). Added new features generating an incremental $85K in monthly revenue. Revamped system data dictionaries for enhanced team data literacy."
                }
            ]
        },
        "ola-cars": {
            title: "Ola Cars Used Vehicle Platform & Sales CRM",
            tag: "0-to-1 Marketplace Scale",
            metrics: [
                { label: "Monthly Sales Vol", val: "+380%" },
                { label: "CRM Development Time", val: "2 Weeks" },
                { label: "Support escalations", val: "-30%" }
            ],
            sections: [
                {
                    title: "Launch Velocity",
                    desc: "As the only APM selected across 5,000 candidates in the Ola group in 2021, I was placed in charge of launching Used Cars transactions from scratch. The pilot team had to build operational CRM workflows to handle transactions, seller inspections, and buyer financing fast."
                },
                {
                    title: "Microservices & CRM Execution",
                    desc: "Designed and coordinated a 10-microservice architecture for the MSD 360 CRM platform. Built a custom sales portal inside Leadsquared in 2 weeks, followed by a procurement CRM in 1 week. Implemented Zendesk automated workflows that prevented redundant loops, decreasing average TAT by 2 days."
                },
                {
                    title: "Outcome",
                    desc: "Ola Cars became India's second largest online used cars marketplace within 3 months of its initial pilot. Awarded Spotlight employee of the month and promoted to Product Manager for high-ownership execution."
                }
            ]
        }
    };

    function openModal(caseKey) {
        const data = caseData[caseKey];
        if (!data) return;

        // Compile modal HTML
        let metricsHtml = '';
        data.metrics.forEach(m => {
            metricsHtml += `
                <div class="modal-metric-item">
                    <span>${m.label}</span>
                    <strong>${m.val}</strong>
                </div>
            `;
        });

        let sectionsHtml = '';
        data.sections.forEach(s => {
            sectionsHtml += `
                <div class="modal-section">
                    <h3>${s.title}</h3>
                    <p>${s.desc}</p>
                </div>
            `;
        });

        modalBodyContent.innerHTML = `
            <span class="section-eyebrow text-blue">${data.tag}</span>
            <h2>${data.title}</h2>
            <div class="modal-metrics-bar">
                ${metricsHtml}
            </div>
            ${sectionsHtml}
        `;

        caseModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeModal() {
        caseModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    caseCards.forEach(card => {
        card.addEventListener('click', () => {
            const caseKey = card.getAttribute('data-case');
            openModal(caseKey);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // 10. Expandable Experience Timelines
    const expandButtons = document.querySelectorAll('.btn-text-expand');
    
    expandButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-exp');
            const targetContent = document.getElementById(`exp-${targetId}`);
            
            if (targetContent.classList.contains('hidden')) {
                targetContent.classList.remove('hidden');
                btn.innerHTML = `Collapse Details <i data-lucide="minus" class="btn-icon"></i>`;
            } else {
                targetContent.classList.add('hidden');
                btn.innerHTML = `Expand Details <i data-lucide="plus" class="btn-icon"></i>`;
            }
            lucide.createIcons(); // Re-create icons for the dynamically injected text
        });
    });

    // 11. Leadership Panel Tabs
    const leadTabs = document.querySelectorAll('.lead-tab');
    const leadPanels = document.querySelectorAll('.lead-panel');

    leadTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            leadTabs.forEach(t => t.classList.remove('active'));
            leadPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPane = document.getElementById(`lead-pane-${tab.getAttribute('data-lead')}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // 12. Beyond Work Dimensions Tab Selector
    const beyondButtons = document.querySelectorAll('.beyond-btn');
    const beyondPanels = document.querySelectorAll('.beyond-panel');

    beyondButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            beyondButtons.forEach(b => b.classList.remove('active'));
            beyondPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(`beyond-pane-${btn.getAttribute('data-beyond')}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // 13. Interactive Travel Map Logs
    const mapHotspots = document.querySelectorAll('.hotspot');
    const mapTooltip = document.getElementById('map-tooltip');

    const travelLogs = {
        Pilani: "BITS Pilani: Where the system building started. Integrates M.Sc. Physics and B.E. Chemical Engineering.",
        Leh: "Leh Expeditions: Leading astronomy clubs to altitude spots. Orchestrating cold weather setups.",
        Hanle: "Hanle Dark Sky Reserve: Capture of deep-sky objects and star trail timelapse logistics under -15C constraint.",
        Bangalore: "Bangalore: Core tech hub where Krutrim, Ola, Joveo products are engineered."
    };

    mapHotspots.forEach(spot => {
        spot.addEventListener('mouseenter', () => {
            const loc = spot.getAttribute('data-loc');
            mapTooltip.textContent = travelLogs[loc] || travelLogs.Bangalore;
            mapTooltip.style.color = '#ffffff';
        });

        spot.addEventListener('mouseleave', () => {
            mapTooltip.textContent = "Hover over a point to view travel logs";
            mapTooltip.style.color = '';
        });
    });
});
