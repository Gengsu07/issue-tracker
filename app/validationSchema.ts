import { z } from "zod";

export const createIssueScheme = z.object({
  title: z.string().min(1, { message: 'title required' }).max(255),
  description: z.string().min(10, { message: 'description required minimal 10 characters' }),
});
