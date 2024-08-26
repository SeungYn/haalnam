import { create } from 'zustand';

interface BasicLoadingStore {
	loading: boolean;
	message: string;
	setLoading: (message: string) => void;
	reset: () => void;
}

const initStore = {
	loading: false,
	message: '',
};

export const useBasicLoadingStore = create<BasicLoadingStore>()((set) => ({
	loading: false,
	message: '',
	setLoading: (message) => set({ loading: true, message }),
	reset: () => set({ ...initStore }),
}));
