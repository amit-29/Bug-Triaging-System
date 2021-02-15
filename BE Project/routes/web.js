const express = require('express');
const router = express.Router();


const auth = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');



// router.get('/viewStudents', isAuth, admin.viewStudents);


router.get('/', auth.getLogin);


//----------------------------------STUDENT ROUTES-------------------------------------------------------



router.post('/tester-login', auth.postTesterLogin);
router.get('/tester-signup', auth.getTesterSignup);
router.post('/tester-signup', auth.postTesterSignup);
router.post('/tester-logout', auth.postTesterLogout);
router.get('/tester-userProfile', auth.getTesterUserProfile);
router.post('/tester-userProfile', auth.postTesterUserProfile);
router.get('/tester-reset', auth.getTesterReset);
router.get('/tester-newPassword/:token', auth.getTesterNewPassword);
router.post('/tester-newPassword',auth.postTesterNewPassword);
router.post('/tester-reset', auth.postTesterReset);
// router.get('/flot', (req, res) => {
// 	res.render('flot.hbs', {
// 		flot: true
// 	});
// });

// router.get('/morris', (req, res) => {
// 	res.render('morris.hbs', {
// 		morris: true
// 	});
// });

// router.get('/tables', (req, res) => {
// 	res.render('tables.hbs', {
// 		tables: true
// 	});
// });

// router.get('/forms', (req, res) => {
// 	res.render('forms.hbs', {
// 		morris: true
// 	});
// });

// router.get('/panels-wells', (req, res) => {
// 	res.render('forms.hbs', {
// 		morris: true
// 	});
// });

// router.get('/buttons', (req, res) => {
// 	res.render('buttons.hbs', {
// 		morris: true
// 	});
// });

// router.get('/notifications', (req, res) => {
// 	res.render('notifications.hbs', {
// 		morris: true
// 	});
// });

// router.get('/typography', (req, res) => {
// 	res.render('typography.hbs', {
// 		morris: true
// 	});
// });

// router.get('/icons', (req, res) => {
// 	res.render('icons.hbs', {
// 		morris: true
// 	});
// });

// router.get('/grid', (req, res) => {
// 	res.render('grid.hbs', {
// 		morris: true
// 	});
// });

// router.get('/blank', (req, res) => {
// 	res.render('blank.hbs', {
// 		morris: true
// 	});
// });

// router.get('/login', (req, res) => {
// 	res.render('login.hbs', {
// 		morris: true
// 	});
// });

module.exports = router;