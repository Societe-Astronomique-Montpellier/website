export const useFillCommonProperties = <
  T extends object,
  S extends Partial<T>,
>() => {
  const fillCommonProperties = (target: T, source: S): void => {
    Object.keys(source).forEach((key) => {
      if (key in target) {
        (target as any)[key] = source[key as keyof S];
      }
    });
  };

  return { fillCommonProperties };
};
