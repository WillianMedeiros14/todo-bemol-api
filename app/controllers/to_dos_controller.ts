import Todo from '#models/todo'
import { createTodo } from '#validators/todo'
import { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  public async create({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const data = request.only(['name', 'description', 'completed'])

    await createTodo.validate(data)

    const newToDo = await Todo.create({ ...data, user_id: user.id })

    return newToDo
  }
}
