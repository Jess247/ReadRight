
let isOn = false

document.getElementById('adjustFonts').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "adjustFonts",
            fontFamily: "Arial, sans-serif",
            fontSize: "1.2rem",
            lineHeight: "1.6",
            background: "#FBF0E5",
            color: "#000000",
            isOn:isOn
        });
    });
});
