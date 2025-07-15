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
            let user = await prisma.user.findUnique({
                where: {
                    googleId: profile.id
                }
            })
        
            // Se nao encontrar
            if(!user){
                user = await prisma.user.create({
                    data: {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id
                    }
                })
            }

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