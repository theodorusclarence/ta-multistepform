import { NextApiRequest, NextApiResponse } from 'next';

export const cities = [
  { id: 1, name: 'MAROS' },
  { id: 2, name: 'PANGKAJENE KEPULAUAN' },
  { id: 3, name: 'GOWA' },
  { id: 4, name: 'Kab. Takalar' },
  { id: 5, name: 'JENEPONTO' },
  { id: 6, name: 'BARRU' },
  { id: 7, name: 'BONE' },
  { id: 8, name: 'WAJO' },
  { id: 9, name: 'Kab. Soppeng' },
  { id: 10, name: 'BANTAENG' },
  { id: 11, name: 'BULUKUMBA' },
  { id: 12, name: 'SINJAI' },
  { id: 13, name: 'KEPULAUAN SELAYAR' },
  { id: 14, name: 'PINRANG' },
  { id: 15, name: 'SIDENRENG RAPPANG' },
  { id: 16, name: 'ENREKANG' },
  { id: 17, name: 'LUWU' },
  { id: 18, name: 'TANA TORAJA' },
  { id: 19, name: 'LUWU UTARA' },
  { id: 20, name: 'LUWU TIMUR' },
  { id: 21, name: 'TORAJA UTARA' },
  { id: 22, name: 'KOTA MAKASSAR' },
  { id: 23, name: 'Kota Parepare' },
  { id: 24, name: 'KOTA PALOPO' },
  { id: 25, name: 'Kab. Mamasa' },
  { id: 26, name: 'Kab. Polewali Mandar' },
  { id: 27, name: 'Kab. Poso' },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: cities,
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
