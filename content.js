
console.log('Content script loaded');

const removeAds = () => {
            //    // Remove elements related to ads
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
}


const boldFirstLetter = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(' ');
        const newWords = words.map(word => {
            if (word.length > 0 ) {
                return `<span id="bold">${word[0]}</span>${word.slice(1)}`
            }
            return word;
        });
        const span = document.createElement('span');
        span.innerHTML = newWords.join(' ');
        return span;
    } else {
        const newNode = node.cloneNode();
        node.childNodes.forEach(child => {
            newNode.appendChild(boldFirstLetter(child));
        });
        return newNode;
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "adjustFonts") {
        const paragraphEls = document.querySelectorAll('p')
        const listEls = document.querySelectorAll('li')
        const divEls = document.querySelectorAll('div')
        const emElements = document.querySelectorAll('em')

        paragraphEls.forEach(el => {
            const newElement = boldFirstLetter(el);
            el.replaceWith(newElement);
        })

        listEls.forEach(el => {
            const newElement = boldFirstLetter(el);
            el.replaceWith(newElement);
        })

        // divEls.forEach(el => {
        //     const newElement = boldFirstLetter(el);
        //     el.replaceWith(newElement);
        // })

        document.body.style.fontFamily = request.fontFamily;
        document.body.style.fontSize = request.fontSize;

        emElements.forEach(el => {
            el.style.fontStyle = request.fontStyle
        })
        document.body.style.letterSpacing = request.letterSpacing
        document.body.style.wordSpacing = request.wordSpacing
        sendResponse({ message: 'Readability enhanced' });
    }

    if(request.action === "changeTheme") {
        document.querySelectorAll("*").forEach(el => {
            el.style.backgroundColor = request.background
            el.style.color = request.color
        })
    }

    if (request.action === "removeAds") {
        removeAds()
    }
});


