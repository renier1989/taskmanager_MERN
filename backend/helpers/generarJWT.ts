import jwt from "jsonwebtoken";

const jwtenv = process.env.JWT_SECRET;
console.log(jwtenv);

const generarJWT = (id: string): string => {
  return jwt.sign({ id }, (jwtenv as string), {
    expiresIn: "30d",
  });

};

export default generarJWT;
