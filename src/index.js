module.exports = function check(str, bracketsConfig) {
    let opening = {}, closing = {}, count = {}, theSame = {};
    let stack = [];

    bracketsConfig.forEach((item) => {
        if (item[0] === item[1]) {
            theSame[item[0]] = true;
            opening[`${item[0]}+`] = `${item[0]}-`;
            closing[`${item[1]}-`] = `${item[0]}+`;
            count[`${item[0]}+`] = 0;
            count[`${item[1]}-`] = 0;
        } else {
            opening[`${item[0]}`] = item[1];
            closing[`${item[1]}`] = item[0];
            count[`${item[0]}`] = 0;
            count[`${item[1]}`] = 0;
        }
    });

    let arr = str.split('').map((i) => {
        let temp;
        if (theSame[i] === undefined) {
            temp = i;
        } else if (theSame[i]) {
            temp = `${i}+`;
            theSame[i] = false;
        } else {
            temp = `${i}-`;
            theSame[i] = true;
        }
        return temp;
    });


    arr.forEach((currentValue) => {
        count[currentValue] = +count[currentValue] + 1;
        if (opening[currentValue]) stack.push(currentValue)
        else {
            if (stack.length === 0 || stack[stack.length - 1] !== closing[currentValue]) return false;
            let br = stack.pop();
            currentValue = opening[br];
        }
    });

    for (let key in opening) {
        let a = count[key];
        let b = count[opening[key]];
        if (a !== b) return false;
    }

    return stack.length <= 0;
}
