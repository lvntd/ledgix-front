import { pipe } from 'fp-ts/lib/function'
import { concatQueryParams } from './concat-query-params'
import { createBody } from './create-body'
import { ExtractRouteParams, generatePath } from './util'
import { map } from 'fp-ts/lib/ReadonlyRecord'
import authConfigs from '@/configs/auth'
import Cookies from 'js-cookie'

export type RestMethod = 'DELETE' | 'GET' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'

export type RequestParams<TPath extends string> = ExtractRouteParams<TPath>

type RequestBody = Record<string, any>

type RequestQuery = URLSearchParams

type RequestHeaders = Headers

type Input<TPath extends string> = (keyof RequestParams<TPath> extends never
  ? {
      params?: undefined
    }
  : {
      params: RequestParams<TPath>
    }) & {
  body?: RequestBody
  query?: RequestQuery
  headers?: RequestHeaders
  init?: RequestInit
  type?: 'file' | 'json'
}

type CreateRequestInput = (requestInit: { httpUrl: string; requestInit: RequestInit }) => {
  originUrl: string
  requestInit: RequestInit
}

export type RequestFunction = (
  method: RestMethod
) => <TPath extends string>(httpUrl: TPath, input: Input<TPath>) => Promise<Response>

export const createRequest = (intercept: CreateRequestInput): RequestFunction => {
  return (method: RestMethod) => {
    return async <TPath extends string>(httpUrl: TPath, input: Input<TPath>) => {
      const headers = new Headers(input.headers)

      const inputType = input.type ?? 'json'

      if (inputType === 'json') {
        headers.set('Content-Type', 'application/json')
      }

      const { requestInit } = intercept({
        requestInit: {
          body: createBody(input.body, inputType),
          headers,
          method,
          ...input.init
        },
        httpUrl
      })

      try {
        const params = pipe(input.params ?? {}, map(encodeURIComponent) as any) as any

        // support both client-side and server-side
        const response = await window.fetch(
          concatQueryParams(generatePath(`${httpUrl}`, params), input.query),
          requestInit
        )

        if (response.status === 401) {
          Cookies.remove(authConfigs.storageTokenKeyName)
          throw new Error('error_not_authorized')
        }

        if (response.status >= 400) {
          const error = await response.json()
          throw new Error(error.message)
        }

        return response
      } catch (error) {
        // This shouldn't happen
        throw error
      }
    }
  }
}

export const createRequestMethods = (request: RequestFunction) => {
  return {
    del: request('DELETE'),
    get: request('GET'),
    options: request('OPTIONS'),
    patch: request('PATCH'),
    post: request('POST'),
    put: request('PUT')
  }
}
