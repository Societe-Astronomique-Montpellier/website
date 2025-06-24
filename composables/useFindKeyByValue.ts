export function useFindKeyFromArray<T extends Record<string, any>>() {
  /**
   * Find item by value inside array
   */
  const getKeyByValue = <K extends keyof T>(
    array: T[],
    searchKey: K,
    value: T[K],
    returnKey: keyof T,
  ): T[keyof T] | undefined => {
    const found = array.find((item) => item[searchKey] === value);
    return found ? found[returnKey] : undefined;
  };

  return {
    getKeyByValue,
  };
}
