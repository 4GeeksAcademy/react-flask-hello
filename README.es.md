D – M – P – C

D – Discipline La base de todo cambio. Sin disciplina, no hay resultados.
M – Muscles Si queréis un enfoque más físico.
P – Progress Mejora constante. Cada día cuenta, cada repetición suma.
C – Consistency El secreto real del éxito: constancia día tras día.



Aplicacin web desarrollada con **React.js** en el front end y **Flask** en el back end, diseñada para
ayudar a los usuarios a alcanzar sus objetivos de salud mediante un plan personalizado de nutricin
y entrenamiento.

Descripcin del Proyecto
D – M – P – C es una plataforma web que ofrece planes de nutricion, rutinas de entrenamiento,
seguimiento de progreso y contenido educativo para quienes desean mejorar su estilo de vida de
manera integral. Cuenta con:
- Registro e inicio de sesion de usuarios.
- Perfil personalizado con IMC, objetivos y progreso.
- Sugerencias de ejercicios diarios basados en requerimientos calricos.
- Rutinas de ejercicios divididas por niveles y objetivos (ganancia muscular, prdida de grasa, etc.).
- Blog con artculos y consejos sobre salud, entrenamiento y alimentacin.
- 
Tecnologas utilizadas
Front-End
- Html
- Css
- React.js
- Bootstrap
- Context API
  
Back-End
- Python
- Flask
- SQLAlchemy
- JWT
  
Base de Datos
- SqlAlchemy
  
Herramientas DevOps
- Pipenv
- .env para configuracin
- Render para despliegue
Instalacin del proyecto
Backend
1. Clona el repositorio:
 git clone https://github.com/tu-usuario/fitlife-app.git
 cd fitlife-app
2. Instala dependencias de Python:
 pipenv install
3. Copia el archivo de configuracin:
 cp .env.example .env
4. Configura la variable `DATABASE_URL` en `.env`:
 DATABASE_URL=postgres://username:password@localhost:5432/fitlife_db
5. Realiza y aplica migraciones:
 pipenv run migrate
 pipenv run upgrade
6. Inicia el servidor Flask:
 pipenv run start
Frontend
1. Entra en la carpeta `frontend`:
 cd frontend
2. Instala dependencias:
 npm install
3. Ejecuta el servidor de desarrollo:
 npm run start
Poblacin de datos de prueba
Puedes insertar usuarios y datos de ejemplo con el siguiente comando:
pipenv run insert-test-users
Despliegue
Este proyecto est listo para desplegarse en [Render.com](https://render.com). Consulta la
[documentacin de despliegue de
4Geeks](https://4geeks.com/es/docs/start/despliega-con-render-com) para ms detalles.
Estructura del Proyecto
/fitlife-app
 /frontend # Aplicacin React
 /src
 /api
 /routes # Endpoints Flask
 /models # Modelos SQLAlchemy
 /utils # Funciones de utilidad
 .env # Variables de entorno
 commands.py # Poblacin de datos
 README.md
Autores
- David Vivar 
              . Linkedin = https://www.linkedin.com/in/david-vivar-martinez-3b2470156/
              . GitHub = https://github.com/DaivdVivar
- Maria Fernanda Galvis
              . Linkedin =
              . GitHub =
- Pere Pau carrasco
              . Linkedin =
              . GitHub =
- Cristian Cerezo
              . Linkedin =
              . GitHub =
