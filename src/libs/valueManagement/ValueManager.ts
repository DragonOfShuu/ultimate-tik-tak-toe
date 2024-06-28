import topSort, { TopSortableType } from "../topologicalSort";
import { Rule } from "./rules";
import { RuleList } from "./RuleTypes";

const parseChanges = <T extends { [x: string]: unknown }>(
    curr: T,
    changes: Partial<T>,
    rules: RuleList<T>,
): Partial<T> => {
    let newCurr = { ...curr };

    const changesAndRules: TopSortableType[] = Object.entries(
        changes,
    ).map<TopSortableType>(([key]) => {
        return {
            label: key as string,
            dependents: rules[key as keyof T].requirements() as string[],
        };
    });

    const rulesOrder = topSort(changesAndRules);

    rulesOrder
        .map((r) => {
            return {
                key: r.label,
                value: changes[r.label],
                rule: rules[r.label],
            };
        })
        .forEach((v) => {
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

export const parseChange = <T extends { [x: string]: unknown }>(
    curr: T,
    key: keyof T,
    value: T[keyof T],
    rule: Rule<T>,
) => {
    const allowed = rule.test(curr, value);
    return allowed ? { [key]: value } : {};
};

export default parseChanges;
