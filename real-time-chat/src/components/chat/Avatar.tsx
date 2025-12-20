import React from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
  isOnline?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User Avatar',
  size = 48,
  isOnline = false,
}) => {
  return (
    <div style={{ ...styles.container, width: size, height: size }}>
      <img src={src} alt={alt} style={styles.image} />
      {isOnline && <div style={styles.onlineIndicator} />}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    borderRadius: '50%',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #f0f0f0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '12px',
    height: '12px',
    backgroundColor: '#2ecc71',
    borderRadius: '50%',
    border: '2px solid white',
  },
};

export default Avatar;
