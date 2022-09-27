export type JenisKejuaraan =
  | 'berjenjang'
  | 'tidak-berjenjang'
  | 'beregu'
  | 'hafiz';

export type TingkatKejuaraan =
  | 'internasional'
  | 'nasional'
  | 'provinsi'
  | 'kabupaten/kota';

export type Juara = 1 | 2 | 3;

export type KejuaraanDataType<T> = {
  value: T;
  title: string;
};

export type PembobotanNilaiDataType = {
  [key in Exclude<JenisKejuaraan, 'hafiz'>]: {
    [key in TingkatKejuaraan]: {
      [key in Juara]: number;
    };
  };
};
