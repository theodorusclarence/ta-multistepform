import { useQuery } from '@tanstack/react-query';

import { mockQuery } from '@/lib/axios-mock';

import { ApiReturn, Place, School } from '@/types/api';

export default function useSchoolData(id: string) {
  const { data: kabupatenData, isLoading: isKabupatenLoading } = useQuery<
    ApiReturn<Place[]>
  >(['/cities'], mockQuery);

  const { data: sekolahData, isLoading: isSekolahLoading } = useQuery<
    ApiReturn<School[]>
  >([`/cities/${id}/highschools`], mockQuery, {
    enabled: !!id,
  });

  return {
    kabupaten: {
      data: kabupatenData?.data,
      isLoading: isKabupatenLoading,
    },
    sekolah: {
      data: sekolahData?.data,
      isLoading: isSekolahLoading,
    },
  };
}
