const router = require("express").Router();
const { Persona } = require("../../db");
const { createToken } = require("../../helpers/generar-jwt");

const sgMail = require("../../services/sendgrid");

router.post("/register", async (req, res = request) => {
  const auth = await Persona.create(req.body);
  const { correoElectronico } = req.body;
  const msg = {
    to: correoElectronico,
    from: "cristian.daniel.herrera@hotmail.com",
    subject: "Hola estas autenticado en Alkemy",
    text: "Hola estas autenticado en Alkemy",
    html: `   <div style="width: 600px; height: 200px; background-color: beige; margin: auto; display: flex; justify-content: center; flex-direction: column; align-items: center;">
            
        <div style="display: flex; justify-content: center;">
            <div style="color: green;"><h1>Challenge Node Alkemy</h1></div>
        </div>
        <div style="display: flex; justify-content: center;">
            <h2>by Cristian Daniel Herrera</h2>
        </div>
        <div style="display: flex; justify-content: center;">
            <div><a href="https://www.linkedin.com/in/cristian-daniel-herrera-7a2794a9/" style="text-decoration: none;"> My Linkedin </a></div>

        </div>
        
    `,
  };
  try {
    sgMail.send(msg);
  } catch (err) {
    return res.status(err.code).send(err.message);
  }

  res.send("usuario creado");
});

router.post("/login", async (req, res) => {
  const user = await Persona.findOne({
    where: { correoElectronico: req.body.correoElectronico },
  });
  const password = await Persona.findOne({
    where: { contrasenia: req.body.contrasenia },
  });

  if (!user) {
    return res.status(400).json({
      msg: "usuario/contraseña incorrecto ",
    });
  }
  if (!password) {
    return res.status(400).json({
      msg: "usuario/contraseña incorrecto ",
    });
  }

  res.json({
    token: createToken(user),
  });
});

module.exports = router;
