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
