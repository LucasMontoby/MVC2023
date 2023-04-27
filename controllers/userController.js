const User = require('../models/User');

exports.index = async (req, res) => {
  const users = await User.find();
  res.render('users/index', { users });
};

exports.new = (req, res) => {
  res.render('users/new');
};

exports.create = async (req, res) => {
  const user = new User(req.body.user);
  await user.save();
  res.redirect(`/users/${user._id}`);
};

exports.show = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('users/show', { user });
};

exports.edit = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('users/edit', { user });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { ...req.body.user });
  res.redirect(`/users/${user._id}`);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect('/users');
};