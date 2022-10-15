import clsx from 'clsx';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { REGEX } from '@/lib/form-utils';
import logger from '@/lib/logger';

import Input from '@/components/forms/Input';
import MapSkeleton from '@/components/map/MapSkeleton';
import Seo from '@/components/Seo';

const CustomMap = dynamic(() => import('@/components/map/CustomMap'), {
  ssr: false,
  loading: MapSkeleton,
});
const ReadOnlyMap = dynamic(() => import('@/components/map/ReadOnlyMap'), {
  ssr: false,
  loading: MapSkeleton,
});

export default function MapPage() {
  //#region  //*============== FORMS
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      lat: -6.1754,
      lng: 106.8272,
    },
  });
  const { handleSubmit, watch } = methods;
  const lat = watch('lat');
  const lng = watch('lng');
  //#endregion  //*============== FORMS

  //#region  //*============== ACTION
  const onSubmit = (data: { lat: number; lng: number }) => {
    logger({ data });
  };
  //#endregion  //*============== ACTION

  //#region  //*============== MAP LOCK
  const [mapIsLocked, setMapIsLocked] = React.useState<boolean>(false);

  const toggleLockButton = () => {
    setMapIsLocked((prev) => !prev);
  };
  //#endregion  //*============== MAP LOCK

  return (
    <>
      <Seo templateTitle='Map Component' />

      <section className='bg-gray-100'>
        <article className='layout min-h-main py-16'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-8 flex flex-col gap-12 md:flex-row'
            >
              <figure className='w-full space-y-4'>
                <h2>Map Component</h2>
                <div className='flex gap-4'>
                  <Input
                    readOnly={mapIsLocked}
                    id='lat'
                    label='Lat'
                    validation={{
                      required: 'Lat is required',
                      pattern: {
                        value: REGEX.NUMBER_ONLY,
                        message: 'Lat must be a number',
                      },
                    }}
                  />
                  <Input
                    readOnly={mapIsLocked}
                    id='lng'
                    label='Long'
                    validation={{
                      required: 'Lat is required',
                      pattern: {
                        value: REGEX.NUMBER_ONLY,
                        message: 'Lat must be a number',
                      },
                    }}
                  />
                </div>
                <div className='mt-8 w-full'>
                  <CustomMap
                    isLocked={mapIsLocked}
                    onLockButton={toggleLockButton}
                  />
                </div>
              </figure>

              <figure className='w-full space-y-4'>
                <h2>Read Only</h2>
                <div className='flex gap-4'>
                  <div className='w-full'>
                    <p className='block text-sm font-normal text-gray-700'>
                      Lat
                    </p>
                    <div className='relative mt-1'>
                      <div
                        className={clsx(
                          'cursor-not-allowed border border-gray-300 bg-gray-100 px-3 py-2 focus:border-gray-300 focus:ring-0',
                          'block w-full rounded-md shadow-sm'
                        )}
                      >
                        {lat}
                      </div>
                    </div>
                  </div>
                  <div className='w-full'>
                    <p className='block text-sm font-normal text-gray-700'>
                      Long
                    </p>
                    <div className='relative mt-1'>
                      <div
                        className={clsx(
                          'cursor-not-allowed border border-gray-300 bg-gray-100 px-3 py-2 focus:border-gray-300 focus:ring-0',
                          'block w-full rounded-md shadow-sm'
                        )}
                      >
                        {lng}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-8 w-full'>
                  <ReadOnlyMap />
                </div>
              </figure>
            </form>
          </FormProvider>
        </article>
      </section>
    </>
  );
}
