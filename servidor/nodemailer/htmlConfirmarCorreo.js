require("dotenv").config();

const htmlConfirmarCorreo = (hash) => `<html lang="es-ES">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
  </head>
  <body>
    <style>
      header {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid #225a8f;
      }
      h1 {
        font-family: "Press Start 2P", cursive;
        color: #4987c2;
      }
      main {
        margin-top: 25px;
        margin-bottom: 25px;
        display: flex;
        justify-content: space-evenly;
      }
      p {
        font-size: 20px;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      button {
        background-color: #4987c2;
        padding: 15px;
        border: 0;
        border-radius: 5px;
        cursor: pointer;
      }
      button a{
        color: aliceblue;
        font-size: 15px;
        text-decoration: none;
      }
      aside {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      footer {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <header>
      <h1>CodeCat Productions</h1>
    </header>
    <main>
      <p>
        Por favor, haz click en el siguiente link para confirmar tu dirección de
        email:
      </p>
      <button type="button">
        <a href="${process.env.URL_API}usuarios/confirmar-email/${hash}">Confirmar email</a>
        </button>
    </main>
    <aside>
      <p>
        ¡Con CodeCat podrás convertirte en un gran programador, disfruta del
        juego!
      </p>
    </aside>
    <footer>CodeCat &copy;</footer>
  </body>
</html>`;

module.exports = htmlConfirmarCorreo;
