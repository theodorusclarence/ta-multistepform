const mapJalur = {
  // SMA
  sma_boarding: 'SMA Jalur Boarding School',
  sma_afirmasi: 'SMA Jalur Afirmasi',
  sma_mutasi: 'SMA Jalur Perpindahan Tugas',
  sma_guru: 'SMA Jalur Anak Guru',
  sma_prestasi: 'SMA Jalur Prestasi Akademik',
  sma_prestasi_non_akademik: 'SMA Jalur Prestasi Non Akademik',
  sma_zonasi: 'SMA Jalur Zonasi',

  // SMK
  smk_afirmasi: 'SMK Jalur Afirmasi',
  smk_mutasi: 'SMK Jalur Perpindahan Tugas',
  smk_guru: 'SMK Jalur Anak Guru',
  smk_dudi: 'SMK Jalur Anak DUDI',
  smk_prestasi_non_akademik: 'SMK Jalur Prestasi Non Akademik',
  smk_prestasi: 'SMK Jalur Prestasi',
  smk_terdekat: 'SMK Jalur Terdekat',

  // Bukti
  jadwal_verifikasi: 'Jadwal Verifikasi',
  bukti_penerimaan: 'Bukti Penerimaan',
};

export type JalurType = keyof typeof mapJalur;
export type RegisterType = keyof Omit<
  typeof mapJalur,
  'bukti_penerimaan' | 'jadwal_verifikasi'
>;

export default mapJalur;
