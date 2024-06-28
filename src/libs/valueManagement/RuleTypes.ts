import { Rule } from "./rules";

export type RuleList<T> = { [x in keyof T]: Rule<T> };
