
const Users=require('../models/Users');

//!Users
exports.addUsers = async (req, res) => {

  const errorArr = [];

  console.log(req.body);
  try {
   
    req.body={... req.body};
          if(!req.body) res.send("body requrd")
          await Users.userValidationsabt(... req.body);

          await Users.create({
              ...req.body
          });
      res.status(200).send('ok')
  } catch (err) {
    console.log(err);
      err.inner.forEach((e) => {
          errorArr.push({
              name: e.path,
              message: e.message,
          });
      });

      
  }
};