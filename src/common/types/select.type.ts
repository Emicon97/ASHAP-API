export type Select<T> = keyof T extends string ? `${'+' | '-'}${keyof T}` : never;
