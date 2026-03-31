export const fileStructure = 
`
Chat Component
├── View
│   ├── Header UI
│   ├── Message List UI
│   ├── Loading UI
│   ├── Quick Action Buttons
│   └── Input Form UI
│
└── Business Logic
    ├── API Communication
    │   ├── BASE_API_URL
    │   └── fetchWithRetry()
    │
    ├── Client State
    │   ├── messages
    │   ├── input
    │   └── isLoading
    │
    ├── Event Handlers
    │   ├── handleSend()
    │   ├── handleKeyDown()
    │   └── handleQuickAction()
    │
    ├── Chat Flow Logic
    │   └── sendMessage()
    │
    └── Error Handling

`

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