/* eslint-disable no-console */
import z, { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const decodeJson = <TCodec extends z.ZodTypeAny>(codec: TCodec) => {
  return async (response: Response) => {
    try {
      const json = await response.json()
      const decodedJson = codec.parse(json)

      return decodedJson as z.infer<TCodec>
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error)
        console.error(validationError)
      } else {
        console.error(error)
      }
      throw error
    }
  }
}
