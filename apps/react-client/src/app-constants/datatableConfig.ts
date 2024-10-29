const dataTableConfig = Object.freeze({
  paginationOptions: [10, 20, 30, 40],
  get defaultPageSize() {
    return this.paginationOptions[0];
  },
  debounceTimeMillis: 300
});

export default dataTableConfig;
