import express from 'express';
import passport from 'passport';
const router = express.Router();


// @DESC Auth with google
// @CALL /auth/google
router.get('/google', passport.authenticate('google', { scope : ['profile'] }));

// @DESC Auth callback with google
// @CALL /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
}), (req, res) => {
    var user = req.user;
    res.redirect('/profile/'+user._id);
});

// @DESC   Logout User
// @route /auth/logout

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

export default router;