import React, { useState } from 'react';
import Avatar from './Avatar';
import Button from '../../ui/Button'; // ใช้ Button จาก UI ที่มีอยู่

interface User {
  name: string;
  status: string;
  avatarUrl: string;
}

interface ChatListHeaderProps {
  user: User;
}

const dummyUsers: User[] = [
  { name: 'John Doe', status: 'Online', avatarUrl: '' },
  { name: 'Jane Smith', status: 'Offline', avatarUrl: '' },
];

const ChatListHeader: React.FC<ChatListHeaderProps> = ({ user }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleNewChat = () => {
    setIsSearchOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = dummyUsers.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(results);
  };

  const handleSelectUser = (user: User) => {
    alert(`Starting chat with ${user.name}`);
    setIsSearchOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.userInfo}>
        <Avatar src={user.avatarUrl} alt={user.name} size={56} />
        <div style={styles.UserDetails}>
          <h3 style={styles.userName}>{user.name}</h3>
          <p style={styles.userStatus}>{user.status}</p>
        </div>
      </div>

      <div style={styles.actions}>
        <Button
          variant="primary"
          style={{
            fontSize: '0.9em',
            padding: '10px 15px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
          onClick={handleNewChat}
        >
          New Chat
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Button>
        <button style={styles.iconButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#007bff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      </div>

      {isSearchOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <input
              type="text"
              placeholder="Search for a user..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={styles.searchInput}
            />
            <ul style={styles.searchResults}>
              {searchResults.map((user) => (
                <li
                  key={user.name}
                  style={styles.searchResultItem}
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
            <button onClick={() => setIsSearchOpen(false)} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: '#fff',
    padding: '10px 20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  UserDetails: {
    marginLeft: '15px',
  },
  userName: {
    margin: '0 0 4px 0',
    fontSize: '1.2em',
    fontWeight: '700',
    color: '#333',
  },
  userStatus: {
    margin: 0,
    fontSize: '0.9em',
    color: '#999',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
  searchResults: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  searchResultItem: {
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  searchResultItemHovered: {
    backgroundColor: '#f0f0f0',
  },
  closeButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default ChatListHeader;
