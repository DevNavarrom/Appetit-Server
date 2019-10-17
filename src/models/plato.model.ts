import { Plato } from '../utils/interfaces';
import MySql from '../data/MySql';
import { TABLA_PLATOS, TABLA_NUTRIENTES, TABLA_PLATO_NUTRIENTE, TABLA_INGREDIENTES, TABLA_PLATO_INGREDIENTE } from '../utils/constantes';
import { ID, NOMBRE, DESCRIPCION, NUM_CALORIAS, PRECIO, PRECIO_EN_PUNTOS, ID_NUTRIENTE, ID_INGREDIENTE, ID_PLATO } from '../utils/constantes';

export default class PlatoModel {

    public static insertar( plato: Plato) {
        return MySql.getInstancia().query(
            `INSERT INTO ${TABLA_PLATOS} VALUES (null, ?, ?, ?, ?, ?)`,
            [ plato.descripcion, plato.num_calorias.toString(), plato.precio.toString(), plato.precio_en_puntos.toString(), plato.nombre ]
        );
    }


    public static eliminar( id:number) {
        return MySql.getInstancia().query(
            `DELETE FROM ${TABLA_PLATOS} WHERE ${ID}=?`,
            [ id.toString() ]
        );
    }

    public static getPlatos( id?: number ) {
        if( id ) {
            return MySql.getInstancia()
                .query(
                    `SELECT * FROM ${TABLA_PLATOS}
                        WHERE ${ID} = ?`,
                        [ id.toString() ]
                );
        } else {
            return MySql.getInstancia()
                .query(
                    `SELECT * FROM ${TABLA_PLATOS}`,
                    []
                );
        }
    }

    public static getNutrientes(id_plato: number): Promise<any>{
        return MySql.getInstancia().query(
            `SELECT nut.${ID} as id_nutriente, nut.${NOMBRE} AS nutriente FROM ${TABLA_NUTRIENTES} as nut 
                    INNER JOIN ${TABLA_PLATO_NUTRIENTE} as planut ON planut.${ID_NUTRIENTE} = nut.${ID}
                    WHERE planut.${ID_PLATO} = ?`,
            [ id_plato.toString() ]
        );
    }

    public static getIngredientes(id_plato: number): Promise<any>{
        return MySql.getInstancia().query(
            `SELECT ing.${ID} as id_ingrediente, ing.${NOMBRE} AS ingrediente FROM ${TABLA_INGREDIENTES} as ing 
                    INNER JOIN ${TABLA_PLATO_INGREDIENTE} as plaing ON plaing.${ID_INGREDIENTE} = ing.${ID}
                    WHERE plaing.${ID_PLATO} = ?`,
            [ id_plato.toString() ]
        );
    }

}