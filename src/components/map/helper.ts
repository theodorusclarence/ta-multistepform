import { LatLong } from '@/types/map';

function cleanLatLong(input: string): number {
  const str = input + '';

  if (str === '') return 0;

  const replaced = str.replace(/[^0-9.-]/g, '');
  if (replaced === '-') return 0;
  else return parseFloat(replaced);
}

export function getMarkerPosition(
  watch: (name: string) => number,
  fallback?: LatLong
): LatLong {
  const lat: number = watch('lat');
  const lng: number = watch('lng');

  if (lat && lng)
    return {
      lat: cleanLatLong(lat + ''),
      lng: cleanLatLong(lng + ''),
    };

  if (fallback) return fallback;

  return {
    lat: 0,
    lng: 0,
  };
}
