import clsx from 'clsx';
import * as React from 'react';
import {
  FieldValues,
  useFormContext,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { getAverage, keyStartsWith } from '@/lib/helper';

import Input from '@/components/forms/Input';

import { Report, ReportForm } from '@/types/form-report';

const mapelList: Array<keyof Report> = [
  'bahasa',
  'english',
  'math',
  'nature_science',
  'social_science',
];

const mapelCopywrite: Record<keyof Report, string> = {
  bahasa: 'BIND',
  english: 'BING',
  math: 'MAT',
  nature_science: 'IPA',
  social_science: 'IPS',
};

type RataNilaiProps = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  hasError: boolean;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
};

export function RataNilai({ hasError, register, setValue }: RataNilaiProps) {
  const { watch } = useFormContext();
  const report_grades: ReportForm = watch('report_grades');

  // convert object to score list array
  const scoreList = report_grades
    ? Object.values(report_grades)?.flatMap((grade) => {
        return Object.values(grade).map((score) =>
          isNaN(score) || hasError ? 0 : score
        );
      })
    : [0];

  const averageScore = getAverage(scoreList);

  React.useEffect(() => {
    setValue('rata', averageScore);
  }, [averageScore, setValue]);

  return (
    <>
      <input {...register('rata')} type='hidden' name='rata' />
      <p className='my-2 text-sm font-bold text-gray-700'>
        Rata-Rata Nilai: {averageScore.toFixed(2)}
      </p>
    </>
  );
}

type InputNilaiProps = {
  readOnly?: boolean;
};

export default function InputNilai({ readOnly = false }: InputNilaiProps) {
  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext();
  const hasError = keyStartsWith('report_grades', errors).length > 0;

  return (
    <div>
      <label className='col-start-2 mb-4 block text-sm font-normal text-gray-700'>
        Nilai Pengetahuan Rapor Semester 1 - 5 <br />
      </label>
      <div className='grid grid-cols-6 items-center gap-2 text-center'>
        {[1, 2, 3, 4, 5].map((count) => (
          <label
            key={count}
            className={`block ${
              count === 1 ? 'col-start-2' : null
            } text-sm font-normal text-gray-700`}
          >
            Sem {count}
          </label>
        ))}
        {mapelList.map((mapel) => (
          <React.Fragment key={mapel}>
            <label className='block text-sm font-normal uppercase text-gray-700'>
              {mapelCopywrite[mapel]}
            </label>
            {[1, 2, 3, 4, 5].map((count) => (
              <Input
                key={count}
                label=''
                id={`report_grades.report_${count}_grades.${mapel}`}
                readOnly={readOnly}
                validation={{
                  required: 'Nilai harus diisi',
                  validate: (val) => val > 0 || 'Nilai harus berupa angka',
                  min: {
                    value: 0,
                    message: 'Nilai harus berada dalam rentang 0-100',
                  },
                  max: {
                    value: 100,
                    message: 'Nilai harus berada dalam rentang 0-100',
                  },
                  valueAsNumber: true,
                }}
                hideError
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className='mt-1'>
        <p
          className={clsx('text-xs', {
            'text-red-500': hasError,
            'text-gray-500': !hasError,
          })}
        >
          Nilai berupa bilangan <strong>bulat</strong> dan berkisar antara{' '}
          <strong>1 - 100</strong>
        </p>
      </div>

      <div className='!mt-4'>
        <RataNilai
          hasError={hasError}
          register={register}
          setValue={setValue}
        />
      </div>
    </div>
  );
}
