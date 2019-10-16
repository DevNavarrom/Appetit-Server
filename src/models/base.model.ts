import MySql from '../data/MySql';
import { TABLA_USUARIOS, ID, NOMBRES, APELLIDOS, ROL, PASS, USUARIO } from '../utils/constantes';
const bcrypt = require('bcrypt');


export class BaseModel {

    public static async login(cedula: number, pass: string) {
        let resp = await MySql.getInstancia().query(
            `SELECT ${ID}, ${PASS}, ${NOMBRES}, ${APELLIDOS}, ${ROL}, ${USUARIO}
                    FROM ${TABLA_USUARIOS}
                    WHERE ${ID} = ?;`,
            [ cedula.toString() ]
        );

        if( resp.length > 0 ) {
            let usuario = resp[0];

            // Comparamos el hash de la contraseña
            if( bcrypt.compareSync( pass, usuario.pass ) ) {
                // Quitamos la contraseña de la respuesta para no mostrarla 
                usuario.pass = undefined; 
    
                return {
                    "okay": true,
                    "respuesta": {
                        "usuario": usuario
                    }
                };

            } else {
                return {
                    "okay": false,
                    "respuesta": "Credenciales incorrectas"
                };
            }
            
        } else {

            return {
                "okay": false,
                "respuesta": "Usuario no existe"
            };
        }
    }

}
