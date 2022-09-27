import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import logger from '@/lib/logger';

import Seo from '@/components/Seo';
import AdministrationForm from '@/container/forms/AdministrationForm';
import StepTimeline from '@/container/register/StepTimeline';

import useExistingStore from '@/store/useExistingStore';
import useRegisterStore from '@/store/useRegisterStore';

import mapJalur, { RegisterType } from '@/constant/mapJalur';

import { StepAdministrasiData } from '@/types/form';

const TYPE: RegisterType = 'sma_prestasi';
const TYPE_ROUTE = TYPE.replace('_', '/');

export default function AdministrasiPage() {
  //#region  //*=========== Commons ===========
  const router = useRouter();
  //#endregion  //*======== Commons ===========

  //#region  //*=========== Store ===========
  const administrasi = useRegisterStore.useAdministrasi();
  const berkas = useRegisterStore.useBerkas();
  const setData = useRegisterStore.useSetData();
  const existing = useExistingStore.useAdministrasi();
  //#endregion  //*======== Store ===========

  //#region  //*=========== Step Checking ===========
  React.useEffect(() => {
    if (!berkas) {
      toast.error('Silahkan mengisi step berkas terlebih dahulu');
      router.replace(`/pendaftaran/${TYPE_ROUTE}/berkas`);
    }
  }, [router, berkas]);
  //#endregion  //*======== Step Checking ===========

  //#region  //*=========== Form ===========
  const methods = useForm<StepAdministrasiData>({
    mode: 'onTouched',
    defaultValues: { ...administrasi, ...existing },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<StepAdministrasiData> = (data) => {
    logger({ data });
    setData({ step: 'administrasi', data });

    router.push(`/pendaftaran/${TYPE_ROUTE}/pilih-sekolah`);
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      <Seo templateTitle='Administrasi' />

      <section className='bg-gray-100'>
        <div className='layout flex min-h-screen flex-col items-center py-20'>
          <h2 className='h4'>Pendaftaran {mapJalur[TYPE]}</h2>
          <h1 className='mt-4'>Step Administrasi</h1>

          <StepTimeline
            className='mt-8 w-full max-w-sm sm:max-w-none'
            step={3}
            isDirty={isDirty}
            type={TYPE_ROUTE}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-12 max-w-sm space-y-4'
            >
              <AdministrationForm />
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
}
