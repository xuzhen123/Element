export const getText = (array, number, flags, exclude = true) => {
    if (array === null || array === undefined) {
        return null;
    }
    if (flags) {
        let _array = [];
        array.forEach((item) => {
            if (exclude && item.value === 0) {
                return;
            }
            if ((number & item.value) === item.value) {
                _array.push(item.text);
            }
        });
        return _array;
    }
    else {
        for (let item of array) {
            if (number === item.value) {
                return item.text;
            }
        }
    }
};

export const toInt = (values) => {
    if (values === null || values === undefined) {
        return null;
    }
    let number = 0;
    values.forEach((v) => {
        number |= v
    });
    return number;
};

export const toArray = (array, number) => {
    if (array === null || array === undefined) {
        return null;
    }
    let _array = [];
    array.forEach((item) => {
        if ((number & item.value) === item.value) {
            _array.push(item.value);
        }
    });
    return _array;
};

