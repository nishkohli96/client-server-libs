import axios from 'axios';
import { toast } from 'react-toastify';

type QueryStringPayload = Record<string, string | number>;

export const generateQueryString = (params: QueryStringPayload) => {
  let newPayload = {};
  Object.keys(params).map(key => {
    if (params[key]) {
      newPayload = {
        ...newPayload,
        [key]: `${params[key]}`
      };
    }
    return newPayload;
  });
  const searchParams = new URLSearchParams(newPayload);
  return searchParams.toString();
};

export const isValidResponseCode = (responseCode: number) => {
  return [200, 304].includes(responseCode);
};

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(
      error.response?.data?.message || `Error: ${error.message || 'Unknown error occurred'}`
    );
  } else {
    const errMsg = error instanceof Error ? error.message : JSON.stringify(error);
    toast.error(`An unexpected error occurred while fetching the data: ${errMsg}`);
  }
};

