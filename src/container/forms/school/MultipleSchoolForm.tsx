import React from 'react';
import { useFormContext } from 'react-hook-form';

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
  readOnly?: boolean;
};

export default function MultipleSchoolForm({
  readOnly = false,
}: MultipleSchoolFormProps) {
  const { getValues } = useFormContext();

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
    </>
  );
}
