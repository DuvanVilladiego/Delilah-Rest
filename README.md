# Delilah-Rest

**Instrucciones De Instalacion**  

*Paso #1* | _Instalar Programas Necesarios_ |  

_Seguir los pasos de instalacion de cada programa en su web_  

- [Mariadb](https://mariadb.org/download/) 
    _Al momento de instalar mariadb le dará la opción de asignar una clave para este proyecto utilizamos "1234" (sin las comillas), esta clave sera el usuario "root" (sin las comillas), que le permitirá ver todas las base de datos que tiene en su equipo... Recuerde que es algo de uso propio, así que puede colocar la que guste... Tendra que recordarla, ya que se utilizara en este proyecto_
- [NodeJs](https://nodejs.org/es/download/)
- [Postman](https://www.postman.com/downloads/)
- [Postman test](https://drive.google.com/file/d/1Mo5_FqQfGGZ3a5QTMNkl7uBbj2rPR_4a/view?usp=sharing)
- [Git](https://git-scm.com/downloads)

***
*Paso #2* | _Descargando el proyecto y sus dependencias_ |  

_Ubicandose en el escritorio presione click derecho y seleccionar Git Bash Here, luego copie y pegue las siguientes lineas en la terminal que se abrio presionado enter por cada una, espere a que el proceso termine y vaya por la siguiente en el  orden que aqui aparece_  

`git clone https://github.com/DuvanVilladiego/Delilah-Rest.git`  

`cd Delilah-Rest/`  

`npm i`  

***

*Paso #3* | _Configurando Mariadb y Base de datos_ |  

_Cuando este en dbeaver le da click en el icono de nueva conexion, le da al motor de mariadb, luego siguiente... Le va a aparecer un formulario, donde tiene que colocar en nombre de usuario "root" (sin las comillas) y en contraseña "1234" (sin las comillas), en la parte donde dice Puerto debes colocar "3200" (sin las comillas).
Luego,  le da click derecho en databases y crea una nueva base de datos con el nombre de "delilah_resto"... Una vez creada le da click derecho a esta misma y en el apartado de herramientas le presiona a la opción de restore database, en la ventana emergente seleccione el archivo llamado "{Inserte nombre del archivo del dump}"_

***  

*Paso #4* | _Iniciando el servidor de MariaDB_ |  

_Una vez instalado todo solo debe abrir el cliente de MariaDB: MySQL Client (MariaDB) , puede buscarlo en su barra de busqueda del menu inicio desde windows, escribe la  contraseña que se uso durante la intalacion de MariaDB (1234) cuando se habra la consola del cliente_  

***
*Paso #5* | _Lanzando la Api_ |  

_Dentro de la consola de GitBash debera escribir el siguiente codigo_  

`node index.js`  

_Esto pondra la Api en marcha_  

***  

*Paso #6* | _Importando endpoints para Postman_ |  

_Dentro de Postman debera dar clik en el boton de importar y arrastrar el archivo "Delillah Resto.postman_collection.json" hasta la postman, luego dar click en importar y listo, esto trae todos los enpoints disponibles en el Api junto con datos ya preparados para probar_