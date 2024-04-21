/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import TodosController from '#controllers/to_dos_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('register', [UsersController, 'register'])
router.post('authenticate', [UsersController, 'authenticate'])
router.post('logout', [UsersController, 'logout']).use(middleware.auth())

router.post('todo/create', [TodosController, 'create']).use(middleware.auth())
