
/**
 * For filtering refer,
 * https://www.datocms.com/docs/content-delivery-api/filtering-records
 */

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

export const SingleStoreLocationsQuery = `{
  store {
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

/**
 * The above query will give info for only 1 record. Prefix
 * 'all' and make your model name plural to fetch multiple
 * records.
 *
 * Note: The query name approximates the plural rules of the
 * English language. If you are unsure about the actual query
 * name, explore available queries in your API Explorer.
 *
 * For sorting, orderBy: <field>_ASC or orderBy: <field>_DESC
 */
export const StoreLocationsQuery = (limit: number, skip: number) => `{
  allStores(first: ${limit}, skip: ${skip}, orderBy: [storeName_ASC]) {
    storeName
    storeImage {
      url
      responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
    storeLocation {
      latitude
      longitude
    }
  }
}`;
