import dynamic from 'next/dynamic';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { REGEX } from '@/lib/form-utils';

import Input from '@/components/forms/Input';
import MapSkeleton from '@/components/map/MapSkeleton';
import MapPilihSekolah from '@/container/register/StepPilihSekolah/MapPilihSekolah';

import SelectSchoolByKabupaten from './SelectSchoolByKabupaten';

const SCHOOL_DATA = [
  {
    kabupaten: 'sekolah_1_kabupaten',
    sekolah: 'sekolah_1_sekolah',
  },
  {
    kabupaten: 'sekolah_2_kabupaten',
    sekolah: 'sekolah_2_sekolah',
  },
  {
    kabupaten: 'sekolah_3_kabupaten',
    sekolah: 'sekolah_3_sekolah',
  },
];

type MultipleSchoolFormProps = {
  omitMap?: boolean;
  readOnly?: boolean;
};

// @ts-ignore
const ReadOnlyMap = dynamic(() => import('@/components/map/ReadOnlyMap'), {
  ssr: false,
  loading: MapSkeleton,
});

export default function MultipleSchoolForm({
  omitMap = false,
  readOnly = false,
}: MultipleSchoolFormProps) {
  const { getValues, watch } = useFormContext();

  const isAvailable = (
    kabupatenSelectValue: number,
    sekolahSelectValue: number,
    id: string
  ) => {
    const isExist = SCHOOL_DATA.map((data) => {
      return {
        kabupaten: data.kabupaten !== id ? getValues(data.kabupaten) : '',
        sekolah: data.kabupaten !== id ? getValues(data.sekolah) : '',
      };
    }).some(
      (value) =>
        value.kabupaten == kabupatenSelectValue &&
        value.sekolah == sekolahSelectValue
    );

    return isExist ? false : true;
  };
  return (
    <>
      {SCHOOL_DATA.map(({ sekolah, kabupaten }, i) => (
        <SelectSchoolByKabupaten
          sekolah={sekolah}
          kabupaten={kabupaten}
          key={sekolah}
          urutan={i + 1}
          readOnly={readOnly}
          isAvailable={isAvailable}
        />
      ))}
      {!omitMap && watch('sekolah_1_sekolah') && (
        <div className='mt-6 '>
          <h4 className='p font-semibold'>Titik Alamat Rumah</h4>
          {readOnly ? (
            <ReadOnlyMapForm />
          ) : (
            <MapPilihSekolah bindId='sekolah_1_sekolah' className='mt-4' />
          )}
        </div>
      )}
    </>
  );
}

function ReadOnlyMapForm() {
  const { watch } = useFormContext();

  const schoolLat: number = watch('sekolah_1_latitude');
  const schoolLng: number = watch('sekolah_1_longitude');

  return (
    <>
      <div className='mt-4 flex gap-4'>
        <Input
          readOnly
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
          readOnly
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
      <ReadOnlyMap
        className='mt-2'
        distanceLatLong={{ lat: schoolLat, lng: schoolLng }}
      />
    </>
  );
}
