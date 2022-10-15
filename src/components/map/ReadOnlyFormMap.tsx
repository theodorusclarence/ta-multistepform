import dynamic from 'next/dynamic';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import MapSkeleton from '@/components/map/MapSkeleton';

import useRegisterStore from '@/store/useRegisterStore';

// @ts-ignore
const ReadOnlyMap = dynamic(() => import('@/components/map/ReadOnlyMap'), {
  ssr: false,
  loading: MapSkeleton,
});

export default function ReadOnlyFormMap() {
  //#region  //*============== FORM
  const pilihSekolah = useRegisterStore.usePilihSekolah();
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: { lat: pilihSekolah?.lat ?? 0, lng: pilihSekolah?.lng ?? 0 },
  });
  const { handleSubmit } = methods;
  //#endregion  //*============== FORM

  //#region //*============== FORM SUBMIT
  const onSubmit = () => {
    return;
  };
  //#endregion //*============== FORM SUBMIT
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='print:mx-auto print:h-[240px] print:w-80'>
          <ReadOnlyMap />
        </div>
      </form>
    </FormProvider>
  );
}
