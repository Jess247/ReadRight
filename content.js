console.log('Content script loaded');

const removeAds = () => {
    const adSelectors = [
        'iframe', 
        '.ad', 
        '.ads',
        '.adthrive-ad',
        '[id*="cls-video"]', 
        '[id^="ad-"]',
        '[id^="-ad"]',
        '[id^="-Ad"]', 
        '[id*=" Ad"]', 
        '[class^="ad-"]',
        '[class^="-ad"]',
        '[class^="-Ad"]', 
        '[class*=" Ad"]', 
        '[class^="ads-"]', 
        '[class*=" Ads"]',
    ];

    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    });
};


const adjustFonts = (request) => {

    const css = `
        body, p, li, div {
            font-family: ${request.fontFamily} !important;
            font-size: ${request.fontSize} !important;
            line-height: ${request.lineHeight} !important;
            letter-spacing: ${request.letterSpacing} !important;
            word-spacing: ${request.wordSpacing} !important;
            font-style: ${request.fontStyle} !important;
        }
        .bold-first-letter {
            font-weight: bold !important;
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    removeAds();
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "adjustFonts") {
        adjustFonts(request);
        sendResponse({ message: 'Readability enhanced' });
    }

    if (request.action === "changeTheme") {
        document.querySelectorAll("*").forEach(el => {
            el.style.backgroundColor = request.background;
            el.style.color = request.color;
        });
    }

    if (request.action === "removeAds") {
        removeAds();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    removeAds();
});
