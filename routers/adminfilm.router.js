const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/film');

router.get("/", function (req, res, next) {
    res.render('adminfilm.ejs');
});


router.post("/", function (req, res, callback) {
    var storage = multer.diskStorage({
        destination: function (req, res, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileName = file.fieldname + '-' + uniqueSuffix + '.jpg';
            callback(null, fileName);
        }
    });

    var upload = multer({ storage: storage }).single("profile_pic");

    upload(req, res, async function (error) {
        if (error) {

            res.locals.message = { type: 'error', text: 'Upload failed.' };
            return res.redirect("/upload-profile-pic");
        } else {
            try {

                const { filename, path } = req.file;
                const { namefilm ,time, showdate, nation, producer, category, director ,performer} = req.body;
                const file = new File({ filename, path, namefilm, time, showdate, nation , producer, category, director, performer });

                await file.save();


                res.locals.message = { type: 'success', text: 'Upload successful.' };
                return res.send(`
                <div>
                    <img src="../uploads/${filename}" width="300" style="border-radius: 10px;"/>
                </div>
                <p>Tên phim : ${namefilm}</p>
                <p>Thời hạn phim: ${time}</p>
                <p>Thời gian chiếu phim : ${showdate}</p>
                <p>Quốc gia : ${nation}</p>
                <p>Nhà sản xuất : ${producer}</p>
                <p>Thể loại : ${category}</p>
                <p>Đạo diễn : ${director}</p>
                <p>Diễn viên : ${performer}</p>
                `);
            } catch (saveError) {
                console.error('Error saving file information:', saveError);
                res.locals.message = { type: 'error', text: 'Error saving file information to the database.' };
                return res.redirect("/upload-profile-pic");
            }
        }
    })
})

router.put("/:id", async function (req, res, next) {
    try {
        const filmId = req.params.id;
        const {  namefilm ,time, showdate, nation, producer, category, director ,performer } = req.body;

        const updatedFilm = await File.findByIdAndUpdate(filmId, {  namefilm ,time, showdate, nation, producer, category, director ,performer }, { new: true });

        if (!updatedFilm) {
            return res.status(404).send('Film not found');
        }
        res.status(200).json({ message: "Cập nhật thành công" })

        
    } catch (error) {
        console.error('Error updating film:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete("/:id" , async function (req,res,next){
    try{
        const filmId = req.params.id;
        const idfilm = await File.findById(filmId)
        if(!idfilm){
            return res.status(404).json({ message : "không tìm thấy bộ phim"})
        }
        await idfilm.deleteOne();
        return res.status(200).json({message : "Xoá phim thành công"})
    }catch(err){
        return res.status(500)
    }
})

module.exports = router;
