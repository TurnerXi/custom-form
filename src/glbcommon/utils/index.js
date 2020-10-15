export function isObject(obj) {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object object]';
}

export function deepClone(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    } else if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    } else {
        let temp = {};
        for (const key of Object.keys(obj)) {
            temp[key] = deepClone(obj[key]);
        }
        return temp;
    }
}