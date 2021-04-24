// b-search array to find the stop with arrival time after target
export const findNextStopIndex_BSearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        const time = parseInt(arr[mid].arrival.time, 10);

        // train has yet to arrive
        if (time >= target) {
            right = mid;
        }
        // train has past this stop
        else {
            left = mid + 1;
        }
    }

    return left;
}

// current stop is likely to be found within the first few indicies
export const findNextStopIndex_Linear = (arr, target) => {
    let i = 0;
    while (i < arr.length) {
        const time = parseInt(arr[i].arrival.time, 10);
        if (target < time) {
            return i;
        }
        i++;
    }
    return i;
}