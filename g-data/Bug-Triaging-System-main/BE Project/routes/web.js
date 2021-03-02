const express = require('express');
const router = express.Router();


const auth = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');





router.get('/', auth.getLogin);



router.post('/developer-login', auth.postDeveloperLogin);
router.get('/developer-signup', auth.getDeveloperSignup);
router.post('/developer-signup', auth.postDeveloperSignup)
//console.log(req));
router.post('/developer-logout', auth.postDeveloperLogout);
router.get('/developer-userProfile', auth.getDeveloperUserProfile);
router.post('/developer-userProfile',auth.postDeveloperUserProfile);
router.get('/developer-reset', auth.getDeveloperReset);
router.get('/developer-newPassword/:token', auth.getDeveloperNewPassword);
router.post('/developer-newPassword',auth.postDeveloperNewPassword);
router.post('/developer-reset', auth.postDeveloperReset);









// // //                              TESTER-ROUTES
router.post('/tester-login', auth.postTesterLogin);
router.get('/tester-signup', auth.getTesterSignup);
router.post('/tester-signup',auth.postTesterSignup);
router.post('/tester-logout',auth.postTesterLogout);
router.get('/tester-userProfile', auth.getTesterUserProfile);
router.post('/tester-userProfile', auth.postTesterUserProfile);
router.get('/tester-reset', auth.getTesterReset);
router.get('/tester-newPassword/:token', auth.getTesterNewPassword);
router.post('/tester-newPassword',auth.postTesterNewPassword);
router.post('/tester-reset', auth.postTesterReset);

module.exports = router;