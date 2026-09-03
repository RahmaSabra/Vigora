import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "../db";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);

        if (user.rows.length === 0) {
          return done(null, false);
        }

        const userId = user.rows[0].id;
        const userAccount = await pool.query(
          "SELECT * FROM auth_accounts WHERE user_id = $1",
          [userId],
        );

        if (userAccount.rows.length === 0) {
          return done(null, false);
        }

        const storedPasswordHash = userAccount.rows[0].password_hash;

        bcrypt.compare(password, storedPasswordHash, (err, result) => {
          if (err) {
            return done(err);
          }

          if (result) {
            return done(null, user.rows[0]);
          }

          return done(null, false);
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);
