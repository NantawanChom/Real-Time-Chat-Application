// src/pages/ChatListPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatListHeader from '../components/chat/ChatListHeader';
import SearchBar from '../components/chat/SearchBar';
import ConversationItem, { type Conversation } from '../components/chat/ConversationItem';
import MessageBubble from '../components/chat/MessageBubble';
import MessageInput from '../components/chat/MessageInput';
import Avatar from '../components/chat/Avatar';

const currentUser = {
  name: 'Jaehyun Lee',
  status: 'Online',
  avatarUrl: 'https://i.pravatar.cc/150?u=jaehyun',
};

const dummyConversations: Conversation[] = [
  {
    id: '1',
    name: 'Hape Mam',
    avatarUrl: 'https://i.pravatar.cc/150?u=hape',
    lastMessage: 'See you at the meeting!',
    time: '2m ago',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'Groject Team',
    avatarUrl: 'https://i.pravatar.cc/150?u=groject',
    lastMessage: 'The design looks great!',
    time: '1m ago',
    unreadCount: 3,
  },
  {
    id: '3',
    name: 'Coma Pleam',
    avatarUrl: 'https://i.pravatar.cc/150?u=coma',
    lastMessage: 'Did you check the file?',
    time: 'Yesterday',
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Project Team',
    avatarUrl: 'https://i.pravatar.cc/150?u=project',
    lastMessage: "Let's start the sprint.",
    time: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '5',
    name: 'Design Hub',
    avatarUrl: 'https://i.pravatar.cc/150?u=design',
    lastMessage: 'New icons are ready.',
    time: '3 days ago',
    unreadCount: 0,
  },
];

const ChatListPage: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const [allMessages, setAllMessages] = useState<{ [key: string]: any[] }>({
    '1': [
      { text: 'สวัสดีครับ!', time: '10:30 AM', isMe: false },
      { text: 'สวัสดีจ้า มีอะไรให้ช่วยไหม?', time: '10:31 AM', isMe: true },
      { text: 'เห็นงานที่ส่งไปหรือยังครับ?', time: '10:32 AM', isMe: false },
    ],
    '2': [
      { text: 'Team, update on the project?', time: '09:00 AM', isMe: false },
      { text: 'Everything is on track.', time: '09:15 AM', isMe: true },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, activeChatId]);

  const handleSendMessage = (text: string) => {
    if (!activeChatId) return;

    const newMessage = {
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setAllMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));
  };

  const activeChat = dummyConversations.find((c) => c.id === activeChatId);
  const currentMessages = activeChatId ? allMessages[activeChatId] || [] : [];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    setActiveChatId(null);
    setAllMessages({});
    logout();
    navigate('/login');
  };

  const handleDeleteChat = () => {
    if (activeChatId) {
      const updatedMessages = { ...allMessages };
      delete updatedMessages[activeChatId];
      setAllMessages(updatedMessages);
      setActiveChatId(null);
      alert('Chat deleted successfully');
    }
  };

  const handleMarkAsUnread = () => {
    alert('Marked as unread');
  };

  useEffect(() => {
    const savedActiveChatId = localStorage.getItem('activeChatId');
    const savedMessages = localStorage.getItem('allMessages');

    if (savedActiveChatId) {
      setActiveChatId(savedActiveChatId);
    }

    if (savedMessages) {
      setAllMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem('activeChatId', activeChatId);
    }
    localStorage.setItem('allMessages', JSON.stringify(allMessages));
  }, [activeChatId, allMessages]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.sidebar}>
        <ChatListHeader user={currentUser} />
        <SearchBar />

        <h3 style={styles.sectionTitle}>Conversations</h3>

        <div style={styles.conversationList}>
          {dummyConversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={activeChatId === conv.id}
              onClick={() => setActiveChatId(conv.id)}
            />
          ))}
        </div>
      </div>

      <div style={styles.chatArea}>
        {activeChat ? (
          <>
            <div style={styles.chatHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Avatar src={activeChat.avatarUrl} size={42} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1em' }}>{activeChat.name}</h4>
                  <span style={{ fontSize: '0.8em', color: '#2ecc71', fontWeight: '600' }}>
                    Online
                  </span>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <button style={styles.iconButton} onClick={toggleDropdown}>
                  ⋮
                </button>
                {isDropdownOpen && (
                  <div style={styles.dropdownMenu}>
                    <button style={styles.dropdownItem} onClick={handleLogout}>
                      Logout
                    </button>
                    <button style={styles.dropdownItem} onClick={handleDeleteChat}>
                      Delete Chat
                    </button>
                    <button style={styles.dropdownItem} onClick={handleMarkAsUnread}>
                      Mark as Unread
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.messageList}>
              {currentMessages.map((msg, idx) => (
                <MessageBubble key={idx} text={msg.text} time={msg.time} isMe={msg.isMe} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <MessageInput onSend={handleSendMessage} />
          </>
        ) : (
          <div style={styles.placeholder}>
            <div style={styles.placeholderContent}>
              <div style={styles.placeholderIcon}>
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="1"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h2 style={{ color: '#bbb', fontWeight: '500' }}>ยินดีต้อนรับสู่แชท</h2>
              <p style={{ color: '#ccc' }}>เลือกเพื่อนจากด้านซ้ายเพื่อเริ่มสนทนา</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  sidebar: {
    width: '380px',
    minWidth: '380px',
    backgroundColor: '#fff',
    borderRight: '1px solid #f0f0f0',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  sectionTitle: {
    fontSize: '1.1em',
    fontWeight: '700',
    color: '#333',
    margin: '10px 0 15px 5px',
  },
  conversationList: {
    flex: 1,
    overflowY: 'auto',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fb',
    height: '100%',
  },
  chatHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    padding: '15px 30px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
  },
  messageList: {
    flex: 1,
    padding: '20px 30px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  placeholder: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfdfe',
  },
  placeholderContent: {
    textAlign: 'center',
  },
  placeholderIcon: {
    marginBottom: '20px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.3em',
    cursor: 'pointer',
    color: '#aaa',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #f0f0f0',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 20,
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    textAlign: 'left',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1em',
    color: '#333',
    transition: 'background-color 0.2s',
  },
};

export default ChatListPage;
