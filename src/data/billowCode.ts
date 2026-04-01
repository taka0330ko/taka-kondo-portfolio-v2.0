
export const summaryCodeMVP = 
`
// API communication
const fetchWithRetry = async (payload) => { ... };

// Client state
const [messages, setMessages] = useState(initialMessages);
const [input, setInput] = useState("");
const [isLoading, setIsLoading] = useState(false);

// Business logic
const sendMessage = async (userMessage) => {
  if (!userMessage.trim() || isLoading) return;
  setMessages(...);
  setInput("");
  setIsLoading(true);

  try {
    const result = await fetchWithRetry({ ... });
    setMessages(...);
  } catch (error) {
    setMessages(...);
  } finally {
    setIsLoading(false);
  }
};

const handleSend = (e) => { ... };
const handleQuickAction = (actionText) => { ... };

// View
return (
  <section>
    {messages.map(...)}
    <button ...>...</button>
    <form ...>
      <input ... />
      <button ...>...</button>
    </form>
  </section>
);
`

export const viewCode = 
`
export default function ChatRoomPage() {
  const params = useParams();
  const chatId = params.chatId as string;

  const room = useChatStore((state) => state.rooms[chatId]);

  const { isAiThinking, handleSubmit } = useChatRoomController({
    chatId,
    room,
  });

  if (!room) return <div>Room not found</div>;

  return (
    <div>
      <h1>{room.title}</h1>
      <ScrollableChat messages={room.messages} isAiThinking={isAiThinking} />
      <ChatRoomInput handleSubmit={handleSubmit} />
    </div>
  );
}
`

export const logicCode = 
`
export function useChatRoomController({ chatId, room }: Props) {
  const addMessage = useChatStore((state) => state.addMessage);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const hasRequestedInitialResponseRef = useRef(false);

  useEffect(() => {
    if (!room) return;
    if (room.messages.length > 1) return;
    if (hasRequestedInitialResponseRef.current) return;

    hasRequestedInitialResponseRef.current = true;

    const initialAiRes = async () => {
      setIsAiThinking(true);
      try {
        const aiText = await callAi(room.messages);
        if (aiText) addMessage(chatId, "assistant", aiText);
      } finally {
        setIsAiThinking(false);
      }
    };

    initialAiRes();
  }, [room, chatId, addMessage]);

  const handleSubmit = async (message: string) => {
    if (!room) return;

    addMessage(chatId, "user", message);

    const historyWithNewMessage = [
      ...room.messages,
      { role: "user", content: message },
    ];

    setIsAiThinking(true);
    try {
      const aiText = await callAi(historyWithNewMessage);
      if (aiText) addMessage(chatId, "assistant", aiText);
    } finally {
      setIsAiThinking(false);
    }
  };

  return { isAiThinking, handleSubmit };
}
`
export const serviceCode = 
`
export const callAi = async (messages: LocalChatMessage[]) => {
  const chat = window?.puter?.ai?.chat;
  if (typeof chat !== "function") return "";

  try {
    const res = await chat({
      messages: withSystemPrompt(messages),
    });
    return extractAiText(res);
  } catch {
    const prompt = buildPromptWithSystem(messages);
    const res = await chat(prompt);
    return extractAiText(res);
  }
};
`
export const stateCode = 
`
type ChatStore = {
  rooms: Record<string, ChatRoom>;
  createRoom: (initialMessage: string) => string;
  addMessage: (
    chatId: string,
    role: "user" | "assistant",
    content: string
  ) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  rooms: {},

  createRoom: (initialMessage) => {
    const id = crypto.randomUUID();
    set((state) => ({
      rooms: {
        ...state.rooms,
        [id]: {
          title: initialMessage,
          messages: [{ role: "user", content: initialMessage }],
        },
      },
    }));
    return id;
  },

  addMessage: (chatId, role, content) => {
    set((state) => ({
      rooms: {
        ...state.rooms,
        [chatId]: {
          ...state.rooms[chatId],
          messages: [
            ...state.rooms[chatId].messages,
            { role, content },
          ],
        },
      },
    }));
  },
}));
`