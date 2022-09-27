import React from 'react';
import { useFormContext } from 'react-hook-form';

import SelectInput from '@/components/forms/SelectInput';

import useSchoolData from './useSchoolData';

export default function SelectSchoolByKabupaten({
  kabupaten,
  sekolah,
  urutan,
  readOnly = false,
  isAvailable,
}: {
  kabupaten: string;
  sekolah: string;
  urutan: number;
  readOnly?: boolean;
  isAvailable: (
    kabupatenSelectValue: number,
    sekolahSelectValue: number,
    id: string
  ) => boolean;
}) {
  const { watch } = useFormContext();
  const kabupatenId = watch(kabupaten);
  const { kabupaten: kabupatenApiData, sekolah: sekolahApiData } =
    useSchoolData(kabupatenId);

  // TODO Fix bug where adding this code causes schools to always reset
  // //#region  //*=========== Reset School Value when Kabupaten Changes ===========
  // useDidMountEffect(() => {
  //   setValue(sekolah, '');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [kabupatenId]);
  // //#endregion  //*======== Reset School Value when Kabupaten Changes ===========

  return (
    <>
      <hr />
      <h4 className='p font-semibold'>Sekolah Pilihan {urutan}</h4>
      <SelectInput
        id={kabupaten}
        label='Kabupaten/Kota'
        placeholder='Pilih Kabupaten/Kota'
        validation={{
          required: 'Kabupaten/Kota harus diisi',
        }}
        readOnly={readOnly || kabupatenApiData.isLoading}
      >
        {kabupatenApiData.data?.map((kabupaten) => (
          <option key={kabupaten.id} value={kabupaten.id}>
            {kabupaten.name}
          </option>
        ))}
      </SelectInput>
      <SelectInput
        id={sekolah}
        label='Sekolah'
        placeholder='Pilih Sekolah'
        validation={{
          required: 'Sekolah harus diisi',
        }}
        readOnly={sekolahApiData.isLoading || readOnly || !kabupatenId}
      >
        {sekolahApiData.data?.map((sekolah) => (
          <React.Fragment key={`${urutan}-${sekolah.id}`}>
            {isAvailable(watch(kabupaten), sekolah.id, kabupaten) && (
              <option value={sekolah.id}>{sekolah.name}</option>
            )}
          </React.Fragment>
        ))}
      </SelectInput>
    </>
  );
}
