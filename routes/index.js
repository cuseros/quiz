var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz de Carlos', errors: []});
});


/* Rutas de sesiones */
// obtener el formulario a rellenar para hacer login. 
router.get('/login',  sessionController.new); 
// enviar formulario para crear la sesión.       
router.post('/login', sessionController.create); 
// destruir la sesión actual.      
router.get('/logout', sessionController.destroy);        




// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId, es decir, ejecuta load si existe quizId

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new',  commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',     commentController.create);

router.get('/author', quizController.author);

module.exports = router;
