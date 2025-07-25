import {Router} from 'express'
import {userController} from "../controller/userController";

const router = Router()

router.get('/users/:id', userController.getUserById)

router.post('/users/:id/avatar', userController.updateUserAvatar)

router.patch('/users/:id', userController.updateUser)
router.patch('/users/:id/roles', userController.updateUserRoles)

router.delete('/users/:id', userController.deleteUser)


export default router