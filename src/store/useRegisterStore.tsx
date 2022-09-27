import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import produce from 'immer';
import create from 'zustand';

import {
  StepAdministrasiData,
  StepBerkasData,
  StepPendataanData,
  StepPilihSekolahData,
} from '@/types/form';

export type SetDataType =
  | { step: 'pendataan'; data: StepPendataanData }
  | { step: 'administrasi'; data: StepAdministrasiData }
  | { step: 'pilihSekolah'; data: StepPilihSekolahData }
  | { step: 'berkas'; data: StepBerkasData };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DangerouslySetDataType = ({ step, data }: any) => void;

export type RegisterStoreType = {
  pendataan: StepPendataanData | null;
  administrasi: StepAdministrasiData | null;
  pilihSekolah: StepPilihSekolahData | null;
  berkas: StepBerkasData | null;
  setData: ({ step, data }: SetDataType) => void;
  dangerouslySetData: DangerouslySetDataType;
  purge: () => void;
};

const useRegisterStoreBase = create<RegisterStoreType>((set) => ({
  pendataan: null,
  administrasi: null,
  pilihSekolah: null,
  berkas: null,
  setData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [step]: data,
    })),
  dangerouslySetData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [step]: data,
    })),
  purge: () =>
    set(
      produce<RegisterStoreType>((state) => {
        state.pendataan = null;
        state.administrasi = null;
        state.pilihSekolah = null;
        state.berkas = null;
      })
    ),
}));

const useRegisterStore = createSelectorHooks(useRegisterStoreBase);

export default useRegisterStore;
