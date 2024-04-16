export const StoreLocationsQuery = (limit: number, skip: number) => `{
	allStores(first: ${limit}, skip: ${skip}, orderBy: [storeName_ASC]) {
	  storeName
	  storeImage {
		url
	  }
	  storeLocation {
		latitude
		longitude
	  }
	}
  }`;
