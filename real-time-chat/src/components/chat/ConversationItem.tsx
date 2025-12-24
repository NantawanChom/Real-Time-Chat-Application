import React from 'react';
import Avatar from './Avatar';

export interface Conversation {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

interface ConversationItemProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick?: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive = false,
  onClick,
}) => {
  const { name, avatarUrl, lastMessage, time, unreadCount } = conversation;

  return (
    <div
      style={{ ...styles.container, ...(isActive ? styles.activeContainer : {}) }}
      onClick={onClick}
    >
      <Avatar src={avatarUrl} alt={name} size={52} />
      <div style={styles.content}>
        <div style={styles.header}>
          <h4 style={styles.name}>{name}</h4>
          <span style={styles.time}>{time}</span>
        </div>
        <div style={styles.footer}>
          <p style={styles.message}>{lastMessage}</p>
          {unreadCount > 0 && <div style={styles.badge}>{unreadCount}</div>}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: '5px',
  },
  activeContainer: {
    backgroundColor: '#d8c3a5',
  },
  content: {
    marginLeft: '15px',
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '4px',
  },
  name: {
    margin: 0,
    fontSize: '1.05em',
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: '0.85em',
    color: '#d8c3a5',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    margin: 0,
    fontSize: '0.95em',
    color: '#666',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    marginRight: '10px',
  },
  badge: {
    backgroundColor: '#7b5a43',
    color: 'white',
    fontSize: '0.8em',
    fontWeight: 'bold',
    minWidth: '20px',
    height: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 6px',
  },
};

export default ConversationItem;
