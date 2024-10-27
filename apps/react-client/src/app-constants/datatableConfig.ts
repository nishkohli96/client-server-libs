const dataTableConfig = Object.freeze({
  paginationOptions: [10, 20, 30, 40],
  get defaultPageSize() {
    return this.paginationOptions[0];
  }
});

export default dataTableConfig;
