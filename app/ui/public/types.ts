// Props<'input'> is a union discriminated on `type`; a plain Omit collapses it into one
// member and rejects valid input types, so omit from each member instead.
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never
