const User = require('../models/user')

exports.getUser = (async (req, res) => {
  const username = req.query.username
  const userList = await User.find({username})
  res.status(200).json(userList)
})

exports.postUser = (async (req, res) => {
  try {
    const data = {
      name: req.body.username,
      password: req.body.password,
      email: req.body.email,
      numberphone: req.body.numberphone
    }
    const newUser = new User(data);
    const result = await newUser.save()
  } catch (error) {
    res.status(500).json({message : "Không tạo được tài khoản"})
  }
})

exports.userUpdate = async (req, res) => {
  try {
    const userId = req.params.id
    const newData = {
      name: req.body.username,
      email: req.body.email,
      numberphone: req.body.numberphone
    }
    const updatedUser = await User.findByIdAndUpdate(userId, newData)
    if (!updatedUser) {
      return res.status(200).json({ message: "không tìm thấy người dùng" })
    }
    res.status(200).json({ message: "Cập nhật thành công ", user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi Server' })
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const iduser = await User.findById(userId);
    if (!iduser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    await iduser.deleteOne();
    return res.status(200).json({ message: 'Đã xoá thành công' });
  } catch (error) {
    return res.status(500)
  }
};