const db = require('../models/UserModel')

const userController = {}; 

userController.getProject = (req, res, next) => {
    const { username, repo } = req.body;
    fetch(`https://api.github.com/repos/${username}/${repo}/pulls?state=all`)
    .then(data => data.json())
    .then(data => {
        console.log(data)
        res.locals.data = data;
        return next();
    })
    .catch(err => next(err));

}

userController.getProjectsList = (req, res, next) => {
    const { username } = req.body;
    // TODO get projects listed in database from user
    // store projects into array
};

userController.addProject = (req, res, next) => {
    const { username, repo } = req.body;

    // TODO update user document in database
}

userController.createUser = (req,res,next) => {
    const {username} = req.body;
    const newUser = new User({username}); 
    newUser.save((err, user) => {
        if (err) return next('Error in createUser middleware');
        res.locals.newUser = user; 
        return next();
    })
}
module.exports = userController;

