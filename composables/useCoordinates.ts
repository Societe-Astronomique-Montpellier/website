import {type LatLngExpression, Point, type PointExpression} from "leaflet";
import {LatLng} from "leaflet";
import type {GeoPoint} from "@prismicio/types-internal/lib/customtypes";

interface ICoords {
    // [key: string]: PointExpression
    [key: string]: [ number, number ] | GeoPoint
}

export const useCoordinates = (item: string) => {
    const coordinates: ICoords = {
        babotte : [43.606453972672504, 3.8773262500762944], // new Point(3.606424969770224, 3.8771871327480767),
        pises: [44.03959143085465, 3.5037642717361455]// new Point(3.606424969770224, 3.8771871327480767)
    };

   return coordinates[item];
}