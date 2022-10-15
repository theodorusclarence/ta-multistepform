import * as React from 'react';

import clsxm from '@/lib/clsxm';
import { populateData } from '@/lib/development';

import Button from '@/components/buttons/Button';

import useRegisterStore from '@/store/useRegisterStore';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function DevTool({ children, className }: Props) {
  //#region  //*=========== STORE ===========
  const dangerouslySetData = useRegisterStore.useDangerouslySetData();
  //#endregion  //*======== STORE ===========

  return (
    <div
      className={clsxm(
        'mt-8 flex flex-col items-center rounded-md bg-primary-100 p-4 text-center print:hidden',
        className
      )}
    >
      <h4>Development Tools</h4>
      <p className='text-sm text-gray-700'>
        Untuk keperluan demo, tidak ditampilkan pada aplikasi sebenarnya
      </p>
      {children}
      <div className='w-full sm:max-w-xs'>
        <Button
          className='mt-4'
          type='button'
          onClick={() => {
            populateData(dangerouslySetData, {
              customPilihSekolah: { register_type: 'sma_prestasi' },
            });
          }}
        >
          Populate Data
        </Button>
      </div>
    </div>
  );
}
