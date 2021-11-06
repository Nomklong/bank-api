import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../common/exceptions/unauthorized.exception";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
  };
  const jwtAuth = new Strategy(jwtOptions, (payload, done) => {
    console.log(payload);
    if (payload.id === 1) {
      done(null, true);
      return;
    }
    done(null, false);
  });
  passport.authenticate(jwtAuth, function (err, user, _info) {
    console.log(user);
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
