import * as React from 'react';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Input from '@/components/forms/Input';
import InputNilai from '@/container/register/StepAdministrasi/InputNilai';

type AdministrationFormProps = {
  omitReport?: boolean;
  readOnly?: boolean;
};

export default function AdministrationForm({
  omitReport = false,
  readOnly = false,
}: AdministrationFormProps) {
  return (
    <>
      <Input
        label='Nama Sekolah Asal'
        id='origin_school_name'
        readOnly={readOnly}
        placeholder='Masukkan nama sekolah asal'
        validation={{
          required: 'Nama Sekolah Asal harus diisi',
        }}
      />

      {!omitReport && (
        <>
          <InputNilai readOnly={readOnly} />

          <DropzoneInput
            label='Upload Foto Rapor Semester 1'
            id='rapor_1'
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg'],
              'application/*': ['.pdf'],
            }}
            helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
            validation={{
              required: 'Foto Rapor Semester 1 harus diupload',
            }}
            readOnly={readOnly}
          />

          <DropzoneInput
            label='Upload Foto Rapor Semester 2'
            id='rapor_2'
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg'],
              'application/*': ['.pdf'],
            }}
            helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
            validation={{
              required: 'Foto Rapor Semester 2 harus diupload',
            }}
            readOnly={readOnly}
          />

          <DropzoneInput
            label='Upload Foto Rapor Semester 3'
            id='rapor_3'
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg'],
              'application/*': ['.pdf'],
            }}
            helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
            validation={{
              required: 'Foto Rapor Semester 3 harus diupload',
            }}
            readOnly={readOnly}
          />

          <DropzoneInput
            label='Upload Foto Rapor Semester 4'
            id='rapor_4'
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg'],
              'application/*': ['.pdf'],
            }}
            helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
            validation={{
              required: 'Foto Rapor Semester 4 harus diupload',
            }}
            readOnly={readOnly}
          />

          <DropzoneInput
            label='Upload Foto Rapor Semester 5'
            id='rapor_5'
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg'],
              'application/*': ['.pdf'],
            }}
            helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
            validation={{
              required: 'Foto Rapor Semester 5 harus diupload',
            }}
            readOnly={readOnly}
          />
        </>
      )}

      {!readOnly && <Button type='submit'>Next</Button>}
    </>
  );
}
