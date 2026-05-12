import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  imageUrl: z.string().url().optional(),
  type: z.enum(["info", "success", "warning", "error"]).default("info"),
  duration: z.number().optional().default(5000),
});

export const StateUpdateSchema = z.object({
  actId: z.string().optional().nullable(),
  showId: z.string().optional(),
  isLive: z.boolean().optional(),
  message: MessageSchema.optional(),
}).refine(data => data.actId !== undefined || data.showId !== undefined || data.isLive !== undefined || data.message !== undefined, {
  message: "At least one of 'actId', 'showId', 'isLive', or 'message' must be provided"
});

export type StateUpdate = z.infer<typeof StateUpdateSchema>;
export type LiveMessage = z.infer<typeof MessageSchema>;
