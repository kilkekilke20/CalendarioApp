# instalar el package.json
npm init -y
# instalar el nodemon(como administrador)
npm i nodemon -g
# iniciar el nodemon npm start, en modo dev npm run dev
# instalar express
npm i express
# 
npm i dotenv
#  si el puerto 4000 esta ocupado, se pude cambiar en el .env y recargar el servicio
# pagina para el status de los servidores (https://www.restapitutorial.com/httpstatuscodes.html)
# instalar un validador, en mi caso para formularios y sesiones
npm i express-validator
# enlace de la coneccion de mongo (mongodb+srv://ADMIN:EZxK82bnUjx9DY1R@cluster0.pjgex.mongodb.net/) 
db_user: ADMIN
db_password: EZxK82bnUjx9DY1R
# para conectar node a mongo atlas use mongoose (https://mongoosejs.com/)
npm i mongoose
# usare encriptacion para las contraseñas por lo que instalare lo siguiente (https://www.npmjs.com/package/bcryptjs)
npm i bcryptjs
# instalar Json Web Token (https://jwt.io/), una vez que se genere el token de un usuario tambien se puede ver en el enlace, saldria el uid, nombre, y fecha de creacion y expiracion
npm i jsonwebtoken
# instalar cors (https://www.npmjs.com/package/cors), es una api que sirve para que una vez desplegada la pagina cualquier persona pueda hacer peticiones a la pagina (me gustaria intentar subir la pagina y que otra persona se pueda conectar, lo dejare instalado y haciendo la llamada en el index y ya, mas adelante vere si puedo hacerlo)
npm i cors