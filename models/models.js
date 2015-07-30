// Definición del modelo genérico del proyecto
var path = require('path');

// Postgres y SQLite
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQlite o Postgres

// Usar BBDD SQLITE
var sequelize = new Sequelize(DB_name, user, pwd,
				{
					dialect: protocol, 
					storage: protocol,
					port: port,
					host: host,
					storage: storage,   // sólo SQLite (.env)
					omitNull: true 		// sólo Postgres
				}
);

// Importamos la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; //exportar tabla Quiz

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.bulkCreate( 
        [ {pregunta: 'Capital de Italia',   respuesta: 'Roma', tema: 'otro'},
          {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema: 'otro'}
        ]
      ).then(function(){console.log('Base de datos inicializadaaaaaaaaaaaaaaaaaaaaaaaaaaaaa tambien con temas')});
    };
  });
});