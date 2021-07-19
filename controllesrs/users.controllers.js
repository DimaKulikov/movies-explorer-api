const UserModel = require('../models/user.model');

exports.getUser = (req, res, next) => {
  const userID = req.user._id;
  UserModel.findOne({ _id: userID })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const userID = req.user._id;
  UserModel.findOneAndUpdate({ _id: userID }, { email, name }, { new: true })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};
