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

//Fonction qui prend en paramètre un nom d'event, un objet custom et une periode d'inactivité custom
function sendEvent(event ,eventDetails = {}, inactivityPeriod) {
    const parser = new UAParser();
    const result = parser.getResult();

    idVisitor = idVisitor || window.btoa(result.ua + window.innerWidth + 'x' + window.innerHeight);

    const data = {
        idVisitor,
        idSession,
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

    const beaconData = new Blob([JSON.stringify(wrappedData)], {type: 'application/json'});

    // Use Beacon API instead of axios
    if (!navigator.sendBeacon('http://localhost:4000/events', beaconData)) {
        console.error('Beacon API call failed');
    }
    
    resetSessionTimeout(inactivityPeriod);
}

window.addEventListener('unload', () => {
    clearTimeout(sessionTimeout); // Ensure the timeout is removed on tab/browser close
});

export default sendEvent;
