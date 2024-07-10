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

const wrapFirstLetter = (text) => {
    return text.replace(/\b(\w)/g, '<span class="bold-first-letter">$1</span>');
};

const boldFirstLetterOfWords = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const span = document.createElement('span');
        span.innerHTML = wrapFirstLetter(node.textContent);
        return span;
    } else {
        const newNode = node.cloneNode(false); // Shallow clone to avoid duplicating child nodes
        node.childNodes.forEach(child => {
            newNode.appendChild(boldFirstLetterOfWords(child));
        });
        return newNode;
    }
};

const adjustFonts = (request) => {
    const body = document.body;
    const newBody = boldFirstLetterOfWords(body);
    body.replaceWith(newBody);

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
