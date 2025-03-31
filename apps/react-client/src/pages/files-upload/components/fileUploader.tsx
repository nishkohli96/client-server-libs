import {
  type ChangeEvent,
  useCallback,
  type DragEvent,
  useState,
  useEffect
} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';

/** https://react-dropzone.js.org/  */

type FileUploaderProps = {
  onFileUpload: (file: File | FileList) => void;
  maxFileSizeMb?: number;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  allowedFileTypes?: string;
  errorMessage?: string;
  height?: string;
  anyFileType?: boolean;
};

export default function FileUploader({
  onFileUpload,
  maxFileSizeMb,
  multiple,
  disabled,
  required,
  allowedFileTypes,
  errorMessage,
  height,
  anyFileType
}: FileUploaderProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (errorMessage?.trim() !== '') {
      setErrorMsg(errorMessage ?? '');
    }
  }, [errorMessage]);

  const handleDragAndDrop = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (
        maxFileSizeMb
        && event.target.files
        && event.target.files[0]
        && event.target.files[0].size > maxFileSizeMb * 1024 * 1024
      ) {
        toast.error(
          `Uploaded file(s) should be less than ${maxFileSizeMb}MB in size.`
        );
        event.target.files = null;
        return;
      } else if (event.target.files) {
        if(multiple) {
          onFileUpload(event.target.files);
        } else {
          onFileUpload(event.target.files[0]);
        }
      }
    },
    [onFileUpload, maxFileSizeMb, multiple]
  );

  return (
    <>
      <Paper
        variant="outlined"
        onDragOver={handleDragAndDrop}
        onDragLeave={handleDragAndDrop}
        onDrop={handleDragAndDrop}
        style={{
          border: '1px solid #D8DDE0',
          padding: '7px 0.75rem',
          background: 'transparent',
          height: height ?? '3rem',
          borderRadius: '10px',
          opacity: disabled ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <input
          accept={anyFileType ? undefined : allowedFileTypes ?? '.jpg, .jpeg'}
          id="drag_and_drop_input"
          multiple={multiple}
          type="file"
          onChange={handleChange}
          style={{
            width: '100%',
            color: '#9A9DA0'
          }}
          disabled={disabled}
          required={required}
        />
      </Paper>
      {Boolean(errorMsg) && (
        <Typography color="#f85050">
          {errorMsg}
          {' '}
        </Typography>
      )}
    </>
  );
}
