// --- DOMContentLoaded для прогресс-баров, дневника и контактной формы ---
document.addEventListener('DOMContentLoaded', () => {

    // -------------------- ПРОГРЕСС-БАРЫ --------------------
    const bars = document.querySelectorAll('.bar');

    function animateBar(bar) {
        const level = bar.dataset.level;
        bar.style.width = '0%';
        bar.style.display = 'inline-block';
        bar.style.height = '20px';
        bar.style.backgroundColor = '#4CAF50';
        bar.style.color = '#fff';
        bar.style.textAlign = 'center';
        bar.style.lineHeight = '20px';
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.borderRadius = '4px';
        bar.style.overflow = 'hidden';
        bar.style.fontWeight = 'bold';
        bar.textContent = '0%';

        let current = 0;
        const interval = setInterval(() => {
            if(current >= level) {
                clearInterval(interval);
                bar.textContent = level + '%';
            } else {
                current++;
                bar.style.width = current + '%';
                bar.textContent = current + '%';
            }
        }, 10);
    }

    bars.forEach(bar => animateBar(bar));

    // -------------------- ДНЕВНИК --------------------
    const addButton = document.getElementById('addEntry');
    const timeline = document.querySelector('.timeline');

    if(addButton) {
        addButton.addEventListener('click', () => {
            const today = new Date();
            const dateStr = today.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });

            const entryText = prompt('Введите текст новой записи:');
            if(entryText && entryText.trim() !== '') {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${dateStr}</strong> — ${entryText}`;
                timeline.appendChild(li);
            }
        });
    }

    // -------------------- ДОБАВЛЕНИЕ КУРСА (МОДАЛКА) --------------------
    const courseModal = document.getElementById('courseModal');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const cancelCourse = document.getElementById('cancelCourse');
    const saveCourse = document.getElementById('saveCourse');
    const skillList = document.querySelector('.skill-list');

    if(addCourseBtn && courseModal) {
        addCourseBtn.addEventListener('click', () => courseModal.style.display = 'flex');
        cancelCourse.addEventListener('click', () => courseModal.style.display = 'none');

        saveCourse.addEventListener('click', () => {
            const name = document.getElementById('courseName').value.trim();
            const level = parseInt(document.getElementById('courseLevel').value);

            if(name && !isNaN(level) && level >= 0 && level <= 100) {
                const li = document.createElement('li');
                const span = document.createElement('span');
                span.classList.add('bar');
                span.dataset.level = level;
                li.textContent = name + ' ';
                li.appendChild(span);
                skillList.appendChild(li);
                animateBar(span);
                courseModal.style.display = 'none';
                document.getElementById('courseName').value = '';
                document.getElementById('courseLevel').value = '';
            } else {
                alert('Пожалуйста, введите корректные данные курса и проценты (0-100).');
            }
        });

        window.addEventListener('click', (e) => {
            if(e.target === courseModal) courseModal.style.display = 'none';
        });
    }

    // -------------------- КОНТАКТНАЯ ФОРМА --------------------
    const form = document.getElementById('contactForm');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.elements['name'].value.trim();
            const email = form.elements['email'].value.trim();
            const message = form.elements['message'].value.trim();

            if(!name || !email || !message) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(email)) {
                alert('Введите корректный email.');
                return;
            }

            alert(`Сообщение успешно отправлено!\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`);
            form.reset();
        });
    }

    // -------------------- ПРОЕКТЫ --------------------
    const filterButtons = document.querySelectorAll('.project-filters button');
    const projectCards = document.querySelectorAll('.project-card');

    if(filterButtons.length && projectCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.dataset.filter;

                projectCards.forEach(card => {
                    if(category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

});

// -------------------- МОДАЛЬНОЕ ОКНО ПРОЕКТА --------------------
function openModal(title, tech, screenshots, liveLink, codeLink) {
    const modal = document.getElementById('modal');
    if(!modal) return;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-tech').textContent = tech;
    document.getElementById('modal-screenshots').textContent = screenshots;
    document.getElementById('modal-live').href = liveLink;
    document.getElementById('modal-code').href = codeLink;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if(event.target === modal) closeModal();
};
