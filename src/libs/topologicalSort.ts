import { invertList } from "./objectEdit";

export type TopSortableType = {
    label: string;
    dependents: string[];
};

export type TopSortableObjectType = {
    [label: string]: string[];
};

/**
 * Sorts data topologically, so all dependencies are completed before
 * dependents are completed.
 * @param sortable Sortable data
 * @returns Topologically sorted data
 */
const topSort = (sortable: TopSortableType[]): TopSortableType[] => {
    const newSortable = [...sortable];
    const finishedSort: TopSortableType[] = [];

    // While there are still nodes...
    while (newSortable.length > 0) {
        // find the current sortable length
        const oldSortableLength = newSortable.length;
        // For each node...
        [...newSortable].forEach((item) => {
            // Check if we have all necessary dependencies in this list
            if (!containsAll(item.dependents, getLabels(finishedSort)))
                // If not, proceed to the next item
                return;
            // If we do, add it to the list
            finishedSort.push(item);
            // And remove it from the graph
            newSortable.splice(newSortable.indexOf(item), 1);
        });

        // If the current length is the same as before...
        if (oldSortableLength === newSortable.length)
            // Throw error, because all remaining nodes must be referencing each other
            throw new Error(
                `Remaining nodes are refrencing each other... ${getLabels(newSortable).join(", ")}`,
            );
    }

    return finishedSort;
};

const containsAll = (partial: string[], fullList: string[]) => {
    return partial.every((v) => fullList.includes(v));
};

const getLabels = (items: TopSortableType[]) => {
    return items.map((i) => i.label);
};

export const sortableListToObject = (
    sortable: TopSortableType[],
): TopSortableObjectType => {
    return Object.fromEntries(sortable.map((s) => [s.label, s.dependents]));
};

export const sortableObjectToList = (
    sortable: TopSortableObjectType,
): TopSortableType[] => {
    return Object.entries(sortable).map(([label, dependents]) => {
        return {
            label,
            dependents,
        };
    });
};

export const fillDependencies = (
    fullData: TopSortableType[],
    partialData: TopSortableType[],
) => {
    const fullDataObject = sortableListToObject(fullData);
    const addedDependencies: string[] = [];

    const withDependencies: TopSortableType[] = partialData.reduce<TopSortableType[]>((prev, curr, _, all)=> {
        prev.push(curr);
        const missing = invertList(curr.dependents, getLabels(all));
        if (!missing.length) return prev;

        missing.forEach((missingDependency)=> {
            addedDependencies.push(missingDependency);
            prev.push({ label: missingDependency, dependents: fullDataObject[missingDependency] })
        })

        return prev;
    }, [])

    return { sortable: withDependencies, added: addedDependencies };
};

export default topSort;
