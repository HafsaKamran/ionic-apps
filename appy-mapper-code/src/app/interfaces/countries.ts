/**
 * Defines the expected data structure for each country
 *
 * @export
 * @interface Country
 */
export interface Country {
    id: number;
    country: string;
    lat: number;
    lng: number;
    zoom: number;
    active: boolean;
}
