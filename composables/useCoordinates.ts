import {type LatLngExpression, Point, type PointExpression} from "leaflet";
import {LatLng} from "leaflet";

interface ICoords {
    [key: string]: PointExpression
}

export const useCoordinates = (item: string) => {
    const coordinates: ICoords = {
        babotte : new Point(3.606424969770224, 3.8771871327480767),
        pises: new Point(3.606424969770224, 3.8771871327480767)
    };

   return coordinates[item];
}