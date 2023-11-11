const express = require('express')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const router = express.Router()
const POST = mongoose.model('POST')
const USER = mongoose.model('USER')



// for user profile
router.get('/user/:id', (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            POST.find({ postedBy: req.params.id })
                .populate("postedBy", "_id")
                .then((post) => {
                    res.status(200).json({ user, post })
                })
                .catch((err) => { return res.json({ error: err }) })
        })
        .catch((err) => { return res.json({ error: "User not found " }) })

})

// to follow user

router.put('/follow', requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    })
        .then((result) => {
            USER.findByIdAndUpdate(req.user._id, {
                $push: { following: req.body.followId }

            }, {
                new: true
            })
                .then((result) => {

                    return res.json(result)
                })
                .catch(err => { return res.status(422).json({ error: err }) })

        })
        .catch(err => { return res.status(422).json({ error: err }) })
})




// to unfollow 

router.put('/unfollow', requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    })
        .then((result) => {
            USER.findByIdAndUpdate(req.user._id, {
                $pull: { following: req.body.followId }

            }, {
                new: true
            })
                .then((result) => {

                    return res.json(result)
                })
                .catch(err => { return res.status(422).json({ error: err }) })

        })
        .catch(err => { return res.status(422).json({ error: err }) })
})


// to upload Profile pic

router.put('/uploadProfilePic', requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id,
        {
            $set: { Photo: req.body.pic }
        },{
            new:true
        })
        .then((result,)=>{
            // console.log('sending ')
            return res.json(result)

        })
        .catch((err)=>{
            return res.status(422).json({error:err})

        })

})







module.exports = router