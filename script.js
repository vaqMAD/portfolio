document.addEventListener('DOMContentLoaded', () => {
	// ==========================================================================
	// 1. GŁÓWNA ANIMACJA NAGŁÓWKA (TYPED.JS)
	// ==========================================================================
	new Typed('#typing-effect', {
		strings: ['Damian Ignaczak | Backend Developer'],
		typeSpeed: 80,
		backSpeed: 50,
		backDelay: 4000,
		loop: true,
		cursorChar: '_',
	});

	// ==========================================================================
	// 2. LOGIKA ZMIANY ROZMIARU DEKORACYJNYCH "PLAM"
	// ==========================================================================
	function updateAllStainSizes() {
		const viewportWidth = window.innerWidth;
		const largeLeftStain = document.querySelector('.stain-left-large');
		const smallLeftStain = document.querySelector('.stain-left-small');
		const largeRightStain = document.querySelector('.stain-right-large');
		const smallRightStain = document.querySelector('.stain-right-small');

		if (largeLeftStain) {
			const size = viewportWidth * 0.28;
			largeLeftStain.style.width = `${size}px`;
			largeLeftStain.style.height = `${size}px`;
		}
		if (smallLeftStain) {
			const size = viewportWidth * 0.1;
			smallLeftStain.style.width = `${size}px`;
			smallLeftStain.style.height = `${size}px`;
		}
		if (largeRightStain) {
			const size = viewportWidth * 0.38;
			largeRightStain.style.width = `${size}px`;
			largeRightStain.style.height = `${size}px`;
		}
		if (smallRightStain) {
			const size = viewportWidth * 0.26;
			smallRightStain.style.width = `${size}px`;
			smallRightStain.style.height = `${size}px`;
		}
	}

	// Uruchamiamy przy zmianie rozmiaru okna
	window.addEventListener('resize', updateAllStainSizes);
	// Uruchamiamy raz na starcie
	updateAllStainSizes();

	// ==========================================================================
	// 3. ANIMACJA TERMINALA Z TECH STACKIEM
	// ==========================================================================
	const techStackSection = document.querySelector('#tech-stack');
	if (techStackSection) {
		const terminalOutput = document.getElementById('terminal-output');
		let animationHasStarted = false;

		const techStackObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !animationHasStarted) {
						animationHasStarted = true;
						techStackObserver.unobserve(techStackSection);
						startTechStackAnimation(terminalOutput);
					}
				});
			}, {
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
				onComplete: (self) => {
					const cursor = self.el.querySelector('.typed-cursor');
					if (cursor) {
						cursor.classList.add('typed-cursor--static');
					}
				},
			});
		}, 1500);
	}

	// ==========================================================================
	// 4. ANIMACJA TIMELINE Z SVG
	// ==========================================================================
	const timeline = document.querySelector('.timeline');
	if (timeline) {
		const path = document.getElementById('timeline-path');
		const glow = document.querySelector('.timeline-glow');
		const items = document.querySelectorAll('.timeline-list li');
		let animationFrameId;

		function drawPath() {
			if (!items.length || !path) return;
			let pathData = '';
			const timelineRect = timeline.getBoundingClientRect();

			items.forEach((item, i) => {
				const itemRect = item.getBoundingClientRect();
				// Obliczamy środek kropki względem kontenera .timeline
				const x = itemRect.left - timelineRect.left + (item.offsetWidth / 2);
				const y = itemRect.top - timelineRect.top + (item.offsetHeight / 2);

				if (i === 0) {
					pathData += `M ${x} ${y}`;
				} else {
					pathData += ` L ${x} ${y}`;
				}
			});
			path.setAttribute('d', pathData);
		}

		function startAnimation() {
			if (!path || !glow) return;

			cancelAnimationFrame(animationFrameId);
			const pathLength = path.getTotalLength();
			let distance = 0;
			glow.style.opacity = '1';

			function animate() {
				distance += 2; // Prędkość animacji
				if (distance > pathLength) {
					cancelAnimationFrame(animationFrameId);
					// Opcjonalnie: ukryj poświatę na końcu
					// glow.style.opacity = '0';
					return;
				}
				const point = path.getPointAtLength(distance);
				glow.style.transform = `translate(${point.x - glow.offsetWidth / 2}px, ${point.y - glow.offsetHeight / 2}px)`;
				animationFrameId = requestAnimationFrame(animate);
			}
			animate();
		}

		const timelineObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						drawPath();
						setTimeout(startAnimation, 200);
						timelineObserver.unobserve(timeline);
					}
				});
			}, {
				threshold: 0.5
			}
		);
		timelineObserver.observe(timeline);

		window.addEventListener('resize', () => {
			// Przy zmianie rozmiaru, tylko przerysuj ścieżkę
			// Nie restartujemy animacji, jeśli już się zaczęła
			drawPath();
		});
	}
});