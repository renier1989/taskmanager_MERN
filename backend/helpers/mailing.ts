import nodemailer from "nodemailer";

interface IDatos {
  email: string;
  nombre: string;
  token: string;
}

export const emailRegistroUsuario = async (datos: IDatos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6a660c8afe3f99",
      pass: "5f21ae7d87aa8e",
    },
  });

//   informacion para envio del correo
const info = await transport.sendMail({
    from : '"Task_manager_MERN - Administracion de proyectos - <cuentas@taskmanager.com>"',
    to: email,
    subject: 'Comprueba tu cuenta de Taskmanager',
    html: `
    <p>Hola, ${nombre}, comprueba tu cuenta de Taskmanager.</p>
    <p>Ya casi podras empezar a administras tu proyecto y colaborar con una gran comididad:</p>
    <p>Ingresa es este link :<a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuentas</a></p>
    <p>Att. Taskmanager team.</p>
    `
})

};
