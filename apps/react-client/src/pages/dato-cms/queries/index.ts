export const AllLegalPagesQuery = `{
  allLegalPages {
	id
	title
	_status
	_firstPublishedAt
  }
    
  _allLegalPagesMeta {
	count
  }
}`;


export const StoreLocationsQuery = `{
  store {
    storeName
    storeImage{
      url
    }
    storeLocation {
      latitude
      longitude
    }
  }
}`;
