import z from 'zod'

export const botQuestionSchema = z.object({
    q: z.string().min(1, {
        message: "Question must have at least 1 character"
    })
})

export type BotQuestionSchemaType = z.infer<typeof botQuestionSchema>