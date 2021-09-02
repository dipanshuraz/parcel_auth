import { User } from "../models";

const getAllUser = (req, res, next) => {
  const { publicAddress } = req.query;
  return User.find({ publicAddress })
    .then((users) => res.json(users))
    .catch(next);
};

const getSingleUser = async (req, res, next) => {
  try {
    if (req.user.payload.id !== req.params.userId) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    const user = await User.findById(req.params.userId);
    res.json({ user });
  } catch (error) {
    return next(error);
  }
};

const createUser = (req, res, next) =>
  User.create(req.body)
    .then((user) => res.json(user))
    .catch(next);

const patchUser = (req, res, next) => {
  // Only allow to fetch current user

  if (req.user.payload.id !== req.params.userId) {
    return res.status(401).send({ error: "You can can only access yourself" });
  }
  return User.findById(req.params.userId)
    .then((user) => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
};

export { createUser, getAllUser, getSingleUser, patchUser };
