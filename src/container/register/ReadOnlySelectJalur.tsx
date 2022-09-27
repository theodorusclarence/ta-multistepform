import * as React from 'react';

import SelectInput, { SelectInputProps } from '@/components/forms/SelectInput';

/**
 * Container for **Read Only** Jalur Select Input
 *
 * Can also be used with Existing Store
 *
 * ```ts
 * <ReadOnlySelectJalur existingData={existing?.register_type} />
 * ```
 */
export default function ReadOnlySelectJalur({
  existingData,
  ...rest
}: {
  existingData?: string;
} & Partial<SelectInputProps>) {
  return (
    <SelectInput
      id='register_type'
      label='Jenis Pendaftaran'
      placeholder='Pilih jenis jalur pendaftaran'
      readOnly
      {...rest}
    >
      {/* Show all if undefined */}
      {/* Show sma options if sma, vice versa */}
      {!existingData?.includes('smk_') && (
        <>
          <option value='sma_boarding'>SMA Jalur Boarding School</option>
          <option value='sma_afirmasi'>SMA Jalur Afirmasi</option>
          <option value='sma_mutasi'>SMA Jalur Mutasi</option>
          <option value='sma_guru'>SMA Jalur Anak Guru</option>
          <option value='sma_prestasi'>SMA Jalur Prestasi Akademik</option>
          <option value='sma_prestasi_non_akademik'>
            SMA Jalur Prestasi Non Akademik
          </option>
          <option value='sma_zonasi'>SMA Jalur Zonasi</option>
        </>
      )}
      {!existingData?.includes('sma_') && (
        <>
          <option value='smk_afirmasi'>SMK Jalur Afirmasi</option>
          <option value='smk_mutasi'>SMK Jalur Mutasi</option>
          <option value='smk_guru'>SMK Jalur Anak Guru</option>
          <option value='smk_dudi'>SMK Jalur Anak DUDI</option>
          <option value='smk_prestasi_non_akademik'>
            SMK Jalur Prestasi Non Akademik
          </option>
          <option value='smk_prestasi'>SMK Jalur Prestasi</option>
          <option value='smk_terdekat'>SMK Jalur Terdekat</option>
        </>
      )}
    </SelectInput>
  );
}
