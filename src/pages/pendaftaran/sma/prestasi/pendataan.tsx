import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Seo from '@/components/Seo';
import GeneralForm from '@/container/forms/GeneralForm/GeneralForm';
import StepTimeline from '@/container/register/StepTimeline';

import useExistingStore from '@/store/useExistingStore';
import useRegisterStore from '@/store/useRegisterStore';

import mapJalur, { RegisterType } from '@/constant/mapJalur';

import { StepPendataanData } from '@/types/form';

const TYPE: RegisterType = 'sma_prestasi';
const TYPE_ROUTE = TYPE.replace('_', '/');

export default function PendataanPage() {
  //#region  //*=========== Commons ===========
  const router = useRouter();
  //#endregion  //*======== Commons ===========

  //#region  //*=========== Store ===========
  const pendataan = useRegisterStore.usePendataan();
  const setData = useRegisterStore.useSetData();
  const existing = useExistingStore.usePendataan();
  //#endregion  //*======== Store ===========

  //#region  //*=========== Form ===========
  const methods = useForm<StepPendataanData>({
    mode: 'onTouched',
    defaultValues: { ...pendataan, ...existing },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<StepPendataanData> = (data) => {
    logger({ data });
    setData({ step: 'pendataan', data });

    router.push(`/pendaftaran/${TYPE_ROUTE}/berkas`);
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      <Seo templateTitle='Pendataan' />

      <section className='bg-gray-100'>
        <div className='layout flex min-h-screen flex-col items-center py-20'>
          <h2 className='h4'>Pendaftaran {mapJalur[TYPE]}</h2>
          <h1 className='mt-4'>Step Pendataan</h1>

          <StepTimeline
            className='mt-8 w-full max-w-sm sm:max-w-none'
            step={1}
            isDirty={isDirty}
            type={TYPE_ROUTE}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-12 w-full max-w-sm space-y-4'
            >
              <GeneralForm />
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
}
