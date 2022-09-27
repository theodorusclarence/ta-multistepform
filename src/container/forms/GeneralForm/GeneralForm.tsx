import React from 'react';
import { useFormContext } from 'react-hook-form';

import { exactLength, REGEX } from '@/lib/form-utils';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';

import useExistingStore from '@/store/useExistingStore';

import useGeneralForm from './useGeneralForm';

type GeneralFormProps = {
  readOnly?: boolean;
};

export default function GeneralForm({ readOnly = false }: GeneralFormProps) {
  //#region  //*=========== Form ===========
  const { setValue, watch, getValues } = useFormContext();
  const kabupatenId = watch('kabupaten');
  const province = watch('provinsi');
  //#endregion  //*======== Form ===========

  //#region  //*=========== General Form Hooks ===========
  const { cities, districts, isDistrictsLoading } = useGeneralForm({
    kabupatenId,
  });
  //#endregion  //*======== General Form Hooks ===========

  //#region  //*=========== Outer Province District ===========
  const existing = useExistingStore.usePendataan();
  // default kecamatan value if Status Domisi = Luar Provinsi
  React.useEffect(() => {
    if (province === '1') setValue('kecamatan', '999');
  }, [province, setValue]);
  //#endregion  //*======== Outer Province District ===========

  //#region  //*=========== Reapply District & City ===========
  React.useEffect(() => {
    if (cities) {
      setValue('kabupaten', getValues('kabupaten'), {
        shouldValidate: true,
      });
    }
  }, [getValues, cities, setValue]);
  React.useEffect(() => {
    if (districts) {
      setValue('kecamatan', getValues('kecamatan'), {
        shouldValidate: true,
      });
    }
  }, [getValues, districts, setValue]);

  //#endregion  //*======== Reapply District & City ===========

  return (
    <>
      <Input
        label='NISN'
        id='nisn'
        placeholder='Masukkan 10 digit NISN'
        validation={{
          required: 'NISN harus diisi',
          pattern: {
            value: REGEX.NUMBER_ONLY,
            message: 'NISN harus berupa angka',
          },
          ...exactLength(10, 'Panjang NISN harus 10 digit'),
        }}
        readOnly={readOnly || !!existing?.nisn}
      />

      <Input
        label='NIK'
        id='nik'
        placeholder='Masukkan 16 digit NIK'
        readOnly={readOnly}
        validation={{
          required: 'NIK harus diisi',
          pattern: {
            value: REGEX.NUMBER_ONLY,
            message: 'NIK harus berupa angka',
          },
          ...exactLength(16, 'Panjang NIK harus 16 digit'),
        }}
      />

      <DatePicker
        label='Tanggal Lahir'
        id='birth_date'
        placeholder='dd/mm/yyyy'
        validation={{ required: 'Tanggal lahir harus diisi' }}
        readOnly={readOnly || !!existing?.birth_date}
      />

      <Input
        label='Nama'
        id='name'
        placeholder='Masukkan nama anda'
        validation={{
          required: 'Nama harus diisi',
        }}
        readOnly={readOnly || !!existing?.name}
      />

      <SelectInput
        id='gender'
        label='Jenis Kelamin'
        placeholder='Pilih jenis kelamin'
        validation={{
          required: 'Jenis Kelamin harus diisi',
        }}
        readOnly={readOnly || !!existing?.gender}
      >
        <option value='male'>Laki-laki</option>
        <option value='female'>Perempuan</option>
      </SelectInput>

      <Input
        label='Nomor Telepon'
        id='phone'
        placeholder='Masukkan nomor telepon'
        helperText='Gunakan format +62, contoh: +628123456789'
        validation={{
          required: 'Nomor telepon harus diisi',
          pattern: {
            value: REGEX.PHONE_NUMBER,
            message:
              'Nomor Telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
          },
        }}
        readOnly={readOnly}
      />

      <TextArea
        label='Alamat Rumah'
        id='address'
        placeholder='Masukkan alamat rumah anda'
        validation={{
          required: 'Alamat rumah harus diisi',
        }}
        readOnly={readOnly || !!existing?.address}
      />

      <SelectInput
        id='kabupaten'
        label='Kabupaten'
        placeholder='Pilih kabupaten'
        validation={{
          required: 'Kabupaten harus diisi',
        }}
        readOnly={readOnly || !!existing?.kabupaten}
      >
        {cities?.map((city) => (
          <option key={city.id} value={city.id}>
            {[25, 26, 27].includes(+city.id)
              ? city.name + ' (Irisan Zona)'
              : city.name}
          </option>
        ))}
      </SelectInput>

      <SelectInput
        id='kecamatan'
        label='Kecamatan'
        placeholder='Pilih kecamatan'
        validation={{
          required: 'Kecamatan harus diisi',
        }}
        readOnly={
          isDistrictsLoading ||
          readOnly ||
          !kabupatenId ||
          !!existing?.kecamatan
        }
      >
        {districts?.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </SelectInput>

      {!readOnly && <Button type='submit'>Next</Button>}
    </>
  );
}
