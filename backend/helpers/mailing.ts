import nodemailer from 'nodemailer';

interface IDatos {
    email: string,
    nombre: string,
    token: string 
}

export const emailRegistroUsuario = (datos:IDatos)=>{
console.log('DATOS: ',datos);

}