type DataItem = {
    timestamp: string;
    [key: string]: any; // substituez 'any' par le type réel des autres éléments si possible
};

export type GroupedDataItem = {
    day: string;
    items: DataItem[];
};

export function FormatDataGraph(data: DataItem[]): GroupedDataItem[] {
    const groupedData = data.reduce((result: { [key: string]: DataItem[] }, item: DataItem) => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toISOString().slice(0, 10);
        const day = date.getDate().toString();
        const month = (date.getMonth() + 1).toString(); // Les mois sont indexés à partir de zéro, donc ajoutez 1

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

    const result: GroupedDataItem[] = Object.entries(groupedData).map(([groupKey, items]) => {
        const [day, month] = groupKey.split('-');
        const formattedDay = day.padStart(2, '0'); // Ajoute un zéro au début si nécessaire
        const formattedMonth = month.padStart(2, '0'); // Ajoute un zéro au début si nécessaire
        const formattedYear = items[0].formattedTimestamp.slice(0, 4); // Extrait l'année du premier élément

        return {
            day: `${formattedDay}-${formattedMonth}-${formattedYear}`,
            items,
        };
    });

    result.sort((a, b) => {
        const [dayA, monthA, yearA] = a.day.split('-').map(Number);
        const [dayB, monthB, yearB] = b.day.split('-').map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateA.getTime() - dateB.getTime();
    });

    return result;
}
