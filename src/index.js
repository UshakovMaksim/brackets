module.exports = function check(str, bracketsConfig) {
    const bracketsConfigFlat = flattened(bracketsConfig).join("");
    return !str.split("").reduce((acc, el) => {
        let bracketIndex = bracketsConfigFlat.indexOf(el);
        let isOpenBracket =
            bracketIndex === bracketsConfigFlat.lastIndexOf(el)
                ? !(bracketIndex % 2)
                : !acc.length || acc[acc.length - 1].closeBarcket !== el;
        if (isOpenBracket || !acc.length) {
            acc.push({
                el,
                closeBarcket: bracketsConfigFlat[bracketIndex + 1] || "",
            });
        } else if (acc[acc.length - 1].closeBarcket === el) {
            acc.pop();
        }
        return acc;
    }, []).length;
};

const flattened = (arr) => [].concat(...arr);
