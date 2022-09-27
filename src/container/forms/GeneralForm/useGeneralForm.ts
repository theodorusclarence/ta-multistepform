import { useQuery } from '@tanstack/react-query';

import { mockQuery } from '@/lib/axios-mock';

import { ApiReturn } from '@/types/api';

type Place = {
  id: string;
  name: string;
};

type GeneralFormProps = {
  kabupatenId: string;
};

export default function useGeneralForm({ kabupatenId }: GeneralFormProps) {
  //#region  //*=========== Api Call ===========
  const { data: cities } = useQuery<ApiReturn<Place[]>>(['/cities'], mockQuery);
  const { data: districts, isLoading: isDistrictsLoading } = useQuery<
    ApiReturn<Place[]>
  >([`/all_districts?filter[city_id]=${kabupatenId}`], mockQuery, {
    enabled: !!kabupatenId,
  });
  //#endregion  //*======== Api Call ===========

  return {
    cities: cities?.data,
    districts: districts?.data,
    isDistrictsLoading,
  };
}
