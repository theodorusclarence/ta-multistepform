import React from 'react';
import { useFormContext } from 'react-hook-form';

import { REGEX } from '@/lib/form-utils';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';
import useGeneralForm from '@/container/forms/GeneralForm/useGeneralForm';

import useExistingStore from '@/store/useExistingStore';

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
        // shouldValidate: true,
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
      <SelectInput
        label='Provinsi'
        id='provinsi'
        placeholder='Pilih Provinsi'
        validation={{
          required: 'Provinsi harus diisi',
        }}
        readOnly={readOnly}
      >
        <option value='jawa-timur'>Jawa Timur</option>
      </SelectInput>

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

      <Input
        label='Desa/Kelurahan'
        id='kelurahan'
        placeholder='Masukkan desa/kelurahan'
        readOnly={readOnly}
        validation={{
          required: 'Desa/Kelurahan harus diisi',
        }}
      />

      <Input
        label='NIK'
        id='nik'
        placeholder='Masukkan NIK'
        readOnly={readOnly}
        validation={{
          required: 'NIK harus diisi',
        }}
      />

      <Input
        label='Nomor KK'
        id='kk'
        placeholder='Masukkan nomor KK'
        readOnly={readOnly}
        validation={{
          required: 'Nomor KK harus diisi',
        }}
      />

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

      <DatePicker
        label='Tanggal Penerbitan KK'
        id='birth_date'
        placeholder='dd/mm/yyyy'
        validation={{ required: 'Tanggal penerbitan KK harus diisi' }}
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

      <Input
        label='RT'
        id='rt'
        placeholder='Masukkan RT'
        type='number'
        validation={{
          required: 'RT harus diisi',
        }}
        readOnly={readOnly}
      />

      <Input
        label='RW'
        id='rw'
        placeholder='Masukkan RW'
        type='number'
        validation={{
          required: 'RW harus diisi',
        }}
        readOnly={readOnly}
      />

      <DropzoneInput
        label='Upload Foto Kartu Keluarga'
        id='kk_file'
        accept={{
          'image/*': ['.png', '.jpg', '.jpeg'],
          'application/*': ['.pdf'],
        }}
        helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
        validation={{
          required: 'Foto Kartu Keluarga harus diupload',
        }}
        readOnly={readOnly}
      />

      {!readOnly && <Button type='submit'>Next</Button>}
    </>
  );
}
