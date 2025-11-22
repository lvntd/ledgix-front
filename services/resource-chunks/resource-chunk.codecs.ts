import { z } from 'zod'

export const TResourceChunk = z.object({
  _id: z.string(),
  documentName: z.string().nullable(),
  documentUrl: z.string().nullable(),
  articleNumber: z.number().nullable(),
  articleName: z.string().nullable(),
  articleId: z.string(),
  articleContent: z.array(z.string()),
  chapterNumber: z.string().nullable(),
  chapterTitle: z.string().nullable(),
  sectionNumber: z.string().nullable(),
  sectionTitle: z.string().nullable(),
  articleContext: z.string().nullable(),
  embeddedAt: z.string().optional()
})

export type IResourceChunk = z.infer<typeof TResourceChunk>

export const TResourceChunksResponse = z.object({ data: z.array(TResourceChunk) })
