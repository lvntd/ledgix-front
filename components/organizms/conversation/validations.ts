import { z } from "zod";

export const conversationTitleSchema = z.object({
  title: z.string().min(3),
  conversationId: z.string().min(3),
});
