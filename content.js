
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
                console.log(el)
            }
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "adjustFonts") {
        removeAds()
        document.body.style.fontFamily = request.fontFamily;
        document.body.style.fontSize = request.fontSize;
        document.body.style.lineHeight = request.lineHeight;
        document.querySelectorAll("*").forEach(el => {
            el.style.backgroundColor = request.background
            el.style.color = request.color
        }) 
        console.log(request.isOn)

        //sendResponse({ message: 'Readability enhanced' });
    }

    if (request.action === "removeAds") {
        removeAds()
    }
});


