import { z } from "zod";

export const IssueScheme = z.object({
  title: z.string().min(1, { message: 'title required' }).max(255),
  description: z.string().min(10, { message: 'description required minimal 10 characters' }),
});

export const PatchIssueScheme = z.object({
  title: z.string().min(1, { message: 'title required' }).max(255).optional(),
  description: z.string().min(10, { message: 'description required minimal 10 characters' }).max(65553).optional(),
  assignedToUserId: z.string().min(1).max(255).optional().nullable()
});
