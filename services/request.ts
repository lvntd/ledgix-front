import authConfigs from '@/configs/auth'
import { createRequest, createRequestMethods } from './create-request'
import Cookies from 'js-cookie'

const apiPaths = [
  {
    source: 'auth',
    destination: '/api/auth'
  },
  {
    source: 'clients',
    destination: '/api/clients'
  }
]

export const getApiOriginUrl = (apiPath: string) => {
  return apiPaths.find(path => apiPath.startsWith(path.source))?.destination ?? ''
}

export const { get, post, put, del, patch, options } = createRequestMethods(
  createRequest(({ requestInit, httpUrl }) => {
    // TODO: Consider replacing with an injectable service.
    const headers = new Headers(requestInit.headers)

    const globalAccessToken = Cookies.get(authConfigs.storageTokenKeyName)

    if (globalAccessToken !== null && globalAccessToken !== undefined) {
      headers.set('Authorization', `Bearer ${globalAccessToken}`)
    }

    return {
      requestInit: {
        ...requestInit,
        headers
      },
      originUrl: getApiOriginUrl(httpUrl)
    }
  })
)
