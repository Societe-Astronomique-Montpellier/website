export function useKeyFromValue<T extends Record<string, any>>() {
  // Function to get the first matching key
  const getKeyFromValue = (obj: T, value: T[keyof T]): keyof T | undefined => {
    return (Object.keys(obj) as Array<keyof T>).find(
      (key) => obj[key] === value,
    );
  };

  // Function to get all matching keys
  const getAllKeysFromValue = (obj: T, value: T[keyof T]): Array<keyof T> => {
    return (Object.keys(obj) as Array<keyof T>).filter(
      (key) => obj[key] === value,
    );
  };

  return {
    getKeyFromValue,
    getAllKeysFromValue,
  };
}
