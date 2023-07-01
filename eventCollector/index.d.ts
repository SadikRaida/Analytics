declare module 'raidalytics' {
    export function sendEvent(event: string, eventDetails?: object, inactivityPeriod?: number): void;
    export function eventCollect(event: string, eventDetails?: object, inactivityPeriod?: number): Promise<void>;
    export function initMouseTracking(): void;
}