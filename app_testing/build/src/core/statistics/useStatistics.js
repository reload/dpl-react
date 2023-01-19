"use strict";
// Useful resources for Mapp tracking:
// https://documentation.mapp.com/1.0/en/manual-track-request-25105181.html
// https://documentation.mapp.com/1.0/en/how-to-send-manual-tracking-requests-page-updates-7240681.html
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStatistics = void 0;
function useStatistics() {
    // If the global wts object doesn't exist, it means we are in dev environment.
    // Here instead of actually tracking we just log the data to the console.
    if (!window.wts) {
        window.wts = {
            push(trackingProps) {
                // eslint-disable-next-line no-console
                console.log(`Tracking: ${trackingProps[0]}, ${trackingProps[1]}, ${JSON.stringify(trackingProps[2])}`);
            }
        };
    }
    return {
        track: (eventType, trackParameters) => {
            const eventData = {
                linkId: trackParameters.name,
                customClickParameter: {}
            };
            eventData.customClickParameter[trackParameters.id] =
                trackParameters.trackedData;
            window.wts.push(["send", eventType, eventData]);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                }, 500);
            });
        }
    };
}
exports.useStatistics = useStatistics;
exports.default = {};
