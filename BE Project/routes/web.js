const express = require('express');
const router = express.Router();


const auth = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');





router.get('/', auth.getLogin);





router.post('/manager-login', auth.postManagerLogin);
router.get('/manager-signup', auth.getManagerSignup);
router.post('/manager-signup', auth.postManagerSignup)
//console.log(req));
router.post('/manager-logout', auth.postManagerLogout);
router.get('/manager-userProfile', auth.getManagerUserProfile);
router.post('/manager-userProfile',auth.postManagerUserProfile);
router.get('/manager-reset', auth.getManagerReset);
router.get('/manager-newPassword/:token', auth.getManagerNewPassword);
router.post('/manager-newPassword',auth.postManagerNewPassword);
router.post('/manager-reset', auth.postManagerReset);






                             //DEVELOPER-ROUTES
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