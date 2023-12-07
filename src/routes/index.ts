import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import passport from 'passport';
import session from 'express-session';
import { Strategy } from 'passport-google-oauth20'
import { events } from './eventRoutes';

const app: Express = express();

app.use(session({
    secret: process.env.CLIENT_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set this to true if you're using HTTPS
}));

passport.use(new Strategy({
    authorizationURL: process.env.AUTH_URL!,
    tokenURL: process.env.TOKEN_URL!,
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.REDIRECT_URI!,
    scope: ['email', 'profile']
  },
  (token, email, refreshToken, profile, cb) => {
    return cb(null, { token, profile, email, refreshToken });
  }));

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user); 
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/login',
  passport.authenticate('google', {
    scope: ['profile'] // Request permissions for profile and email
  }));

app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req: Request, res: Response) => {
res.redirect("/api-docs")
}
);

app.get('/logout', function(req: Request, res: Response, next: NextFunction){
req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('/');
});
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({status:"Running", message:"Welcome to the Rexy Events API!"})
})

app.use("/events", events);

app.listen(8080,() => {
    console.log(`Server is running on port ${8080}.`);
});

