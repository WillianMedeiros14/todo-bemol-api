import vine from '@vinejs/vine'
import { uniqueRule } from '../rules/unique.js'

export const createUser = vine.compile(
  vine.object({
    username: vine.string().minLength(8).maxLength(50),
    email: vine.string().use(uniqueRule({ table: 'users', column: 'email' })),
    password: vine.string().minLength(8),
    image: vine.string().optional(),
  })
)
