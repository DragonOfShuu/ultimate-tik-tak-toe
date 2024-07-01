import { Rule } from "./rules";

export type ValueDataType = { [x: string]: unknown };

export type RuleList<T extends ValueDataType> = { [x in keyof T]: Rule<T> };

export type KeyValueRuleType<T extends ValueDataType> = {
    key: string;
    value: T[keyof T];
    rule: Rule<T>;
};
