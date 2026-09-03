import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "../db";
import "dotenv/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        if (!profile.name || !profile.emails?.[0]?.value) {
          return done(
            new Error("Google profile is missing required information"),
          );
        }

        const userAccount = await pool.query(
          `SELECT * FROM auth_accounts
           WHERE provider = 'google'
           AND provider_account_id = $1`,
          [profile.id],
        );

        if (userAccount.rows.length > 0) {
          const userResult = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [userAccount.rows[0].user_id],
          );

          if (userResult.rows.length === 0) {
            return done(
              new Error("User associated with Google account not found"),
            );
          }

          return done(null, userResult.rows[0]);
        }

        const userResult = await pool.query(
          `INSERT INTO users (first_name, email)
           VALUES ($1, $2)
           RETURNING *`,
          [profile.name.givenName, profile.emails[0].value],
        );

        const newUser = userResult.rows[0];

        await pool.query(
          `INSERT INTO auth_accounts
           (user_id, provider, provider_account_id)
           VALUES ($1, 'google', $2)`,
          [newUser.id, profile.id],
        );

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
