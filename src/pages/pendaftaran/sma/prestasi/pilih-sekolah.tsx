import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Seo from '@/components/Seo';
import MapPilihSekolah from '@/container/register/StepPilihSekolah/MapPilihSekolah';
import StepTimeline from '@/container/register/StepTimeline';

import useExistingStore from '@/store/useExistingStore';
import useRegisterStore from '@/store/useRegisterStore';

import mapJalur, { RegisterType } from '@/constant/mapJalur';

import { StepPilihSekolahData } from '@/types/form';

const TYPE: RegisterType = 'sma_prestasi';
const TYPE_ROUTE = TYPE.replace('_', '/');

export default function PilihSekolahPage() {
  //#region  //*=========== Commons ===========
  const router = useRouter();
  //#endregion  //*======== Commons ===========

  //#region  //*============== Store
  const pilihSekolah = useRegisterStore.usePilihSekolah();
  const existing = useExistingStore.usePilihSekolah();
  const setData = useRegisterStore.useSetData();
  //#endregion  //*============== Store

  //#region  //*=========== Form ===========
  const methods = useForm<StepPilihSekolahData>({
    mode: 'onTouched',
    defaultValues: pilihSekolah
      ? { ...pilihSekolah, ...existing }
      : {
          lat: -6.217134613494927,
          lng: 106.8591769846577,
          dest_school_name: 1,
          kabkot: 1,
          ...existing,
        },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*============== FORM SUBMIT
  const onSubmit: SubmitHandler<StepPilihSekolahData> = (data) => {
    logger({ data }, 'pilih-sekolah.tsx line 64');
    setData({ step: 'pilihSekolah', data });
    router.push(`/pendaftaran/${TYPE_ROUTE}/finalisasi`);
  };
  //#endregion  //*============== FORM SUBMIT

  return (
    <>
      <Seo templateTitle='Pilih Sekolah' />

      <section className='bg-gray-100'>
        <div className='layout flex min-h-screen flex-col items-center py-20'>
          <h2 className='h4'>Pendaftaran {mapJalur[TYPE]}</h2>
          <h1 className='mt-4'>Penentuan Lokasi Rumah</h1>

          <StepTimeline
            className='mt-8 w-full max-w-sm sm:max-w-none'
            step={4}
            isDirty={isDirty}
            type={TYPE_ROUTE}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-12 w-full max-w-xl space-y-4'
            >
              <MapPilihSekolah />

              <Button type='submit'>Next</Button>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
}
