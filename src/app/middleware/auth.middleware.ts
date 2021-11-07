import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../common/exceptions/unauthorized.exception";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserInstance } from "../services/user.service";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
  };
  const jwtAuth = new Strategy(jwtOptions, async (payload, done) => {
    const user = await UserInstance.findById(payload.id);
    if (user) {
      req.body.user = user;
      done(null, true);
      return;
    }
    done("user not found", false);
  });

  passport.authenticate(jwtAuth, function (err, user, _info) {
    if (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return next();
    }
  })(req, res, next);
};
