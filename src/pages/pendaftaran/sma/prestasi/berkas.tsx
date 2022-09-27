import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Seo from '@/components/Seo';
import StepTimeline from '@/container/register/StepTimeline';

import useExistingStore from '@/store/useExistingStore';
import useRegisterStore from '@/store/useRegisterStore';

import mapJalur, { RegisterType } from '@/constant/mapJalur';

import { StepBerkasData } from '@/types/form';

const TYPE: RegisterType = 'sma_prestasi';
const TYPE_ROUTE = TYPE.replace('_', '/');

export default function PendataanPage() {
  //#region  //*=========== Commons ===========
  const router = useRouter();
  //#endregion  //*======== Commons ===========

  //#region  //*=========== Store ===========
  const pendataan = useRegisterStore.usePendataan();
  const berkas = useRegisterStore.useBerkas();
  const setData = useRegisterStore.useSetData();
  const existing = useExistingStore.useBerkas();
  //#endregion  //*======== Store ===========

  //#region  //*=========== Step Checking ===========
  React.useEffect(() => {
    if (!pendataan) {
      toast.error('Silahkan mengisi step pendataan terlebih dahulu');
      router.replace(`/pendaftaran/${TYPE_ROUTE}/pendataan`);
    }
  }, [router, pendataan]);
  //#endregion  //*======== Step Checking ===========

  //#region  //*=========== Form ===========
  const methods = useForm<StepBerkasData>({
    mode: 'onTouched',
    defaultValues: { ...berkas, ...existing },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<StepBerkasData> = (data) => {
    logger({ data });
    setData({ step: 'berkas', data });

    router.push(`/pendaftaran/${TYPE_ROUTE}/administrasi`);
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      <Seo templateTitle='Pendataan' />

      <section className='bg-gray-100'>
        <div className='layout flex min-h-screen flex-col items-center py-20'>
          <h2 className='h4'>Pendaftaran {mapJalur[TYPE]}</h2>
          <h1 className='mt-4'>Step Berkas</h1>

          <StepTimeline
            className='mt-8 w-full max-w-sm sm:max-w-none'
            step={2}
            isDirty={isDirty}
            type={TYPE_ROUTE}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-12 w-full max-w-sm space-y-4'
            >
              <BerkasPrestasiAkademikSMA />
              <Button type='submit'>Next</Button>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
}

type BerkasPrestasiAkademikSMAProps = {
  readOnly?: boolean;
};

export function BerkasPrestasiAkademikSMA({
  readOnly,
}: BerkasPrestasiAkademikSMAProps) {
  return (
    <>
      <DropzoneInput
        label='Upload Foto Kartu Keluarga'
        id='kk'
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
    </>
  );
}
