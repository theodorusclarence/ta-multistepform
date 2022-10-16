import clsx from 'clsx';
import * as React from 'react';
import {
  HiHome,
  HiIdentification,
  HiOutlineExclamationCircle,
  HiThumbUp,
} from 'react-icons/hi';

import PrimaryLink from '@/components/links/PrimaryLink';
import Tooltip from '@/components/Tooltip';

import useRegisterStore from '@/store/useRegisterStore';

type StepTimelineProps = {
  step: number;
  className?: string;
  isDirty?: boolean;
  // todo remove ?
  type?: string;
  maxStep?: number;
};

export default function StepTimeline({
  step,
  className,
  isDirty = false,
  type = 'sma/afirmasi',
  maxStep = 3,
}: StepTimelineProps) {
  //#region  //*=========== Data ===========
  const _data = [
    {
      id: 1,
      route: `/pendaftaran/${type}/pendataan`,
      target: 'Pendataan',
      icon: HiIdentification,
      iconBackground: 'bg-green-700',
    },
    {
      id: 2,
      route: `/pendaftaran/${type}/pilih-sekolah`,
      target: 'Penentuan Lokasi Rumah',
      icon: HiHome,
      iconBackground: 'bg-gray-300',
    },
    {
      id: 3,
      route: `/pendaftaran/${type}/finalisasi`,
      target: 'Finalisasi Data',
      icon: HiThumbUp,
      iconBackground: 'bg-gray-300',
    },
  ];

  // remove berkas route if only 4 step
  const data = _data;
  //#endregion  //*======== Data ===========

  //#region  //*=========== Store ===========
  const pendataan = useRegisterStore.usePendataan();
  const pilihSekolah = useRegisterStore.usePilihSekolah();
  //#endregion  //*======== Store ===========

  const _stepFilled = [pendataan, pilihSekolah].map((i) => Boolean(i));
  // if max step !== 5, remove stepFilled index 1
  const stepFilled = _stepFilled;

  const final = stepFilled.every((i) => Boolean(i));

  return (
    <div className={clsx('flow-root', className)}>
      <ul className='-mb-8 sm:mb-0 sm:flex sm:flex-row'>
        {data.map((datum, index) => {
          const datumStep = index + 1;
          const status =
            step === datumStep
              ? 'current'
              : datumStep === maxStep && final
              ? 'filled'
              : stepFilled[index]
              ? 'filled'
              : 'empty';

          return (
            <li key={datum.id} className={clsx('mx-auto sm:w-1/3')}>
              <div className='relative pb-8 sm:pb-0'>
                {index !== data.length - 1 ? (
                  <span
                    className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 sm:ml-36 sm:h-0.5 sm:w-full'
                    aria-hidden='true'
                  />
                ) : null}
                <div className='relative flex space-x-3 sm:flex-col sm:items-center sm:space-x-0 sm:space-y-3'>
                  {/* Icon */}
                  <div>
                    <span
                      className={clsx(
                        'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-gray-200',
                        {
                          'bg-green-800': status === 'filled',
                          'bg-primary-500': status === 'current',
                          'bg-gray-300': status === 'empty',
                        }
                      )}
                    >
                      <datum.icon
                        className='h-5 w-5 text-white'
                        aria-hidden='true'
                      />
                    </span>
                  </div>
                  {/* Text */}
                  <div className='flex min-w-0 flex-1 items-center justify-between space-x-4 pt-1.5 sm:flex-col sm:justify-center sm:space-x-0 sm:space-y-0.5 sm:pt-0'>
                    <div>
                      <p className='text-sm font-medium text-gray-900 sm:text-center sm:leading-4'>
                        {datum.target}
                      </p>
                    </div>
                    <div className='whitespace-nowrap text-right text-sm text-gray-500 sm:text-left'>
                      {status === 'current' ? (
                        <p>Current</p>
                      ) : status === 'filled' ? (
                        // if is filled, then check if it is dirty
                        !isDirty ? (
                          <PrimaryLink href={datum.route}>
                            {datum.route === `/pendaftaran/${type}/finalisasi`
                              ? 'Finalisasi'
                              : 'Edit'}
                          </PrimaryLink>
                        ) : (
                          <Tooltip content='Form anda belum disimpan, silakan menekan button next pada halaman di bawah.'>
                            <HiOutlineExclamationCircle className='text-lg text-primary-600' />
                          </Tooltip>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
