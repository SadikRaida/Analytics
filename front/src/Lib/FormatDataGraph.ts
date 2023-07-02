export function FormatDataGraph(data, key){
    const groupedData = data.reduce((result, item) => {
        const date = item.timestamp;
        const formattedDate = new Date(date).toISOString().slice(0, 10);
        const day = new Date(date).getDate();
        const month = new Date(date).getMonth() + 1; // Months are zero-based, so add 1

        const groupKey = `${day}-${month}`;
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push({
            ...item,
            formattedTimestamp: formattedDate,
        });

        return result;
    }, {});

    const result = Object.entries(groupedData).map(([key, items]) => {
        const [day, month] = key.split('-');
        const formattedDay = day.padStart(2, '0'); // Add leading zero if necessary
        const formattedMonth = month.padStart(2, '0'); // Add leading zero if necessary
        const formattedYear = items[0].formattedTimestamp.slice(0, 4); // Extract the year from the first item

        return {
            day: `${formattedDay}-${formattedMonth}-${formattedYear}`,
            items,
        };
    });

    result.sort((a, b) => {
        const [dayA, monthA, yearA] = a.day.split('-');
        const [dayB, monthB, yearB] = b.day.split('-');

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateA - dateB;
    });

    return result;
};