import { create } from "zustand";

interface ChatStore {
  isOpen: boolean;
  prefilledMessage: string;
  setIsOpen: (open: boolean) => void;
  setPrefilledMessage: (msg: string) => void;
  openWithInquiry: (customer: string, type: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  prefilledMessage: "",
  setIsOpen: (open) => set({ isOpen: open }),
  setPrefilledMessage: (msg) => set({ prefilledMessage: msg }),
  openWithInquiry: (customer, type) =>
    set({
      isOpen: true,
      prefilledMessage: `I have a question about ${customer}'s ${type} policy.`,
    }),
}));
