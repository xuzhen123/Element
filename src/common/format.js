
export const toPages = (array, size) => {
    if (array === null || array === undefined) {
        return null;
    }
    let count = (array.length - 1) / size + 1;
    let pages = [];

    for (var i = 0; i < count; ++i) {
        pages.push(array.slice(i * size, (i + 1) * size));
    }

    return pages;
};

export const toPercentage = (number) => {
    if (number === null || number === undefined) {
        return null;
    }
    return `${(number * 100).toFixed(2)}%`;
};

export const toDateTime = (datetime, format = 'yyyy/MM/dd HH:mm:ss', local = true) => {
    if (datetime === null || datetime === undefined) {
        return null;
    }
    let date = new Date(datetime);
    const opt = {
        "y+": (local ? date.getFullYear() : date.getUTCFullYear()).toString(),
        "M+": ((local ? date.getMonth() : date.getUTCMonth()) + 1).toString(),
        "d+": (local ? date.getDate() : date.getUTCDate()).toString(),
        "H+": (local ? date.getHours() : date.getUTCHours()).toString(),
        "m+": (local ? date.getMinutes() : date.getUTCMinutes()).toString(),
        "s+": (local ? date.getSeconds() : date.getUTCSeconds()).toString()
    };
    let ret;
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(format);
        if (ret) {
            format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return format;
};