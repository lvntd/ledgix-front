import { pipe } from 'fp-ts/lib/function'
import { post } from '../request'
import { decodeJson } from '../decodeJson'
import { TResourceChunksResponse } from './resource-chunk.codecs'

const resourceChunks = '/api/resource-chunk' as const

export type GetResourceChunksInput = {
  resourceChunkIds: string[]
}

export const getResourceChunks = async ({ resourceChunkIds }: GetResourceChunksInput) => {
  return pipe(
    await post(`${resourceChunks}/get-many`, { body: { resourceChunkIds } }),
    decodeJson(TResourceChunksResponse)
  )
}
