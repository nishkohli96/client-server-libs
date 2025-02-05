export function getPersonRecordIndex(
  page: number,
  perPage: number,
  index: number
) {
  return (page * perPage) + index + 1;
}
