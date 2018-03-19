module.exports = (app, db) => {

  const UserModel = require('../models/user');
  const { ObjectId } = require('mongodb');
  const { hashSync, compareSync, genSaltSync } = require('bcrypt-nodejs');

  const SALT_ROUNDS = 10;

  const userModel = new UserModel(db, ObjectId);

  const getUserByEmail = async (value) => {
    return await userModel.getUserByEmail(value);
  };

  const getUserByUserName = async (value) => {
    return await userModel.getUserByUserName(value);
  }

  const hash = (pass) => {
    return hashSync(pass, genSaltSync(SALT_ROUNDS));
  }

  app.post('/loginWithPass', (req, res) => {

    const { email, pass } = req.body;

    return getUserByEmail(email).then(user => {

      if (!user) return res.send({ error: "User Not Found!" });

      if (!compareSync(pass, user.pass)) return res.send({ error: "Incorrect password!" });

      return res.send({ user_id: user._id });

    });
  });

  app.post('/signup', (req, res) => {

    const userInfo = req.body;

    return getUserByEmail(userInfo.email).then(user => {
      if (user) {
        return res.send({ error: 'This email is already registered.' });
      }
      return getUserByUserName(userInfo.userName).then(user => {

        if (user) {
          return res.send({ error: 'This user name is already registered!' });
        }

        delete userInfo.confirmPass;
        userInfo.pass = hash(userInfo.pass);

        userModel.insertUser(userInfo).then(_id => {
          return res.send({ user_id: _id });
        });
      });
    });
  });

  app.post('/checkusername',(req,res)=>{
    if(!req.body.userName) 
    return res.send({error:"Please fill user name field!"});
    userModel.getUserByUserName(req.body.userName)
    .then(user=>{
      if(user) return res.send({error:"This user name already used!"});
      else return res.send({message:"Available username"})
    })
  });

  app.post('/checkemail',(req,res)=>{
    if(!req.body.email) 
    return res.send({error:"Please fill Email field"});
    userModel.getUserByEmail(req.body.email)
    .then(user=>{
      if(user) return res.send({error:"this email address already used!"});
      else return res.send({message:"Available emil"})
    })
  });
}