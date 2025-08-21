interface ICoords {
  [key: string]: [number, number];
}

export const useCoordinates = (item: string): [number, number] => {
  if (0 === item.length) {
    return [0, 0];
  }
  const coordinates: ICoords = {
    babotte: [43.60644971627767, 3.8773377056412395],
    pises: [44.03959143085465, 3.5037642717361455],
  };

  return coordinates[item] ?? [0, 0];
};
