import vine from '@vinejs/vine'

export const createTodo = vine.compile(
  vine.object({
    name: vine.string().minLength(5).maxLength(255),
    description: vine.string().maxLength(500).optional(),
    completed: vine.boolean(),
  })
)
