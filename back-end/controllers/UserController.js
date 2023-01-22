const User = require('../models/UserModel')

const userController = {
    createUser (req,res, next){
        const {username, password} = req.body;
        const projectName = req.body.repo.name; 

        const newUser = new User({username, password, projectName}); 
        
        newUser.save((err, user) => {
            if (err) return next('Error in createUser middleware');
            res.locals.newUser = user; 
            return next();
        })
    }
}; 


userController.getProject = (req, res, next) => {
    const { username, repo } = req.body;
    fetch(`https://api.github.com/repos/${username}/${repo}/pulls?state=all`)
    .then(data => data.json())
    .then(data => {
        res.locals.data = data;
        return next();
    })
    .catch(err => next(err));

}

userController.getProjectsList = (req, res, next) => {
    const { username } = req.body;
    User.findOne({username: username}) //can get two not sure why
        .then((data) => {
            res.locals.projects = data.projects;
            next();
        })
        .catch(err => next(err));
};

userController.addProject = (req, res, next) => {
    const { username, repo } = req.body;

    // TODO update user document in database
}

userController.createUser = (req,res,next) => {
    console.log('gothere')
    const {username} = req.body;
    console.log(username)
    User.create({username: username})
    .then((data) => {
        console.log(data)
        res.locals.success = true;
        return next();
    })
    .catch(err => {
        console.log('err creating')
        next(err)});
}

userController.validateUser = (req, res, next) => {
    const {username} = req.body;
    User.find({username: username})
        .then((data) => {
            if (data.length === 1) res.locals.loggedIn = true;
            return next();
        })
        .catch(err => next(err));
}

module.exports = userController;

