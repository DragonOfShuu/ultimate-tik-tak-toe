export abstract class Rule<T> {
    public abstract test(curr: T, value: T[keyof T]): boolean;
    public abstract requirements(): (keyof T)[];
}

export class MinMaxRule<T> extends Rule<T> {
    min: number | keyof T | null;
    max: number | keyof T | null;

    constructor(min: number | keyof T | null, max: number | keyof T | null) {
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
}
