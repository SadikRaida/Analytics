import UAParser from 'ua-parser-js';
import { v4 as uuidv4 } from 'uuid';

let idVisitor;
let idSession = uuidv4();
let sessionTimeout;

function resetSessionTimeout(inactivityPeriod) {
    clearTimeout(sessionTimeout);
    if (inactivityPeriod) {
        sessionTimeout = setTimeout(() => {
            idSession = uuidv4(); //Generate a new idSession after the inactivity period
        }, inactivityPeriod * 1000); //Convert the inactivity period into milliseconds
    }
}


async function eventCollect(event, eventDetails = {}, inactivityPeriod) {
    // send event as usual
    sendEvent(event, eventDetails, inactivityPeriod);
    
    // return a promise that resolves immediately
    return Promise.resolve();
}


//Fonction qui prend en paramètre un nom d'event, un objet custom et une periode d'inactivité custom
async function sendEvent(event, eventDetails = {}, inactivityPeriod, apiKey) {
    const parser = new UAParser();
    const result = parser.getResult();

    idVisitor = idVisitor || window.btoa(result.ua + window.innerWidth + 'x' + window.innerHeight);

    const data = {
        idVisitor,
        idSession,
        apiKey,
        eventType: event,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        eventDetails,
        userData: {
            userAgent: result.ua,
            browser: result.browser.name,
            os: result.os.name,
            device: result.device.model,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        },
    };

    // Wrap 'data' in another object
    const wrappedData = {
        data: data,
    };

    try {
        const response = await fetch('http://localhost:4000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(wrappedData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Fetch API call failed: ', error);
    }

    resetSessionTimeout(inactivityPeriod);
}


window.addEventListener('unload', () => {
    clearTimeout(sessionTimeout); // Ensure the timeout is removed on tab/browser close
});

export { sendEvent, eventCollect };