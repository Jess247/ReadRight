
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "adjustFonts") {
        const paragraphs = document.querySelectorAll('p')
        const emElements = document.querySelectorAll('em')
        removeAds()

        document.body.style.fontFamily = request.fontFamily;
        document.body.style.fontSize = request.fontSize;
        paragraphs.forEach(el => {
            const words = el.textContent.split(" ")
            const wordEl = words.map(word => {
                if(word.length > 0) {
                    return `<b>${word[0]}</b>${word.slice(1, word.length)}`
                }
                return word
            })
            el.innerHTML = wordEl.join(" ")
            console.log(el)
            
            el.style.lineHeight = request.lineHeight
            el.style.fontStyle = request.fontStyle
        })

        emElements.forEach(el => {
            el.style.fontStyle = request.fontStyle
        })
        document.body.style.letterSpacing = request.letterSpacing
        document.body.style.wordSpacing = request.wordSpacing
        //sendResponse({ message: 'Readability enhanced' });
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


