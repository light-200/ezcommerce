import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.categories.create({
        data: {
          name: input.name,
        },
      });
    }),

  update: publicProcedure
    .input(z.object({ id: z.string().min(1), selected: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.categories.update({
        data: {
          selected: input.selected,
        },
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.categories.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
