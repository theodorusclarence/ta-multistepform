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
        {
          id: 239,
          name: 'SMAN 1 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 240,
          name: 'SMAN 2  MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 241,
          name: 'SMAN 3 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 242,
          name: 'SMAN 4 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 243,
          name: 'SMAN 5 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 244,
          name: 'SMAN 6 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 245,
          name: 'SMAN 7 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 246,
          name: 'SMAN 8 MANDAI - MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 247,
          name: 'SMAN 9 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 248,
          name: 'SMAN 10 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 249,
          name: 'SMAN 11 MAROS ',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 250,
          name: 'SMAN 12 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 251,
          name: 'SMAN 13 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
        {
          id: 252,
          name: 'SMAN 14 MAROS',
          latitude: '-3.9382',
          longitude: '120.2668',
        },
      ],
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
