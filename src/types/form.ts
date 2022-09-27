import { JenisKejuaraan, Juara, TingkatKejuaraan } from '@/types/competition';
import { ReportForm } from '@/types/form-report';

export type FileWithPreview = FileList & {
  readonly path?: string;
  preview: string;
};

export type StepPilihSekolahData = {
  register_type: string;
  kabkot: number;
  dest_school_name: number;
  lat?: number;
  lng?: number;
  map_lock?: boolean;
  sekolah_1_kabupaten?: string;
  sekolah_1_sekolah?: string;
  sekolah_1_kompetensi?: string;

  // used to track school latlong
  sekolah_1_latitude?: number;
  sekolah_1_longitude?: number;

  sekolah_2_kabupaten?: string;
  sekolah_2_sekolah?: string;
  sekolah_2_kompetensi?: string;

  sekolah_3_kabupaten?: string;
  sekolah_3_sekolah?: string;
  sekolah_3_kompetensi?: string;
};

export type StepPendataanData = {
  nisn: string;
  nik: string;
  birth_date: Date;
  name: string;
  gender: string;
  phone: string;
  address: string;
  kk: FileWithPreview[];
  kk_date: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
};

export type StepAdministrasiData = {
  origin_school_name: string;
  report_grades?: ReportForm;
  rata?: number;
  rapor_1?: FileWithPreview[];
  rapor_2?: FileWithPreview[];
  rapor_3?: FileWithPreview[];
  rapor_4?: FileWithPreview[];
  rapor_5?: FileWithPreview[];
};

export type StepBerkasData = {
  kk_date?: string;
  kk?: FileWithPreview[];
  affirmation_type?: 'pkh' | 'kip';
  pkh_nik?: string;
  disabilitas?: string;
  additional_file?: FileWithPreview[];
  vaccine_type: '1' | '2' | 'health_problem';
  vaccine_date: Date;
  vaccine_certificate: FileWithPreview[];
  // nilai kejuaraan
  achievement_score?: number;
  achievement_type?: JenisKejuaraan;
  // Prestasi berjenjang is separated for easier logic
  achievement_name?: string;
  achievement_name_berjenjang?: string;
  achievement_level?: TingkatKejuaraan;
  achievement_rank?: Juara;
  juz_count?: number;
  achievement_file?: FileWithPreview[];
};

export type FormData = StepPendataanData &
  StepAdministrasiData &
  StepBerkasData &
  StepPilihSekolahData;

export type PkhData = {
  account_owner: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  nik: string;
};

export type NIKData = {
  alamat: string;
  jenis_klmin: string;
  nama_lgkp: string;
  nik: string;
  no_kk: string;
  tgl_entri?: string;
  tgl_lhr: string;
  tmpt_lhr: string;
  kab_id: string;
  kec_id: string;
  kab: string;
  kec: string;
};

export type StepPendataanNoNisn = {
  nisn: string;
  name: string;
  junior_school_name: string;
  nik: string;
  birth_date: Date;
  address: string;
  documents: {
    skl: FileWithPreview[];
  };
};

export type StepPendataanKependudukan = {
  nisn: string;
  nik: string;
  name: string;
  gender: string;
  birth_date: Date;
  address: string;
  district_id: string;
  kabupaten: string;
  kecamatan: string;
  reason: string;
  documents: {
    kk: FileWithPreview[];
    support_statement: FileWithPreview[];
  };
};
