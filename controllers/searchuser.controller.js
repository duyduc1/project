const User = require('../models/user')

exports.getListUser = (async(req,res) =>{
    res.render('filterByUsername.ejs' , {users : null})
})

exports.getUserList = (async(req,res) =>{
    try{
        const username = req.query.username;
        
        if(!username){
            return res.status(400).json({error : "không tìm thấy người dùng"})
        }
        
        const users = await User.find({ username: { $regex: new RegExp(username, 'i') } });        
        console.log(users);
        res.render('filterByUsername.ejs', { users });
    }catch(error){
        console.error('Error searching users by username:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})