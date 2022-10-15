import { toast } from 'react-hot-toast';

import { DangerouslySetDataType } from '@/store/useRegisterStore';

import {
  StepAdministrasiData,
  StepBerkasData,
  StepPendataanData,
  StepPilihSekolahData,
} from '@/types/form';

type CustomPopulate = {
  customPilihSekolah?: Partial<StepPilihSekolahData>;
  customBerkas?: Partial<StepBerkasData>;
  customPendataan?: Partial<StepPendataanData>;
  customAdministrasi?: Partial<StepAdministrasiData>;
};

export function populateData(
  dangerouslySetData: DangerouslySetDataType,
  {
    customPendataan,
    customBerkas,
    customAdministrasi,
    customPilihSekolah,
  }: CustomPopulate = {}
) {
  dangerouslySetData({
    step: 'pendataan',
    data: { ...pendataan, ...customPendataan },
  });
  dangerouslySetData({
    step: 'berkas',
    data: { ...berkas, ...customBerkas },
  });
  dangerouslySetData({
    step: 'administrasi',
    data: { ...administrasi, ...customAdministrasi },
  });
  dangerouslySetData({
    step: 'pilihSekolah',
    data: { ...pilihSekolah, ...customPilihSekolah },
  });
  toast.success('Data pendaftaran berhasil dipopulate');
}

const pendataan = {
  nisn: '0072186489',
  birth_date: new Date('2007-09-26'),
  name: 'Bambang',
  gender: 'male',
  phone: '+628123456721',
  address: 'Jalan Kepulauan Seribu',
  kk_date: new Date('2020-09-07'),
  kabupaten: '1',
  kecamatan: '1',
  nik: '1234567801234561',
};

const berkas = {};

const pilihSekolah = {
  register_type: 'sma_mutasi',
  kabkot: 1,
  sekolah_1_kabupaten: '1',
  sekolah_1_sekolah: '239',
  sekolah_1_kompetensi: '1',

  sekolah_2_kabupaten: '1',
  sekolah_2_sekolah: '240',
  sekolah_2_kompetensi: '2',

  sekolah_3_kabupaten: '1',
  sekolah_3_sekolah: '243',
  sekolah_3_kompetensi: '3',
  sekolah_1_latitude: -3.9382,
  sekolah_1_longitude: 120.2668,
  lat: -3.9382,
  lng: 120.2668,
  map_lock: true,
};

const administrasi = {
  rata: 76,
  report_grades: {
    report_1_grades: {
      bahasa: 76,
      english: 76,
      math: 76,
      nature_science: 76,
      social_science: 76,
    },
    report_2_grades: {
      bahasa: 76,
      english: 76,
      math: 76,
      nature_science: 76,
      social_science: 76,
    },
    report_3_grades: {
      bahasa: 76,
      english: 76,
      math: 76,
      nature_science: 76,
      social_science: 76,
    },
    report_4_grades: {
      bahasa: 76,
      english: 76,
      math: 76,
      nature_science: 76,
      social_science: 76,
    },
    report_5_grades: {
      bahasa: 76,
      english: 76,
      math: 76,
      nature_science: 76,
      social_science: 76,
    },
  },
  origin_school_name: 'SMP Kanisius',
};
