// import type {GeoPoint} from "@prismicio/types-internal/lib/customtypes";

interface ICoords {
  // [key: string]: PointExpression
  [key: string]: [number, number]; //| GeoPoint
}

export const useCoordinates = (item: string) => {
  const coordinates: ICoords = {
    babotte: [43.60644971627767, 3.8773377056412395],
    pises: [44.03959143085465, 3.5037642717361455],
  };

  return coordinates[item];
};
