import React, { useState } from 'react';
import Avatar from './Avatar';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface User {
  name: string;
  status: string;
  avatarUrl: string;
}

interface ChatListHeaderProps {
  user: User;
}

const ChatListHeader: React.FC<ChatListHeaderProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <Avatar src={user.avatarUrl} alt={user.name} size={56} isOnline />
        <div>
          <Button
            variant="primary"
            style={{
              fontSize: '0.9em',
              padding: '10px 15px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            New Chat
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Button>
        </div>
      </div>

      <div className="relative inline-block text-left">
        <div style={{ cursor: 'pointer' }} onClick={toggleDropdown}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5a3f31"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <circle cx="12" cy="12" r="1" fill="#5a3f31"></circle>
            <circle cx="12" cy="5" r="1" fill="#5a3f31"></circle>
            <circle cx="12" cy="19" r="1" fill="#5a3f31"></circle>
          </svg>
        </div>
        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-44 origin-top-right bg-white rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
            style={styles.dropdownCenterWrapper}
            ref={dropdownRef}
          >
            <div style={styles.dropdrownMenu}>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
                className="flex w-full items-center px-4 py-2 justify-center"
                style={styles.buttonDropdown}
              >
                <svg
                  width="20"
                  height="20"
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.17a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                ตั้งค่า
              </button>

              <div className="border-t" style={styles.separatorLine}></div>

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center px-4 py-2 justify-center"
                style={styles.buttonDropdown}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                ออกจากระบบ
              </button>
            </div>
          </div>
        )}
      </div>
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
  dropdownCenterWrapper: {
    left: '50%',
    transform: 'translateX(-50%)',
  },
  dropdrownMenu: {
    backgroundColor: '#d8c3a5',
    padding: '6px',
    borderRadius: '8px',
    border: '1px solid #b08969',
  },
  buttonDropdown: {
    padding: '8px 12px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    border: 0,
    backgroundColor: '#d8c3a5',
    color: '#5a3f31',
    fontSize: '16px',
    fontWeight: 600,
  },
  separatorLine: {
    color: '#6a4a3c',
  },
};

export default ChatListHeader;
