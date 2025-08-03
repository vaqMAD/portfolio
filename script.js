document.addEventListener('DOMContentLoaded', () => {
	// ==========================================================================
	// 1. HEADER TYPEWRITER ANIMATION (Typed.js)
	// ==========================================================================
	if (typeof Typed !== 'undefined') {
		new Typed('#typing-effect', {
			strings: ['Damian Ignaczak | Backend Developer'],
			typeSpeed: 80,
			backSpeed: 50,
			backDelay: 4000,
			loop: true,
			cursorChar: '_',
		});
	}

	// ==========================================================================
	// 2. BACKGROUND STAIN SIZE LOGIC
	// ==========================================================================
	function updateAllStainSizes() {
		const viewportWidth = window.innerWidth;
		const largeLeftStain = document.querySelector('.stain-left-large');
		const smallLeftStain = document.querySelector('.stain-left-small');
		const largeRightStain = document.querySelector('.stain-right-large');
		const smallRightStain = document.querySelector('.stain-right-small');

		if (largeLeftStain) {
			largeLeftStain.style.width = `${viewportWidth * 0.28}px`;
			largeLeftStain.style.height = `${viewportWidth * 0.28}px`;
		}
		if (smallLeftStain) {
			smallLeftStain.style.width = `${viewportWidth * 0.1}px`;
			smallLeftStain.style.height = `${viewportWidth * 0.1}px`;
		}
		if (largeRightStain) {
			largeRightStain.style.width = `${viewportWidth * 0.38}px`;
			largeRightStain.style.height = `${viewportWidth * 0.38}px`;
		}
		if (smallRightStain) {
			smallRightStain.style.width = `${viewportWidth * 0.26}px`;
			smallRightStain.style.height = `${viewportWidth * 0.26}px`;
		}
	}

	updateAllStainSizes();
	window.addEventListener('resize', updateAllStainSizes);

	// ==========================================================================
	// 3. TERMINAL ANIMATION
	// ==========================================================================
	const techStackSection = document.querySelector('#tech-stack');
	if (techStackSection && typeof Typed !== 'undefined') {
		const terminalOutput = document.getElementById('terminal-output');
		let animationHasStarted = false;

		const techStackObserver = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting && !animationHasStarted) {
						animationHasStarted = true;
						startTechStackAnimation(terminalOutput);
						techStackObserver.unobserve(techStackSection);
					}
				});
			},
			{
				threshold: 0.2,
			}
		);
		techStackObserver.observe(techStackSection);
	}

	function startTechStackAnimation(terminalOutput) {
		const stringToRender = `$ show-skills<br>
> Here's a snapshot of the tools I use. This list is always evolving.

<span class='terminal-category'>Backend:</span>
  - <img src='icons/python.svg' alt='Python' class='tech-icon'> Python
  - <img src='icons/django.svg' alt='Django' class='tech-icon'> Django, DRF
  - Celery (learning)

<span class='terminal-category'>Databases / Cache:</span>
  - <img src='icons/postgresql.svg' alt='PostgreSQL' class='tech-icon'> PostgreSQL
  - <img src='icons/redis.svg' alt='Redis' class='tech-icon'> Redis

<span class='terminal-category'>DevOps / Tools:</span>
  - <img src='icons/docker.svg' alt='Docker' class='tech-icon'> Docker, Docker Compose
  - <img src='icons/git.svg' alt='Git' class='tech-icon'> Git, GitHub
  - <img src='icons/linux.svg' alt='Linux' class='tech-icon'> Linux

<span class='terminal-category'>Testing:</span>
  - Unit, Integration Testing

<span class='terminal-category'>Architecture / Others:</span>
  - Clean Architecture, Design Patterns
  - Rest API

<span class='terminal-category'>On My Radar (Learning):</span>
  - <img src='icons/go.svg' alt='Go' class='tech-icon'> Go
  - <img src='icons/pytest.svg' alt='Pytest' class='tech-icon'> Pytest
  - <img src='icons/fastapi.svg' alt='FastAPI' class='tech-icon'> FastAPI
  - ...`;

		terminalOutput.innerHTML = `<span>$ Loading components <span class="loading-cursor">...</span></span>`;
		setTimeout(() => {
			terminalOutput.innerHTML = '<span id="typing-target"></span>';
			new Typed('#typing-target', {
				strings: [stringToRender],
				typeSpeed: 25,
				showCursor: true,
				cursorChar: '_',
				contentType: 'html',
				onComplete: self => {
					const cursor = self.el.querySelector('.typed-cursor');
					if (cursor) {
						cursor.classList.add('typed-cursor--static');
					}
				},
			});
		}, 1500);
	}

	// ==========================================================================
	// 4. CAREER PATH TIMELINE ANIMATION (GSAP)
	// ==========================================================================
	const careerSection = document.querySelector('#career-path');
	if (careerSection && typeof gsap !== 'undefined') {
		let timelineAnimationHasStarted = false;

		const careerObserver = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting && !timelineAnimationHasStarted) {
						timelineAnimationHasStarted = true;

						const revealTl = gsap.timeline({
							onComplete: () => {
								const pulseTl = gsap.timeline({
									repeat: -1,
									yoyo: true,
									defaults: { duration: 1.5, ease: 'power1.inOut' },
								});

								// Pulse the last item
								pulseTl.to(
									'.timeline-item:last-child',
									{
										scale: 1.05, // Pulse effect intensity
									},
									0 // Start at the beginning of the timeline
								);

								// Simultaneously animate the dot using CSS variables
								pulseTl.to(
									'.timeline-item:last-child',
									{
										'--dot-scale': 1.3,
										'--dot-shadow-opacity': 0.7,
									},
									0 // Ensures perfect sync with the item's pulsing
								);
							},
						});

						// Animate the appearance of all timeline items
						revealTl.to('.timeline-item', {
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: 'power2.out',
							stagger: 0.3,
						});

						careerObserver.unobserve(careerSection);
					}
				});
			},
			{ threshold: 0.2 }
		);

		careerObserver.observe(careerSection);
	}
	
	// ==========================================================================
	// 5. COLLAPSIBLE "AFTER HOURS" SECTION
	// ==========================================================================
	const toggleBtn = document.getElementById('toggle-after-hours');
	const content = document.getElementById('collapsible-content');

	if (toggleBtn && content) {
		toggleBtn.addEventListener('click', () => {
			// Toggle classes on the button and content container
			toggleBtn.classList.toggle('is-open');
			content.classList.toggle('is-open');

			// Check if the container is now open
			if (content.classList.contains('is-open')) {
				// If so, set max-height to its full, natural scroll height
				// This ensures a smooth animation to the correct size.
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				// If not (it's closing), reset max-height to the value from CSS.
				content.style.maxHeight = null;
			}
		});
	}
});