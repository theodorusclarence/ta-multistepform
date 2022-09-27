import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import produce from 'immer';
import create from 'zustand';

import {
  StepAdministrasiData,
  StepBerkasData,
  StepPendataanData,
  StepPilihSekolahData,
} from '@/types/form';

export type setDataType =
  | { step: 'pendataan'; data: Partial<StepPendataanData> }
  | { step: 'administrasi'; data: Partial<StepAdministrasiData> }
  | { step: 'pilihSekolah'; data: Partial<StepPilihSekolahData> }
  | { step: 'berkas'; data: Partial<StepBerkasData> };

export type ExistingStoreType = {
  pendataan: Partial<StepPendataanData> | null;
  administrasi: Partial<StepAdministrasiData> | null;
  pilihSekolah: Partial<StepPilihSekolahData> | null;
  berkas: Partial<StepBerkasData> | null;
  setData: ({ step, data }: setDataType) => void;
  purge: () => void;
};

const useExistingStoreBase = create<ExistingStoreType>((set) => ({
  pendataan: null,
  administrasi: null,
  pilihSekolah: null,
  berkas: null,
  setData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [step]: data,
    })),
  purge: () =>
    set(
      produce<ExistingStoreType>((state) => {
        state.pendataan = null;
        state.administrasi = null;
        state.pilihSekolah = null;
        state.berkas = null;
      })
    ),
}));

const useExistingStore = createSelectorHooks(useExistingStoreBase);

export default useExistingStore;
