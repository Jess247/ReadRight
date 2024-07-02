
let isOn = false

document.getElementById('adjustFonts').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "adjustFonts",
            fontFamily: "Arial, sans-serif",
            fontSize: "1.3rem",
            lineHeight: "1.6",
            letterSpacing: ""
        });
    });
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

// $bg-clr: #202020;
// $txt-clr: #fefefe;
// $txt-dark: #0e0e0e;

// // theme colors
// $dark-theme: $bg-clr;
// $light-theme: $txt-clr;
// $peach-theme: #ffdda1;
// $yellow-theme: #f9ffd5;
// $blue-theme: #bde0fe;