import { Rule } from "./rules";

export type ValueDataType = { [x: string]: unknown };

export type RuleList<T> = { [x in keyof T]: Rule<T> };

export type KeyValueRuleType<T> = {
    key: string;
    value: T[keyof T];
    rule: Rule<T>;
};
