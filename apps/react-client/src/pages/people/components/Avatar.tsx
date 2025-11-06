import { Fragment } from 'react';
import MuiAvatar from '@mui/material/Avatar';

type AvatarProps = {
  url?: string;
  fullName: string;
};

const Avatar = ({ url, fullName }: AvatarProps) => {
  const getAvatarInitials = () => {
    const nameArr = fullName.split(' ');
    return (nameArr[0].charAt(0) + nameArr?.[1]?.charAt(0)).toUpperCase();
  };

  return (
    <Fragment>
      {url
        ? (
          <MuiAvatar src={url} alt={fullName} />
        )
        : (
          <MuiAvatar>
            {getAvatarInitials()}
          </MuiAvatar>
        )}
    </Fragment>
  );
};

export default Avatar;
