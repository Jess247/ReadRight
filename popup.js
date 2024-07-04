
let isOn = false

function disableBtn(btnId) {
    document.getElementById(btnId).disabled = true
}

document.getElementById('adjustFonts').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "adjustFonts",
            fontFamily:'Arial, Helvetica, sans-serif',
            fontSize: "1.2rem",
            lineHeight: "1.5em",
            letterSpacing: ".1em",
            wordSpacing: ".5em",
            fontStyle: "normal",
            fontWeight: "800"
        });
    });

    disableBtn('adjustFonts')
});

document.getElementById('dark').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'changeTheme',
            background: "#202020",
            color: "#fefefe"
        });
    });
});

document.getElementById('light').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'changeTheme',
            background: "#fefefe",
            color: "#0e0e0e"
        });
    });
});

document.getElementById('peach').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'changeTheme',
            background: "#ffdda1",
            color: "#0e0e0e"
        });
    });
});

document.getElementById('yellow').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'changeTheme',
            background: "#f9ffd5",
            color: "#0e0e0e"
        });
    });
});

document.getElementById('blue').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'changeTheme',
            background: "#bde0fe",
            color: "#0e0e0e"
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id,{
            action:"removeAds"
        })
    })
});

