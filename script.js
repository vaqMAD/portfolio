// Czekamy, aż cały dokument HTML zostanie wczytany
document.addEventListener('DOMContentLoaded', function() {

    const options1 = {
        strings: ["Damian Ignaczak | Backend Developer"],
        typeSpeed: 80,   // Prędkość pisania
        backSpeed: 50,   // Prędkość kasowania
        backDelay: 1500, // Opóźnienie przed skasowaniem
        loop: true,      // Kluczowe! Włączamy zapętlanie
        showCursor: true,
        cursorChar: '|', // Możemy zdefiniować własny znak kursora
    };

    new Typed('#typing-effect', options1);


    // === ANIMACJA 2: WPROWADZENIE DO TECH STACKA (JEDNORAZOWA) ===
    const options2 = {
        strings: ["Here's a snapshot of the tools I use. This list is always evolving."],
        typeSpeed: 50,
        loop: false,     // Animacja jednorazowa
        showCursor: true,
        cursorChar: '_',
        onComplete: () => { // Funkcja, która wykona się po zakończeniu pisania
            const skillsTree = document.getElementById('skills-tree');
            // Po krótkiej chwili pokazujemy drzewko z technologiami
            setTimeout(() => {
                if(skillsTree) skillsTree.classList.remove('hidden');
            }, 500);
        }
    };

    // Odpalamy drugą animację z lekkim opóźnieniem, dla lepszego efektu
    setTimeout(() => {
        new Typed('#tech-stack-intro', options2);
    }, 1000); // Start po 1 sekundzie

});