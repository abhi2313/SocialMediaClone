const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const { route } = require('./auth')
const POST=mongoose.model("POST")


router.get('/myposts',requireLogin,(req,res)=>{
    POST.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then((myposts)=>res.json(myposts))
})


router.get('/allposts',requireLogin,(req,res)=>{
    POST.find()
    .populate("postedBy","_id name Photo")
    .populate("comments.postedBy","_id name")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
})


router.post('/createPost',requireLogin,(req,res)=>{
    const {body,pic}=req.body
    // console.log('pic is ',pic)
    // console.log('body is ',body);
    if(!body || !pic)
    {
        
        return res.status(422).json({error:"Please add all the fields"})
    }
    // console.log(req.user);
    const post=new POST({
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save()
    .then((result)=>{
        return res.json({post:result})
    })
    .catch(err=>{console.log(err)})
    

})

router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
    .then((result)=>{
        return res.json(result)
    })
    .catch(err=>{return res.status(422).json({ error: err })})
      
})

router.put('/unlike', requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
    .then((result)=>{
        return res.json(result)
    })
    .catch(err=>{return res.status(422).json({ error: err })})
      
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment={
        comment:req.body.text,
        postedBy:req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },
    {
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
   .then((result)=>{
        return res.json(result)
    })
    .catch(err=>{return res.status(422).json({ error: err })})
})




router.delete("/deletePost/:postId", requireLogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .then((post)=>{
            if (!post) {
                return res.status(422).json({ error: "Post not exist " })
            }

            if (post.postedBy._id.toString() == req.user._id.toString()) {

                post.deleteOne()
                    .then(result => {
                        return res.json({ message: "Successfully deleted" })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
        .catch((err)=>console.log(err))
          
        })





// to show following post

router.get('/myfollowingpost',requireLogin,(req,res)=>{
    POST.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name Photo")
    .populate("comments.postedBy","_id name Photo")
    .then((posts)=>res.json(posts))
    .catch((err)=>{console.log(err)})

})

module.exports=router