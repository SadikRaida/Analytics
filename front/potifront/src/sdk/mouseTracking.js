import throttle from 'lodash.throttle';
import sendEvent from './clientTracker';

let mouseTrackingEvents = [];

// Throttling to every 200ms.
const throttledHandler = throttle((event) => {
    mouseTrackingEvents.push({
        mouseX: event.clientX,
        mouseY: event.clientY,
        timestamp: new Date().toISOString(),
        type: 'mouseTracking',
        tag: 'mouseTracking'
    });

    if (mouseTrackingEvents.length >= 50) {
        sendBatch();
    }
}, 200);

function sendBatch() {
    // Send a batch of 50 events
    sendEvent('mouseTrackingBatch', { events: mouseTrackingEvents });
    // Clear the events
    mouseTrackingEvents = [];
}

window.addEventListener('mousemove', throttledHandler);
window.addEventListener('beforeunload', () => {
    // If there are any remaining events when the user leaves the page, send them.
    if (mouseTrackingEvents.length > 0) {
        sendBatch();
    }
});
