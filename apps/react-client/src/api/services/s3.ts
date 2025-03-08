import { serverApi } from 'api/server';
import { ExpressServerEndpoints } from '@csl/react-express';
import { generateQueryString, handleApiError } from 'utils';
import { ServerResponse } from 'types';

const rootPath = ExpressServerEndpoints.aws.rootPath;
const subRoutes = ExpressServerEndpoints.aws.subRoutes;

type PreSignedUrlQueryParams = {
  fileName: string;
};

export async function getS3PresignedUrl(
  params: PreSignedUrlQueryParams
): Promise<string | null> {
  try {
    const queryString = generateQueryString(params);
    const response = await serverApi.get<ServerResponse<string>>(
      `${rootPath}/${subRoutes.uploadPreSignedUrl}?${queryString}`
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

export async function getPreSignedFileUrl(params: PreSignedUrlQueryParams) {
  try {
    const queryString = generateQueryString(params);
    const response = await serverApi.get<ServerResponse<string>>(
      `${rootPath}/${subRoutes.downloadPreSignedUrl}?${queryString}`
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

export async function downloadFile(params: PreSignedUrlQueryParams) {
  try {
    const queryString = generateQueryString(params);
    const response = await serverApi.get<Blob>(
      `${rootPath}/${subRoutes.downloadFile}?${queryString}`,
      {
        responseType: 'blob'
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
}
