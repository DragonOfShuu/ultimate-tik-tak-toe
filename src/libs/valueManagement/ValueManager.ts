import { invertObject } from "../objectEdit";
import topSort, { fillDependencies, TopSortableType } from "../topologicalSort";
import { Rule } from "./rules";
import { KeyValueRuleType, RuleList, ValueDataType } from "./RuleTypes";

const parseChanges = <T extends ValueDataType>(
    curr: T,
    changes: Partial<T>,
    rules: RuleList<T>,
): Partial<T> => {
    // Process base changes
    const {data: shallowChanges, implementedChanges} = shallowParseChange(curr, changes, rules)
    
    // Process side effects from changes
    const finalData = reactImplementChanges(
        Object.keys(implementedChanges),
        shallowChanges,
        rules,
    );

    return finalData;
};

const reactImplementChanges = <T extends ValueDataType>(
    changeKeys: string[],
    currentData: T,
    rules: RuleList<T>,
): T => {
    /** The keys that changed on the previous iteration */
    let newChangeKeys = [...changeKeys];
    /** The current state of the data */
    let data = {...currentData};
    /** The amount of times a key has been discovered */
    const increments: { [x in keyof T]: number } = Object();
    /** All changes that have occurred */
    const allChanges: Partial<T>[] = [];

    while (newChangeKeys.length) {
        const notChanged = invertObject<T>(currentData, changeKeys);

        const sideEffectChanges = Object.entries(notChanged).reduce<Partial<T>>((prev, [propertyName])=> {
            const changes = rules[propertyName].adjust(data, propertyName)
            return {...prev, ...changes}
        }, {});

        if (!Object.keys(sideEffectChanges).length) break;

        const { data: newData, implementedChanges } = shallowParseChange(data, sideEffectChanges, rules);

        allChanges.push(implementedChanges);

        Object.keys(implementedChanges).forEach(propertyName=> {
            increments[propertyName as keyof T] = (increments[propertyName]??0)+1;
            if (increments[propertyName] > 2) {
                throw new Error('An infinite cycle of side effects has been discovered')
            }
        });

        data = newData;
        newChangeKeys = Object.keys(implementedChanges);
        console.log(allChanges);
    }

    return data;
};

export const shallowParseChange = <T extends ValueDataType>(
    curr: T,
    changes: Partial<T>,
    rules: RuleList<T>,
) => {
    const currDataSortable: TopSortableType[] = convertToTopSortable(
        curr,
        rules,
    );
    const changesSortable: TopSortableType[] = convertToTopSortable(
        changes,
        rules,
    );

    const { sortable: changesAndDependenciesSortable, added } = fillDependencies(currDataSortable, changesSortable);

    const rulesOrder = topSort(changesAndDependenciesSortable).filter((x)=> !added.includes(x.label));

    const keyValueRule = convertToKeyValueRule(rulesOrder, changes, rules);
    const { newData, changes: implementedChanges } = processChanges(
        keyValueRule,
        curr,
    );

    return { data: newData, implementedChanges }
}

const convertToTopSortable = <T extends ValueDataType>(
    changes: Partial<T>,
    rules: RuleList<T>,
) => {
    return Object.keys(changes).map<TopSortableType>((key) => {
        return {
            label: key,
            dependents: rules[key as keyof T].requirements() as string[],
        };
    });
};

const convertToKeyValueRule = <T extends ValueDataType>(
    x: TopSortableType[],
    changes: Partial<T>,
    rules: RuleList<T>,
): KeyValueRuleType<T>[] => {
    return x.map((r) => {
        const newValue: T[string] | undefined = changes[r.label];
        const newRule = rules[r.label];

        if (newValue === undefined) throw new Error("Changes does not contain what is intended to be converted");

        return {
            key: r.label,
            value: newValue,
            rule: newRule,
        };
    });
};

const processChanges = <T extends ValueDataType>(
    x: KeyValueRuleType<T>[],
    currData: T,
) => {
    let newCurr = { ...currData };
    let changes: Partial<T> = {};

    x.forEach((v) => {
        const change = parseChange(
            newCurr,
            v.key,
            v.value as T[keyof T],
            v.rule,
        );
        changes = { ...changes, ...change };
        newCurr = { ...newCurr, ...change };
    });

    return { newData: newCurr, changes };
};

export const parseChange = <T extends ValueDataType>(
    curr: T,
    key: keyof T,
    value: T[keyof T],
    rule: Rule<T>,
) => {
    // If this change isn't even a change, ignore it
    if (curr[key] === value) return {};
    const allowed = rule.test(curr, value);
    return allowed ? { [key]: value } : {};
};

export default parseChanges;
