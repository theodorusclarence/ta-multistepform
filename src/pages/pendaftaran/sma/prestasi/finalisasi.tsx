import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { formatDateForAPI } from '@/lib/date';
import logger from '@/lib/logger';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import SubmissionAlert from '@/components/dialog/SubmissionAlert';
import Seo from '@/components/Seo';
import GeneralForm from '@/container/forms/GeneralForm/GeneralForm';
import MapPilihSekolah from '@/container/register/StepPilihSekolah/MapPilihSekolah';
import StepTimeline from '@/container/register/StepTimeline';

import useRegisterStore from '@/store/useRegisterStore';

import mapJalur, { RegisterType } from '@/constant/mapJalur';

import { FormData } from '@/types/form';

const TYPE: RegisterType = 'sma_prestasi';
const TYPE_ROUTE = TYPE.replace('_', '/');

export default function FinalisasiPage() {
  //#region  //*=========== Store ===========
  const pendataan = useRegisterStore.usePendataan();
  const pilihSekolah = useRegisterStore.usePilihSekolah();
  //#endregion  //*======== Store ===========

  //#region  //*=========== Modal States ===========
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);
  const isLoading = useLoadingToast();
  //#endregion  //*======== Modal States ===========
  //#region  //*=========== Form ===========
  const methods = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      ...pilihSekolah,
      ...pendataan,
    },
  });

  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  const handleRegister: SubmitHandler<FormData> = (data) => {
    const postData = {
      nik: data.nik,
      nisn: data.nisn,
      name: data.name,
      gender: data.gender,
      birth_date: formatDateForAPI(data.birth_date),
      phone: data.phone,
      address: data.address,
      district_id: data.kecamatan,
      school_ids: [
        data.sekolah_1_sekolah,
        data.sekolah_2_sekolah,
        data.sekolah_3_sekolah,
      ],
      junior_school_name: data.origin_school_name,
      vaccine_type: data.vaccine_type,
      vaccine_date: formatDateForAPI(data.vaccine_date as unknown as Date),
      documents: {
        vaccine_certificate: data.vaccine_certificate[0],
        kk: data.kk[0],
        report_1: data.rapor_1?.[0],
        report_2: data.rapor_2?.[0],
        report_3: data.rapor_3?.[0],
        report_4: data.rapor_4?.[0],
        report_5: data.rapor_5?.[0],
      },
      datas: {
        report_grades: data.report_grades,
      },
    };

    logger({ postData });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsAlertOpen(true);
    setFormData(data);
  };

  return (
    <>
      <Seo templateTitle='Finalisasi' />

      <SubmissionAlert
        action={handleRegister}
        data={formData}
        isLoading={isLoading}
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
      />
      <section className='bg-gray-100'>
        <div className='layout flex min-h-screen flex-col items-center py-20'>
          <h2 className='h4'>Pendaftaran {mapJalur[TYPE]}</h2>
          <h1 className='mt-4'>Finalisasi</h1>

          <StepTimeline
            className='mt-8 w-full max-w-sm sm:max-w-none'
            step={5}
            type={TYPE_ROUTE}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-8 w-full max-w-sm space-y-8'
            >
              <div className='space-y-4'>
                <h2 className='text-xl'>Pendataan</h2>

                <GeneralForm readOnly />
              </div>

              <div className='space-y-4'>
                <h2 className='text-xl'>Penentuan Lokasi Rumah</h2>

                <MapPilihSekolah />
              </div>

              <Button type='submit'>Submit</Button>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
}
