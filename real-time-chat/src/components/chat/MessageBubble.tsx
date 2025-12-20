import React from 'react';

interface MessageBubbleProps {
  text: string;
  time: string;
  isMe: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, time, isMe }) => {
  return (
    <div style={{ ...styles.wrapper, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
      <div style={{ ...styles.bubble, ...(isMe ? styles.myBubble : styles.theirBubble) }}>
        <p style={{ margin: 0 }}>{text}</p>
        <span style={{ ...styles.time, color: isMe ? '#e0e0e0' : '#999' }}>{time}</span>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: { display: 'flex', marginBottom: '15px', width: '100%' },
  bubble: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '18px',
    fontSize: '0.95em',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  myBubble: { backgroundColor: '#007bff', color: 'white', borderBottomRightRadius: '4px' },
  theirBubble: { backgroundColor: '#f0f2f5', color: '#333', borderBottomLeftRadius: '4px' },
  time: { fontSize: '0.75em', alignSelf: 'flex-end' },
};

export default MessageBubble;
