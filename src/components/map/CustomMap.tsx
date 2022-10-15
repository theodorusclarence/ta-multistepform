import clsx from 'clsx';
import L from 'leaflet';
import * as React from 'react';
import { LayersControl, MapContainer, Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
const { BaseLayer } = LayersControl;
import { useFormContext } from 'react-hook-form';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

import Button from '@/components/buttons/Button';
import { getMarkerPosition } from '@/components/map/helper';
import LocationMarker from '@/components/map/LocationMarker';

import { LatLong } from '@/types/map';

type CustomMapProps = {
  /** Absolute point for map, distance will be counted to this latlong */
  distanceLatLong?: LatLong;
  /** Lock map so it can't be dragged */
  isLocked?: boolean;
  /** Callback function when Lock button is clicked */
  onLockButton: () => void;
};

/**
 * Map component with GPS, back to distance point, and lock button functionality.
 *
 * This map is using RHF to manage lat long state, you need to wrap it with RHF declaration.
 */
export default function CustomMap({
  distanceLatLong = pickedLatlong,
  isLocked = false,
  onLockButton,
}: CustomMapProps) {
  const [map, setMap] = React.useState<L.Map | undefined>(undefined);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const { watch, setValue } = useFormContext();
  const markerPosition = getMarkerPosition(watch);

  const handleMapCreated = (map: L.Map) => {
    setMap(map);
  };

  const handleUseCurrent = () => {
    map?.locate();
  };

  const backToCenter = () => {
    setValue('lat', distanceLatLong.lat, { shouldValidate: true });
    setValue('lng', distanceLatLong.lng, { shouldValidate: true });
  };

  // Move map if input is changing
  // TODO Optimize setView calling
  React.useEffect(() => {
    if (isDragging) return;

    map?.setView(markerPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, map, markerPosition.lat, markerPosition.lng]);

  return (
    <div className='relative z-0 space-y-2'>
      <MapContainer
        // TODO find better solution to change setings on react-leaflet, maybe: overlay (?)
        // trigger map rerender
        key={isLocked + ''}
        className={clsx('min-h-[500px] w-full', {
          'cursor-not-allowed': isLocked,
        })}
        zoom={14}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        center={distanceLatLong}
        ref={handleMapCreated}
        dragging={!isLocked}
      >
        <LayersControl position='bottomleft' collapsed={false}>
          <BaseLayer checked name='Satellite'>
            <ReactLeafletGoogleLayer
              googleMapsLoaderConf={{ apiKey: '' }}
              type='hybrid'
            />
          </BaseLayer>
        </LayersControl>
        <Polyline
          pathOptions={{ color: 'red' }}
          positions={[markerPosition, distanceLatLong]}
        />
        <LocationMarker setIsDragging={setIsDragging} />
      </MapContainer>

      <div className='flex flex-row-reverse justify-between'>
        <Button
          type='button'
          onClick={onLockButton}
          style={{ transitionProperty: 'background-size color' }}
          variant='outline'
          className={clsx('inline-flex items-center gap-2 bg-white', {
            'hover:text-green-500 focus-visible:text-green-500': isLocked,
            'hover:text-red-500 focus-visible:text-red-500': !isLocked,
          })}
        >
          <div className='flex-shrink-0 text-lg'>
            {isLocked ? <HiLockOpen /> : <HiLockClosed />}
          </div>
          <p>{isLocked ? 'Unlock' : 'Lock'}</p>
        </Button>

        {!isLocked && (
          <Button type='button' onClick={backToCenter}>
            Titik Sekolah
          </Button>
        )}

        {!isLocked && (
          <Button type='button' onClick={handleUseCurrent}>
            GPS
          </Button>
        )}
      </div>
    </div>
  );
}

// Monas latlong
const pickedLatlong: LatLong = {
  lat: -6.1754,
  lng: 106.8272,
};
