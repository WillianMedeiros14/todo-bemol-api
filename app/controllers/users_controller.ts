import User from '#models/user'
import { createUser } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async register({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password', 'image'])

    await createUser.validate(data)

    const user = await User.create(data)
    const token = await User.accessTokens.create(user)
    let userCreated = {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return response.created({
      user: userCreated,
      token: {
        type: 'bearer',
        token: token.value!.release(),
        expiresAt: token.expiresAt,
      },
    })
  }

  public async authenticate({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    let userCreated = {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return {
      user: userCreated,
      token: {
        type: 'bearer',
        token: token.value!.release(),
        expiresAt: token.expiresAt,
      },
    }
  }
}
