export function mapValues<T extends object, TResult>(obj: T, fn: (value: T[keyof T], key: keyof T) => TResult) {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[key as keyof T] = fn(value, key as keyof T);
      return acc;
    },
    {} as Record<keyof T, TResult>,
  );
}
