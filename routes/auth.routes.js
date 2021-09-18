const {Router} = require("express")
const router = Router()
const jwt=require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require("bcryptjs")
const config=require('config')

const {check, validationResult} = require("express-validator");

// /api/auth
router.post('/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(200).json({errors: errors.array(), message: 'Некорректные данные при регистрации'})
      }
      const {email, password} = req.body

      const candidate = await User.findOne({email})
      if (candidate) {
        return res.status(200).json({message: "такой пользователь уже существует"})
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({email, password: hashedPassword})
      await user.save()
      res.status(201).json({message: "пользователь создан"})

    } catch (e) {
      res.status(500).json({message: "что то пошло не так ,попробуйте снова"})
    }

  })


router.post('/login',
  [
    check('email','Введите корректный email').normalizeEmail().isEmail(),
    check('password','Введите пароль').exists()
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(200).json({errors: errors.array(), message: 'Некорректные данные при входе в систему'})
      }
        const{email,password}=req.body
      const user=await User.findOne({email})

      if(!user){
        return res.status(200).json({message:'пользователь не найден'})
      }
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(200).json({ message: 'Неверный пароль, попробуйте снова' })
      }
      const token = jwt.sign(
        { user_id: user._id},
          config.get("jwtSecret"),

      );
      res.json({ token, userId: user.id })


    } catch (e) {
      res.status(500).json({message: "что то пошло не так ,попробуйте снова"})
    }

  })


module.exports = router