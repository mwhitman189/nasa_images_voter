function getRandomDate(startYear) {
    let start = new Date().setFullYear(startYear);
    let end = new Date();
    let unformatted_date = new Date(start + Math.random() * (end - start));
    let year = unformatted_date.getFullYear();
    let month = unformatted_date.getMonth() + 1;
    let dateOfMonth = unformatted_date.getDate();
    let randDate = `${year}-${month}-${dateOfMonth}`;

    return randDate;
}

function sum(array) {
    return array.reduce((accumulator, currValue) => accumulator + currValue);
}

function getMean(array) {
    return sum(array) / array.length;
}

function getSD(array) {
    // Calculat the Standard Deviation
    let mean = getMean(array);
    let squaredDiffs = array.map(x => Math.pow((x - mean), 2));
    let meanOfSquaredDiffs = (sum(squaredDiffs) / (squaredDiffs.length - 1));
    let sd = Math.sqrt(meanOfSquaredDiffs);
    return sd
}

export {
    getRandomDate,
    getSD,
    getMean,
}