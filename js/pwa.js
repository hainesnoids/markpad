// this script manages light/dark mode and PWA detection, injecting pwa.css if so.

function pwaInstalled() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        // your code here
    }
}
function pageColorScheme() {
    determineColorScheme();
    if (matchMedia) {
        const mql = window.matchMedia("(prefers-color-scheme: light)");
        const mqd = window.matchMedia("(prefers-color-scheme: dark)");
        mql.addEventListener('change', colorSchemeMediaQuery);
        mqd.addEventListener('change', colorSchemeMediaQuery);
        function colorSchemeMediaQuery() {
            determineColorScheme();
        }
    }

}
function determineColorScheme() {
    let colorScheme = localStorage.getItem('color-scheme');
    if (!colorScheme) {
        localStorage.setItem('color-scheme', 'auto');
        colorScheme = 'auto';
    }
    const themeButton = document.querySelector('.theme-button');
    const themeIcon = themeButton.querySelector('.material-symbols-outlined');
    const themeText = themeButton.querySelector('.nav-label');
    switch (colorScheme) {
        case 'auto': {
            // use media queries to determine the theme to use
            // document.body.classList.add(`color-scheme-auto`);
            themeIcon.innerHTML = 'routine';
            themeText.innerHTML = 'auto';
            if (window.matchMedia('(prefers-color-scheme: light)').matches) { // light mode
                setColorScheme('light');
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { // light mode
                setColorScheme('dark');
            }
            break;
        }
        case 'light': {
            setColorScheme(colorScheme);
            themeIcon.innerHTML = 'light_mode';
            themeText.innerHTML = 'light';
            break;
        }
        case 'dark': {
            setColorScheme(colorScheme);
            themeIcon.innerHTML = 'dark_mode';
            themeText.innerHTML = 'dark';
            break;
        }
    }
}

function setColorScheme(targetColorScheme) {
    document.body.classList.forEach((itm) => {
        if (/^color-scheme-/.test(itm)) {
            document.body.classList.remove(itm);
        }
    })
    document.body.classList.add(`color-scheme-${targetColorScheme}`);
    const bgPalette = window.getComputedStyle(document.body).getPropertyValue('--pal-bg');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', bgPalette);
}

function saveColorScheme(targetColorScheme) {
    localStorage.setItem('color-scheme', targetColorScheme);
}

async function toggleColorScheme() {
    const themeButton = document.querySelector('.theme-button');
    const themeIcon = themeButton.querySelector('.material-symbols-outlined');
    const themeText = themeButton.querySelector('.nav-label');
    switch (themeIcon.innerHTML) {
        case 'routine': { // auto --> light
            saveColorScheme('light');
            determineColorScheme();
            break;
        }
        case 'light_mode': { // light --> dark
            saveColorScheme('dark');
            determineColorScheme();
            break;
        }
        case 'dark_mode': { // dark --> auto
            saveColorScheme('auto');
            determineColorScheme();
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', pwaInstalled);
document.addEventListener('DOMContentLoaded', pageColorScheme);