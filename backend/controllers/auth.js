import { User } from "../models";
import ethUtil from "ethereumjs-util";
import sigUtil from "eth-sig-util";
import jwt from "jsonwebtoken";
import { SECRET, MESSAGE } from "../constants";

/**
 * @description To authenticate a user
 * @api /api/v1/auth/
 * @access Public
 * @type POST
 */

const authenticateUser = (req, res, next) => {
  const { signature, publicAddress } = req.body;
  if (!signature || !publicAddress)
    return res
      .status(400)
      .send({ error: "Signature and publicAddress is required." });

  User.findOne({ publicAddress })
    .then((user) => {
      if (!user)
        return res.status(401).send({
          error: `User with publicAddress ${publicAddress} is not found in database`,
        });
      return user;
    })
    .then((user) => {
      const msgBufferHex = ethUtil.bufferToHex(Buffer.from(MESSAGE, "utf8"));
      const address = sigUtil.recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
      });

      if (address.toLowerCase() === publicAddress.toLowerCase()) {
        return user;
      } else {
        return res.status(401).send({
          isAuthenticated: false,
          error: "Signature verification failed",
        });
      }
    })

    .then(
      (user) =>
        new Promise((resolve, reject) =>
          jwt.sign(
            {
              payload: {
                id: user.id,
                publicAddress,
              },
            },
            SECRET,
            null,
            (err, token) => {
              if (err) {
                return reject(err);
              }
              return resolve(token);
            }
          )
        )
    )
    .then((accessToken) => res.json({ isAuthenticated: true, accessToken }))
    .catch(next);
};

export { authenticateUser };
