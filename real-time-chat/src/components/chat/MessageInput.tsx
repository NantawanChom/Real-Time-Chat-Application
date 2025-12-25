import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [inputText, setInputText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
      setShowEmoji(false);
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    setInputText((prev) => prev + emojiObject.emoji);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmoji]);

  return (
    <div style={styles.wrapper}>
      {showEmoji && (
        <div style={styles.emojiWrapper} ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      <div style={styles.container}>
        <button style={styles.iconBtn} onClick={() => setShowEmoji(!showEmoji)}>
          😊
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          style={styles.input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button style={styles.sendBtn} onClick={handleSend}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: { position: 'relative' },
  emojiWrapper: {
    position: 'absolute',
    bottom: '80px',
    left: '20px',
    zIndex: 100,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderTop: '1px solid #eee',
    gap: '15px',
  },
  input: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '25px',
    border: '1px solid #eee',
    backgroundColor: '#f8f9fa',
    outline: 'none',
    fontSize: '1em',
  },
  iconBtn: { background: 'none', border: 'none', fontSize: '1.5em', cursor: 'pointer' },
  sendBtn: {
    backgroundColor: '#5a3f31',
    color: 'white',
    border: 'none',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.1s',
  },
};

export default MessageInput;
