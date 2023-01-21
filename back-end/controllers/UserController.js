const db = require('../models/UserModel')

const userController = {}; 

userController.getProject = (req, res, next) => {
    const { username, repo } = req.body;
    fetch(`https://api.github.com/repos/${username}/${repo}/pulls`)
    .then(data => data.json())
    .then(data => {
        console.log(data)
        const newUser = new UserModel({username, project})

        return next();
    })
    .catch(err => next(err));

}

module.exports = userController;

