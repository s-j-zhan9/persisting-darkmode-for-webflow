function getSystemPreference() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDarkScheme.matches;
}

function setThemeFromCookie() {
    //set the theme on load, if the preference is stored
    const themeState = document.getElementById('content');
    if (isThemeSelected() == "dark"){
        themeState.className = "dark-mode"
    } else if (isThemeSelected() == "light"){
        themeState.className = "light-mode"
    } else {
        themeState.className = getSystemPreference() ? "dark-mode" : "light-mode"
    }
   }

function setThemeSwitchState() {
    //select the radio buttons on load, if a preference is stored
    if (isThemeSelected() == "dark"){
        document.getElementById('dark').checked = "checked"
        document.getElementById('dark').previousSibling.classList.add("w--redirected-checked");
    }
    else if (isThemeSelected() == "light"){
        document.getElementById('light').checked = "checked"
        document.getElementById('light').previousSibling.classList.add("w--redirected-checked");
    }
    else {
        document.getElementById('auto').checked = "checked"
        document.getElementById('auto').previousSibling.classList.add("w--redirected-checked");
    }
}

   function isThemeSelected() {
    // if user has previously set theme and is stored in browser, return the selected theme
    if(document.cookie.match(/theme=dark/i)) {
        return "dark"
        }
    else if(document.cookie.match(/theme=light/i)) {
        return "light"
        }
    else if (document.cookie.match(/theme=auto/i)) {
        return "auto"
        }
   }

   function toggleTheme() {
    //update cookie on selection
    const themeState = document.getElementById('content');
    let newState;
    if (document.getElementById('dark').checked == true){
        newState = 'dark';
        themeState.className = 'dark-mode';
    } else if (document.getElementById('light').checked == true){
        newState = 'light';
        themeState.className = 'light-mode';
    } else {
        newState = 'auto';
        themeState.className = getSystemPreference() ? "dark-mode" : "light-mode";
    }
    document.cookie = 'theme=' + newState;
   }

   (function() {
    setThemeFromCookie();
    setThemeSwitchState();
    document.getElementById('dark').onchange=toggleTheme;
    document.getElementById('auto').onchange=toggleTheme;
    document.getElementById('light').onchange=toggleTheme;
    window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {toggleTheme()})
   })();
   
   
