import dynamic from 'next/dynamic';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { REGEX } from '@/lib/form-utils';

import Input from '@/components/forms/Input';
import MapSkeleton from '@/components/map/MapSkeleton';

// @ts-ignore
const CustomMap = dynamic(() => import('@/components/map/CustomMap'), {
  ssr: false,
  loading: MapSkeleton,
});

type MapPilihSekolahProps = {
  latId?: string;
  longId?: string;
  className?: string;
  bindId?: string;
};

export default function MapPilihSekolah({
  className,
  bindId = 'dest_school_name',
}: MapPilihSekolahProps) {
  //#region  //*============== COMMONS
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  //#endregion  //*============== COMMONS

  //#region  //*============== MAP LOCK
  const mapIsLocked = watch('map_lock');

  const toggleLockButton = () => {
    setValue('map_lock', !mapIsLocked, { shouldValidate: true });
  };
  //#endregion  //*============== MAP LOCK

  //#region  //*=========== Picked School LatLong ===========
  const sekolah_1_latitude = watch('sekolah_1_latitude');
  const sekolah_1_longitude = watch('sekolah_1_longitude');
  //#endregion  //*======== Picked School LatLong ===========

  //#region  //*============== MOVE MAP ACCORDING TO dest_school_name
  const dest_school_name: string = watch(bindId);
  const lat: number = watch('lat');
  const lng: number = watch('lng');

  const [distanceLatLong, setDistanceLatLong] = React.useState({
    lat: -6.217134613494927,
    lng: 106.8591769846577,
  });

  // Update map when destination school changes
  React.useEffect(() => {
    const schoolLat: number = sekolah_1_latitude;
    const schoolLng: number = sekolah_1_longitude;

    setDistanceLatLong({
      lat: schoolLat,
      lng: schoolLng,
    });

    // If map hasn't been moved yet, move it to the school
    if (lat === distanceLatLong.lat && lng === distanceLatLong.lng) {
      setValue('lat', schoolLat, { shouldValidate: true });
      setValue('lng', schoolLng, { shouldValidate: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dest_school_name, sekolah_1_latitude, sekolah_1_longitude, setValue]);
  //#endregion  //*============== MOVE MAP ACCORDING TO dest_school_name

  return (
    <figure className={className}>
      <div className='flex gap-4'>
        <Input
          readOnly={mapIsLocked}
          id='lat'
          label='Lat'
          validation={{
            required: 'Lat harus diisi',
            pattern: {
              value: REGEX.DECIMAL_NUMBER_AND_NEGATIVE,
              message: 'Lat harus berupa angka',
            },
          }}
        />
        <Input
          readOnly={mapIsLocked}
          id='lng'
          label='Long'
          validation={{
            required: 'Long harus diisi',
            pattern: {
              value: REGEX.DECIMAL_NUMBER_AND_NEGATIVE,
              message: 'Long harus berupa angka',
            },
          }}
        />
      </div>
      <div className='mt-4 w-full'>
        <CustomMap
          distanceLatLong={distanceLatLong}
          isLocked={mapIsLocked}
          onLockButton={toggleLockButton}
        />
      </div>
      <div className='hidden'>
        <Input type='checkbox' id='map_lock' label='' hideError />
      </div>
      {errors?.map_lock && (
        <p className='mt-2 font-medium text-red-500'>
          {errors.map_lock.message as unknown as string}
        </p>
      )}
    </figure>
  );
}
