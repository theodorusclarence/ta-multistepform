import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import produce from 'immer';
import create from 'zustand';

import { StepPendataanData, StepPilihSekolahData } from '@/types/form';

export type SetDataType =
  | { step: 'pendataan'; data: StepPendataanData }
  | { step: 'pilihSekolah'; data: StepPilihSekolahData };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DangerouslySetDataType = ({ step, data }: any) => void;

export type RegisterStoreType = {
  pendataan: StepPendataanData | null;
  pilihSekolah: StepPilihSekolahData | null;
  setData: ({ step, data }: SetDataType) => void;
  dangerouslySetData: DangerouslySetDataType;
  purge: () => void;
};

const useRegisterStoreBase = create<RegisterStoreType>((set) => ({
  pendataan: null,
  pilihSekolah: null,
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
        state.pilihSekolah = null;
      })
    ),
}));

const useRegisterStore = createSelectorHooks(useRegisterStoreBase);

export default useRegisterStore;
