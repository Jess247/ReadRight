
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
            if (word.length > 0) {
                return `<span id="bold">${word[0]}</span>${word.slice(1)}`;
            }
            return word;
        });
        const span = document.createElement('span');
        span.innerHTML = newWords.join(' ');
        return span;
    } else {
        const newNode = node.cloneNode(false); // Shallow clone to avoid duplicating child nodes
        node.childNodes.forEach(child => {
            newNode.appendChild(boldFirstLetter(child));
        });
        return newNode;
    }
};



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "adjustFonts") {
        const body = document.body
        const paragraphEls = document.querySelectorAll('p')
        const divEls = document.querySelectorAll('div')
        const emElements = document.querySelectorAll('em')
        


        
        // first letter bold
        const newBody = boldFirstLetter(body)
        body.replaceWith(newBody)
        
        // adjust hmtl tag font
        document.documentElement.style.setProperty('font-family', request.fontFamily, 'important')
        document.documentElement.style.setProperty('letter-spacing', request.letterSpacing, 'important')
        document.documentElement.style.setProperty('word-spacing', request.wordSpacing, 'important')
        document.documentElement.style.fontSize = request.fontSize
        
        // adjust body fonts
        document.body.style.setProperty('font-family', request.fontFamily, 'important')

        divEls.forEach(el => el.style.fontFamily = 'inherit')
        // body.style.letterSpacing = request.letterSpacing
        // body.style.wordSpacing = request.wordSpacing
        
        // adjust inline elements
        paragraphEls.forEach(el => el.style.setProperty('font-style', request.fontStyle, 'important'))

        emElements.forEach(el => el.style.fontStyle = request.fontStyle)

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


