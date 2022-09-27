import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { HiOutlineExclamation, HiOutlineX } from 'react-icons/hi';

import Button from '@/components/buttons/Button';

import { FormData } from '@/types/form';

type SubmissionAlertProps = {
  action: SubmitHandler<FormData>;
  data: FormData | null;
  isLoading: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SubmissionAlert({
  action,
  data,
  isLoading,
  open,
  setOpen,
}: SubmissionAlertProps) {
  const onClose = () => {
    if (isLoading) return;
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as='div'
        static
        className='fixed inset-0 z-40 overflow-y-auto'
        open={open}
        onClose={onClose}
      >
        <div className='flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='z-auto inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
              <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                <button
                  type='button'
                  className={clsx(
                    'rounded-md bg-white text-gray-400 hover:text-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
                    'disabled:cursor-wait disabled:brightness-90 disabled:filter'
                  )}
                  disabled={isLoading}
                  onClick={() => setOpen(false)}
                >
                  <span className='sr-only'>Close</span>
                  <HiOutlineX className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <HiOutlineExclamation
                    className='h-6 w-6 text-yellow-500'
                    aria-hidden='true'
                  />
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Pendaftaran
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Apakah Anda yakin data yang dimasukkan sudah benar?
                      Setelah melakukan penyimpanan permanen, data tidak dapat
                      diubah kembali!
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                <Button
                  type='button'
                  isLoading={isLoading}
                  onClick={() => data && action(data)}
                  className='w-full !font-medium sm:ml-3 sm:w-auto sm:text-sm'
                >
                  Yakin
                </Button>
                <Button
                  type='button'
                  variant='primary'
                  disabled={isLoading}
                  onClick={() => setOpen(false)}
                  className='mt-3 w-full !font-medium sm:mt-0 sm:w-auto sm:text-sm'
                >
                  Batal
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
