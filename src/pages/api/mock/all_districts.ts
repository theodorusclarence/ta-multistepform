import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [
        { id: 1, city_id: 1, name: 'MALLLAWA' },
        { id: 2, city_id: 1, name: 'MANDAI' },
        { id: 3, city_id: 1, name: 'MAROS BARU' },
        { id: 4, city_id: 1, name: 'BANTIMURUNG' },
        { id: 5, city_id: 1, name: 'TANRALILI' },
        { id: 6, city_id: 1, name: 'BONTOA' },
        { id: 7, city_id: 1, name: 'LAU' },
        { id: 8, city_id: 1, name: 'MONCONG LOE' },
        { id: 9, city_id: 1, name: 'TURIKALE' },
        { id: 10, city_id: 1, name: 'MARUSU' },
        { id: 11, city_id: 1, name: 'CENRANA' },
        { id: 12, city_id: 1, name: 'SIMBANG' },
        { id: 13, city_id: 1, name: 'TOMPOBULU' },
        { id: 14, city_id: 1, name: 'CAMBA' },
        { id: 15, city_id: 2, name: 'LIUKANG TANGAYA' },
        { id: 16, city_id: 2, name: 'LIUKANG KALMAS' },
        { id: 17, city_id: 2, name: 'LIUKANG TUPABBIRING' },
        { id: 18, city_id: 2, name: 'PANGKAJENE' },
        { id: 19, city_id: 2, name: 'BALOCCI' },
        { id: 20, city_id: 2, name: 'BUNGORO' },
        { id: 21, city_id: 2, name: 'LABAKKANG' },
        { id: 22, city_id: 2, name: 'MANDALLE' },
        { id: 23, city_id: 2, name: 'SEGERI' },
        { id: 24, city_id: 2, name: 'MINASA TENE' },
        { id: 25, city_id: 2, name: 'TONDONG TALLASA' },
        { id: 26, city_id: 2, name: 'MARANG' },
        { id: 27, city_id: 2, name: 'LIUKANG TUPABBIRING UTARA' },
        { id: 28, city_id: 3, name: 'BONTONOMPO' },
        { id: 29, city_id: 3, name: 'BAJENG' },
        { id: 30, city_id: 3, name: 'PALLANGGA' },
      ],
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
