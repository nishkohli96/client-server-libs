export const ExpressServerEndpoints = Object.freeze({
  apiPrefix: '/api',
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
      edit: 'edit',
      delete: 'delete',
      downloadList: 'download-list'
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
      unlinkEmail: 'unlink-email',
      magicLinkEmail: 'magic-link',
      magicLinkRedirect: 'discovery-redirect',
      emailOTP: 'email-otp',
      smsOTP: 'sms-otp',
      resetPassword: 'reset-password',
      authenticatePassword: 'authenticate-with-password',
      passwordStrength: 'password-strength',
      authenticateEmailOTP: 'authenticate-email-otp',
    }
  }
});
