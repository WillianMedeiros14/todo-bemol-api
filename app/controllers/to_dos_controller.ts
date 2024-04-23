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

  async getAllTodo({ auth }: HttpContext) {
    const user = await auth.authenticate()

    const todoAll = await Todo.query().where('user_id', user.id).orderBy('createdAt', 'desc').exec()

    return todoAll
  }

  async getTodoById({ params, auth, response }: HttpContext) {
    const id = params.id

    const user = await auth.authenticate()

    const todo = await Todo.query().where('id', id).where('user_id', user.id).first()

    if (!todo) {
      return response.status(404).send({ error: 'Todo não encontrado' })
    }

    return todo
  }

  async deleteTodoById({ params, auth, response }: HttpContext) {
    const id = params.id

    const user = await auth.authenticate()

    const todo = await Todo.query().where('id', id).where('user_id', user.id).first()

    if (!todo) {
      return response.status(404).send({ error: 'Todo não encontrado' })
    }

    await todo.delete()

    return response.status(200).send({ success: 'Todo deletado com sucesso' })
  }
}
