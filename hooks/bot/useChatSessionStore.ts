import { create } from 'zustand'

type Chat = {
  tempId: number;
  from: string,
  message: string,
}

type ChatSessionState = {
  chats: Chat[]
}

type ChatSessionAction = {
  setChatMessage: ({ from, message }: Chat) => void
}

const chats: Chat[] = []

const initialState = {
  chats,
}

const ChatSessionState = create<ChatSessionState & ChatSessionAction>((set) => ({
  ...initialState,
  setChatMessage: (chat: Chat) => {
    set((state) => ({
      ...state,
      chats: [...state.chats, chat],
    }));
  },
}))

export default ChatSessionState