const Film = require('../models/film')

exports.getPage = async (req, res) => {
    const ListFilm = await Film.find()
    res.status(200).json(ListFilm)
};
