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
    res.redirect('/home');
});

export default router;