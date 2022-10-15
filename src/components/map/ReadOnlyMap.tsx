import L from 'leaflet';
import * as React from 'react';
import { LayersControl, MapContainer, Marker, Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
const { BaseLayer } = LayersControl;
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

import { getMarkerPosition } from '@/components/map/helper';
import { DefaultIcon } from '@/components/map/LocationMarker';

import { LatLong } from '@/types/map';

type ReadOnlyProps = {
  /** School's lat long */
  distanceLatLong?: LatLong;
  className?: string;
};

export default function ReadOnly({
  distanceLatLong = pickedLatlong,
  className,
}: ReadOnlyProps) {
  const [map, setMap] = React.useState<L.Map | undefined>(undefined);
  const { watch } = useFormContext();
  // getting alamat's latlong
  const markerPosition = getMarkerPosition(watch, pickedLatlong);

  const handleMapCreated = (map: L.Map) => {
    setMap(map);
  };

  // Move map if input is changing
  // TODO Optimize setView calling
  React.useEffect(() => {
    map?.setView(markerPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, markerPosition.lat, markerPosition.lng]);

  return (
    <div className={clsx('relative z-0 space-y-2', className)}>
      <MapContainer
        className='min-h-[500px] w-full print:min-h-[210px]'
        zoom={14}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        center={distanceLatLong}
        ref={handleMapCreated}
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
        <Marker position={markerPosition} icon={DefaultIcon}></Marker>;
      </MapContainer>
    </div>
  );
}

// Monas latlong
const pickedLatlong: LatLong = {
  lat: -6.1754,
  lng: 106.8272,
};
