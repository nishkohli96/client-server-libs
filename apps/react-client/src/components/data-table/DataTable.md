# DataTable

A reusable component based on Material-UI [DataGrid](https://mui.com/x/react-data-grid/) to view, sort or filter static or dynamic data from an API. This document contains notes on using this component.

Usage can be seen in [PeopleList](../../pages/people/components/PeopleDataGrid.tsx) component.

### [Row Height](https://mui.com/x/react-data-grid/row-height/)
The default row height being set is **52px**. To adjust height for overflowing text, provide the following prop in DataGrid component -
`getRowHeight={() => 'auto'}`

This will however affect all cells and set their text at top left. To keep some texts in center, assign a custom class by passing `cellClassName` prop in column definition.

### [Sorting](https://mui.com/x/react-data-grid/sorting/)
For Pro Versions, multiple sorting is allowed. While using the standard version, we just need to get the first element of the newSortModel to apply sorting through the API.

### [Pagination](https://mui.com/x/react-data-grid/pagination/)
`pageSizeOptions` is an array of number like 10 or a combination of number and object, for example,
`[10, 100, { value: 1000, label: '1,000' }, { value: -1, label: 'All' }]`

Define value as -1 to display all results.

To enable server-side pagination, you need to:
- Set the paginationMode prop to server
- Use the onPaginationModelChange prop to react to the page changes and load the data from the server
