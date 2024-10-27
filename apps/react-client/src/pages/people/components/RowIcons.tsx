import { Gender } from '@csl/mongo-models';
import Tooltip from '@mui/material/Tooltip';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MuiEditIcon from '@mui/icons-material/Edit';
import MuiDeleteIcon from '@mui/icons-material/Delete';

type GenderIconProps = {
  gender: Gender;
};

export const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case Gender.Male:
      return (
        <Tooltip title="Male">
          <MaleIcon sx={{ color: '#007ABA' }} />
        </Tooltip>
      );
    case Gender.Female:
      return (
        <Tooltip title="Male">
          <FemaleIcon sx={{ color: '#BE56BF' }} />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title="Others">
          <TransgenderIcon sx={{ color: 'lightgreen' }} />
        </Tooltip>
      );
  }
};

export const ViewIcon = ({ ...iconBtnProps }: IconButtonProps) => {
  return (
    <Tooltip title="View">
      <IconButton {...iconBtnProps}>
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
  );
};

export const EditIcon = ({ ...iconBtnProps }: IconButtonProps) => {
  return (
    <Tooltip title="Edit">
      <IconButton {...iconBtnProps}>
        <MuiEditIcon />
      </IconButton>
    </Tooltip>
  );
};

export const DeleteIcon = ({ ...iconBtnProps }: IconButtonProps) => {
  return (
    <Tooltip title="Delete">
      <IconButton {...iconBtnProps} sx={{ color: 'red' }}>
        <MuiDeleteIcon />
      </IconButton>
    </Tooltip>
  );
};
