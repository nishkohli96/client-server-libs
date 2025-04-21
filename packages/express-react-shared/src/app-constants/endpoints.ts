export const ExpressServerEndpoints = Object.freeze({
  apiPrefix: '/api',
  aws: {
    rootPath: '/aws',
    subRoutes: {
      uploadPreSignedUrl: 'upload-presigned-url',
      downloadPreSignedUrl: 'download-presigned-url',
      uploadCSVFile: 'upload-csv-file',
      downloadFile: 'download-file'
    }
  },
  buyer: {
    rootPath: '/buyers',
    subRoutes: {
      purchase: 'purchase',
      purchaseDetails: 'purchase-details'
    }
  },
  car: {
    rootPath: '/car',
    subRoutes: {
      list: 'list',
      groupByBrand: 'group-by-brand',
      add: 'add',
      details: 'details',
      update: 'update',
      delete: 'delete',
      deletedList: 'deleted-list',
      restore: 'restore',
      ownersList: 'owners-list'
    }
  },
  carBrand: {
    rootPath: '/car-brand',
    subRoutes: {
      add: 'add',
      list: 'list',
      delete: 'delete'
    }
  },
  files: {
    rootPath: '/file',
    subRoutes: {
      upload: 'upload',
      uploadMany: 'upload-many',
      uploadSeparate: 'upload-separate',
      uploadChunk: 'upload-chunk',
      combineFile: 'combine-file',
      uploadBase64: 'upload-base64',
      combineBase64: 'combine-base64',
      combineWithffmpeg: 'combine-with-ffmpeg'
    }
  },
  people: {
    rootPath: '/people',
    subRoutes: {
      list: 'list',
      add: 'add',
      update: 'update',
      delete: 'delete',
      downloadList: 'download-list'
    }
  },
  user: {
    rootPath: '/user',
    subRoutes: {
      list: 'list',
      listInactive: 'list-inactive',
      add: 'add'
    }
  },
  socket: {
    rootPath: '/socket',
    subRoutes: {
      test: 'test'
    }
  },
  stripe: {
    rootPath: '/stripe',
    subRoutes: {
      checkout: {
        rootPath: '/checkout',
        subRoutes: {
          createSession: 'create-session',
          buyProduct: 'buy-product'
        }
      },
      customers: {
        rootPath: '/customers',
        subRoutes: {
          create: 'create',
          get: 'get',
          update: 'update',
          delete: 'delete',
          list: 'list',
          search: 'search'
        }
      },
      files: {
        rootPath: '/files',
        subRoutes: {
          get: 'get',
          list: 'list'
        }
      },
      payments: {
        rootPath: '/payments',
        subRoutes: {
          create: 'create',
          update: 'update',
          get: 'get',
          cancel: 'cancel',
          capture: 'capture',
          confirm: 'confirm'
        }
      },
      products: {
        rootPath: '/products',
        subRoutes: {
          create: 'create',
          get: 'get',
          update: 'update',
          delete: 'delete',
          list: 'list',
          search: 'search'
        }
      },
      prices: {
        rootPath: '/prices',
        subRoutes: {
          create: 'create',
          get: 'get',
          update: 'update',
          list: 'list',
          search: 'search'
        }
      }
    }
  },
  stytch: {
    rootPath: '/stytch',
    subRoutes: {
      orgSignIn: 'org-signin',
      addMember: 'add-member',
      getMember: 'get-member',
      updateMember: 'update-member',
      deleteMember: 'delete-member',
      migratePassword: 'migrate-password',
      unlinkEmail: 'unlink-email',
      magicLinkEmail: 'magic-link',
      magicLinkRedirect: 'discovery-redirect',
      emailOTP: 'email-otp',
      smsOTP: 'sms-otp',
      verifySMSOTP: 'verify-sms-otp',
      resetPassword: 'reset-password',
      authenticatePassword: 'authenticate-with-password',
      passwordStrength: 'password-strength',
      authenticateEmailOTP: 'authenticate-email-otp',
      getRecoveryCodes: 'get-recovery-codes'
    }
  }
});
