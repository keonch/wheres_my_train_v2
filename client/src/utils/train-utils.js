export function interpolatePosition(p1, p2, duration, t) {
    let k = t / duration;
    k = (k > 0) ? k : 0;
    k = (k > 1) ? 1 : k;
    return {
        lat: (p1.lat + k * (p2.lat - p1.lat)),
        lng: (p1.lng + k * (p2.lng - p1.lng))
    };
};