import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { exactLength, REGEX } from '@/lib/form-utils';
import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import DevTool from '@/components/DevTool';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export type LoginData = {
  nisn: string;
  npsn: string;
  birth_date: Date;
  kk_date: Date;
};

export default function LoginPage() {
  const router = useRouter();
  //#region  //*=========== Form ===========
  const methods = useForm<LoginData>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    logger({ data });
    router.push('/pendaftaran/sma/prestasi/pendataan');
  };

  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main>
        <section className=''>
          <div className='layout flex min-h-screen flex-col items-center justify-center py-20'>
            <h1 className='mt-4 text-center text-base font-semibold text-gray-800 md:text-2xl'>
              Pengambilan Pin
            </h1>
            <h2 className='mt-2 text-center text-xl md:text-4xl'>
              Silakan masuk ke akun anda
            </h2>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-8 w-full max-w-sm'
              >
                <div className='space-y-3'>
                  <Input
                    id='npsn'
                    label='Nomor Pokok Sekolah Nasional (NPSN)'
                    placeholder='Masukkan 8 digit NPSN'
                    validation={{
                      required: 'NPSN harus diisi',
                      pattern: {
                        value: REGEX.NUMBER_ONLY,
                        message: 'NPSN harus berupa angka',
                      },
                      ...exactLength(8, 'Panjang NPSN harus 8 digit'),
                    }}
                  />

                  <Input
                    id='nisn'
                    label='Nomor Induk Siswa Nasional (NISN)'
                    placeholder='Masukkan 10 digit NISN'
                    validation={{
                      required: 'NISN harus diisi',
                      pattern: {
                        value: REGEX.NUMBER_ONLY,
                        message: 'NISN harus berupa angka',
                      },
                      ...exactLength(10, 'Panjang NISN harus 10 digit'),
                    }}
                  />

                  <DatePicker
                    id='birth_date'
                    label='Tanggal Lahir'
                    placeholder='dd/mm/yyyy'
                    defaultYear={2007}
                    validation={{
                      required: 'Tanggal Lahir harus diisi',
                      valueAsDate: true,
                    }}
                  />

                  <DatePicker
                    id='kk_date'
                    label='Tanggal Terbit KK/Domisili'
                    placeholder='dd/mm/yyyy'
                    defaultYear={2007}
                    validation={{
                      required: 'Tanggal Terbit KK/Domisili harus diisi',
                      valueAsDate: true,
                    }}
                  />
                </div>

                <Button type='submit' className='mt-4 block w-full'>
                  Masuk
                </Button>

                <DevTool />
              </form>
            </FormProvider>
          </div>
        </section>
      </main>
    </Layout>
  );
}
