export type TopSortableType = {
    label: string,
    dependents: string[],
}

const topSort = (sortable: TopSortableType[]): TopSortableType[] => {
    const newSortable = [...sortable];
    const finishedSort: TopSortableType[] = []

    // While there are still nodes...
    while (newSortable.length > 0) {
        // find the current sortable length
        const oldSortableLength = newSortable.length;
        // For each node...
        [...newSortable].forEach((item)=> {
            // Check if we have all necessary dependencies in this list
            if (!containsAll(item.dependents, getLabels(finishedSort)))
                // If not, proceed to the next item
                return
            // If we do, add it to the list
            finishedSort.push(item)
            // And remove it from the graph
            newSortable.splice((newSortable.indexOf(item)), 1)
        })

        // If the current length is the same as before...
        if (oldSortableLength === newSortable.length)
            // Throw error, because all remaining nodes must be referencing each other
            throw new Error(`Remaining nodes are refrencing each other... ${getLabels(newSortable).join(', ')}`);
    }

    return finishedSort;
}

const containsAll = (partial: string[], fullList: string[]) => {
    return partial.every((v)=> fullList.includes(v));
}

const getLabels = (items: TopSortableType[]) => {
    return items.map((i)=> i.label);
}

export default topSort;
