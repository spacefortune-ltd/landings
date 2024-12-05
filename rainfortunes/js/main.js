const mainInfo = document.querySelector('.main-info');
const historyInfo = document.querySelector('.history-info');
const arrowLink = document.querySelector('a.arrow-link');


// Create one observer for all elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('screen'); // Add class to the element in view
        } else {
            entry.target.classList.remove('screen'); // Remove class when out of view
        }
    });
}, { threshold: 0.8 });

observer.observe(mainInfo);
observer.observe(historyInfo);

document.addEventListener('scroll', ()=> {
    if(mainInfo.classList.contains('screen')) {
        arrowLink.href = "#history";
        arrowLink.classList.remove('up')
    }
    if(historyInfo.classList.contains('screen')) {
        arrowLink.href = "#main";
        arrowLink.classList.add('up')
    }
})

const sections = [mainInfo, historyInfo];

const checkVisibilityAndAddTranslate = () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;

        // Calculate the visible part of the section
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        const visibilityPercentage = (visibleHeight / sectionHeight) * 100;

        if (visibilityPercentage <= 10) {
            section.classList.add('translate');
        } else {
            section.classList.remove('translate');
        }
    });
};

// Attach the scroll event
document.addEventListener('scroll', checkVisibilityAndAddTranslate);

// Run once on page load to ensure initial state
checkVisibilityAndAddTranslate();


const checkVisibility = () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;

        // Calculate the visible part of the section
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        const visibilityPercentage = (visibleHeight / sectionHeight) * 100;
        if (visibilityPercentage > 90) {
            section.classList.add('screen');
        } else {
            section.classList.remove('screen');
        }
        if(mainInfo.classList.contains('screen')) {
            arrowLink.href = "#history";
            arrowLink.classList.remove('up')
        }
        if(historyInfo.classList.contains('screen')) {
            arrowLink.href = "#main";
            arrowLink.classList.add('up')
        }
    });
};


checkVisibility();