import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import User from '../model/user.js';



function pass (passport) {
    passport.use(new GoogleStrategy({
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayname: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
        };

        try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            };
            console.log(user._id);
            
        } catch (error) {
            console.error('ll', error);
        }
    })); 

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}

function sample () {
    return "this is sample testing..."
};



// export
export {
    pass,
    sample,
};