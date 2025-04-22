import TextField, { type TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput(props: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      placeholder="Search here..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="execute search" edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
}
