import dynamic from 'next/dynamic';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';
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
};

export default function MapPilihSekolah({ className }: MapPilihSekolahProps) {
  //#region  //*============== COMMONS
  const { watch, setValue } = useFormContext();
  //#endregion  //*============== COMMONS

  //#region  //*============== MAP LOCK
  const mapIsLocked = watch('map_lock');

  const toggleLockButton = () => {
    setValue('map_lock', !mapIsLocked, { shouldValidate: true });
  };
  //#endregion  //*============== MAP LOCK

  return (
    <figure className={clsxm('w-full space-y-4', className)}>
      <div className='flex gap-4'>
        <Input
          id='lat'
          label='Lat'
          validation={{
            required: 'Lat is required',
            pattern: {
              value: REGEX.DECIMAL_NUMBER_AND_NEGATIVE,
              message: 'Lat must be a number',
            },
          }}
        />
        <Input
          id='lng'
          label='Long'
          validation={{
            required: 'Lat is required',
            pattern: {
              value: REGEX.DECIMAL_NUMBER_AND_NEGATIVE,
              message: 'Lat must be a number',
            },
          }}
        />
      </div>
      <div className='mt-8 w-full'>
        <CustomMap isLocked={mapIsLocked} onLockButton={toggleLockButton} />
      </div>
    </figure>
  );
}
