const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
    }, 
    async function(accessToken, refreshToken, profile, done) {
        try {
            // Busca por usuario jka cadastrado
            const user = await prisma.user.upsert({
                where: {
                    email: profile.emails[0].value
                },
                update: {
                    name: profile.displayName,
                    picture: profile.photos[0]?.value
                },
                create: {
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    picture: profile.photos[0].value
                }
            })

            return done(null, user)
            
        } catch (error) {
            return done(error, null)
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
 done(null, obj)
})