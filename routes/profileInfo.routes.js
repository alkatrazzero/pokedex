const {Router} = require("express")
const router = Router()
const ProfileInfo = require("../models/profileInfo");
const auth = require("../midleware/auth_midleware")
router.post(
  '/profileInfo', auth,
  async (req, res) => {
    try {
      const profileInfo =await ProfileInfo.findOneAndUpdate({owner: req.user.user_id},
        req.body.user

      )

      await profileInfo.save()
      res.status(200).json({message: "profile updated"})

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'something wrong'})
    }
  })
router.get(
  '/getProfileInfo', auth,
  async (req, res) => {
    try {
      const profileInfo = await ProfileInfo.find({owner: req.user.user_id})
      res.status(200).json({profileInfo})
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'something wrong'})
    }
  }
)



module.exports = router