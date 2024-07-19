import { create } from 'zustand';

interface SelectedDate {
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
}

const initSelectedDate = {
	selectedDate: new Date(),
};

export const useSelectedDateStore = create<SelectedDate>()((set) => ({
	selectedDate: new Date(),
	setSelectedDate: (date) => set({ selectedDate: date }),
}));
