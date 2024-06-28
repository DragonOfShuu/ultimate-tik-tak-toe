import { expect, test } from "vitest";
import topSort, { TopSortableType } from "../../libs/topologicalSort";

const convertToString = (convertable: TopSortableType[]) => {
    return convertable.map((t) => t.label).join("");
};

test("Sort a non-dependent graph", () => {
    const sortable: TopSortableType[] = [
        {
            label: "a",
            dependents: [],
        },
        {
            label: "b",
            dependents: [],
        },
        {
            label: "c",
            dependents: [],
        },
    ];

    expect(convertToString(topSort(sortable))).toBe("abc");
});

test("Sort a simple dependency graph", () => {
    const sortable: TopSortableType[] = [
        {
            label: "a",
            dependents: ["b"],
        },
        {
            label: "b",
            dependents: ["c"],
        },
        {
            label: "c",
            dependents: [],
        },
    ];

    expect(convertToString(topSort(sortable))).toBe("cba");
});

test("Sort a multi-dependant graph", () => {
    const sortable: TopSortableType[] = [
        {
            label: "a",
            dependents: [],
        },
        {
            label: "b",
            dependents: ["a"],
        },
        {
            label: "c",
            dependents: ["e"],
        },
        {
            label: "d",
            dependents: ["f"],
        },
        {
            label: "e",
            dependents: ["b", "f", "d"],
        },
        {
            label: "f",
            dependents: ["a"],
        },
    ];

    expect(convertToString(topSort(sortable))).toBe("abfdec");
});

test("Sort a multi-dependant graph -- 2", () => {
    const sortable: TopSortableType[] = [
        {
            label: "a",
            dependents: ["b", "d"],
        },
        {
            label: "b",
            dependents: [],
        },
        {
            label: "c",
            dependents: ["d", "a"],
        },
        {
            label: "d",
            dependents: [],
        },
        {
            label: "e",
            dependents: ["f", "b"],
        },
        {
            label: "f",
            dependents: ["b", "c"],
        },
    ];

    expect(convertToString(topSort(sortable))).toBe("bdacfe");
});

test("Detect a simple cyclic graph", () => {
    const sortable: TopSortableType[] = [
        {
            label: "a",
            dependents: ["a"],
        },
    ];

    expect(() => topSort(sortable)).toThrow("... a");
});

test("Detect a 3-part cyclic graph", () => {
    const sortable: TopSortableType[] = [
        {
            label: "a",
            dependents: ["b"],
        },
        {
            label: "b",
            dependents: ["c"],
        },
        {
            label: "c",
            dependents: ["a"],
        },
    ];

    expect(() => topSort(sortable)).toThrow("... a, b, c");
});

test("Detect a hidden cyclic sub-graph", () => {
    const sortable: TopSortableType[] = [
        {
            label: "a",
            dependents: [],
        },
        {
            label: "b",
            dependents: ["a"],
        },
        {
            label: "c",
            dependents: ["a"],
        },
        {
            label: "d",
            dependents: ["c", "e"],
        },
        {
            label: "e",
            dependents: ["d"],
        },
    ];

    expect(() => topSort(sortable)).toThrow("... d, e");
});
