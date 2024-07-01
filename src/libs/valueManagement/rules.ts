import { ValueDataType } from "./RuleTypes";

export abstract class Rule<T extends ValueDataType> {
    public abstract test(curr: T, value: T[keyof T]): boolean;
    public abstract requirements(): (keyof T)[];
    public abstract adjust(curr: T, key: string): Partial<T>;
}

type MinMaxType<T extends ValueDataType> = 
    number | keyof T | null


export class MinMaxRule<T extends ValueDataType> extends Rule<T> {
    min: MinMaxType<T>;
    max: MinMaxType<T>;

    constructor(min: MinMaxType<T>, max: MinMaxType<T>) {
        super();
        this.min = min;
        this.max = max;
    }

    public requirements(): (keyof T)[] {
        const list: (keyof T)[] = [];

        if (typeof this.min === "string") list.push(this.min);
        if (typeof this.max === "string") list.push(this.max);

        return list;
    }

    test(curr: T, value: T[keyof T]): boolean {
        if (typeof value !== "number")
            throw new Error(
                "Value is expected to be of type number for MinMaxRule",
            );

        switch (typeof this.min) {
            case "number": {
                if (value < this.min) return false;
                break;
            }
            case "string": {
                const otherValue = curr[this.min] as number;
                if (value < otherValue) return false;
                break;
            }
            case "object":
                if (this.min === null) break;
                throw new Error("Min was an unexpected type");

            default: {
                throw new Error("Min was an unexpected type");
            }
        }

        switch (typeof this.max) {
            case "number": {
                if (value > this.max) return false;
                break;
            }
            case "string": {
                const otherValue = curr[this.max] as number;
                if (value > otherValue) return false;
                break;
            }
            case "object":
                if (this.max === null) break;
                throw new Error("Max was an unexpected type");

            default: {
                throw new Error("Max was an unexpected type");
            }
        }

        return true;
    }

    private minMaxToNumber(x: MinMaxType<T>, curr?: T) {
        return typeof x==='string'&&curr ? curr[x] as number : null
    }

    private verifyMinMax(curr?: T, min?: MinMaxType<T>, max?: MinMaxType<T>): void {
        const oldMin = this.minMaxToNumber(min??this.min, curr);
        const oldMax = this.minMaxToNumber(max??this.max, curr);

        if (oldMin===null||oldMax===null) return;
        if (oldMin > oldMax) throw new Error("Minimum cannot be higher than maximum");
    }

    adjust(curr: T, key: keyof T): Partial<T> {
        if (typeof this.max !== "string" && typeof this.min !== "string") return {}

        this.verifyMinMax(curr);

        const value = curr[key] as number;
        const minValue = this.minMaxToNumber(this.min, curr)
        const maxValue = this.minMaxToNumber(this.max, curr)

        if (maxValue!==null && value > maxValue) {
            return { [key]: maxValue } as Partial<T>;
        }
        if (minValue!==null && value < minValue) {
            return { [key]: minValue } as Partial<T>;
        }

        return {};
    }
}
