import topSort, { TopSortableType } from "../topologicalSort";
import { Rule } from "./rules";
import { KeyValueRuleType, RuleList, ValueDataType } from "./RuleTypes";

const parseChanges = <T extends ValueDataType>(
    curr: T,
    changes: Partial<T>,
    rules: RuleList<T>,
): Partial<T> => {
    const changesAndRules: TopSortableType[] = convertToTopSortable(
        changes,
        rules,
    );

    const rulesOrder = topSort(changesAndRules);

    const keyValueRule = convertToKeyValueRule(rulesOrder, changes, rules);
    const newCurr = processChanges(keyValueRule, curr);

    return newCurr;
};

export const parseChange = <T extends { [x: string]: unknown }>(
    curr: T,
    key: keyof T,
    value: T[keyof T],
    rule: Rule<T>,
) => {
    const allowed = rule.test(curr, value);
    return allowed ? { [key]: value } : {};
};

const reactImplementChanges = () => {
    
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

        if (newValue === undefined) throw new Error("Why can I do this");

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

    x.forEach((v) => {
        const change = parseChange(
            newCurr,
            v.key,
            v.value as T[keyof T],
            v.rule,
        );
        newCurr = { ...newCurr, ...change };
    });

    return newCurr;
};

export default parseChanges;
