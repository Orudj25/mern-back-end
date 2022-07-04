import {body} from 'express-validator'

export const registerValidation = [
    body('email','no correct email address').isEmail(),
    body('password','no correct password').isLength({min:5}),
    body('fullName','no correct name').isLength({min:3}),
    body('avatarUrl','no correct URL').optional().isURL()
]


export const LoginValidation = [
    body('email','no correct email address').isEmail(),
    body('password','no correct password').isLength({min:5})
]


export const postCreateValidation = [
    body('title','write title name').isLength({min:3}).isString(),
    body('text','write text').isLength({min:3}).isString(),
    body('tags','wrong tags format (write array)').optional().isArray(),
    body('imageUrl','wrong image link').optional().isString()
]

