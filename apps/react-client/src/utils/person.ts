export function getPersonRecordIndex(
  page: number,
  perPage: number,
  index: number
) {
  return (page - 1) * perPage + index + 1;
}
