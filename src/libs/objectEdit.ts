/**
 * Returns a new object without the keys provided
 * @param value Object to work from
 * @param toInvert List of keys to avoid
 * @returns A new object without the keys provided
 */
export const invertObject = <T extends { [s: string]: unknown }>(
    value: T,
    toInvert: (keyof T)[],
): Partial<T> => {
    const newEntries = Object.entries(value).filter(
        ([key]) => !toInvert.includes(key),
    );
    return Object.fromEntries(newEntries) as Partial<T>;
};

/**
 * Returns a new object with the keys provided only
 * @param value Object to work from
 * @param intersect List of keys to include
 * @returns A new object with only the keys provided
 */
export const intersectObject = <T extends { [s: string]: unknown }>(
    value: T,
    intersect: (keyof T)[],
): Partial<T> => {
    const newEntries = Object.entries(value).filter(([key]) => {
        intersect.includes(key);
    });
    return Object.fromEntries(newEntries) as Partial<T>;
};

export const invertList = <T>(value: T[], toInvert: T[]) => {
    return value.filter((v) => !toInvert.includes(v));
};

export const intersectList = <T>(value: T[], intersect: T[]) => {
    return value.filter((v) => intersect.includes(v));
};
