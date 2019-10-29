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

export { getRandomDate }