import { Request, Response, Router } from 'express';
import PlatoModel from '../models/plato.model';

const rutas = Router();

/* [ INICIO ] RUTAS GET */
rutas.get('', (req: Request, res: Response) => {
    PlatoModel.getPlatos()
        .then( platos => {
            res.json({
                "okay": true,
                "respuesta": platos
            });
        })
        .catch( err => {
            console.log(`ERROR AL OBTENER TODOS LOS PLATOS ${ err }`);

            res.json({
                "okay": false,
                "respuesta": "Error"
            });
        });
});

let getDetallesPlato = async( id_plato: number ) => {
    let datos = await PlatoModel.getPlatos(id_plato);

    if ( datos.length > 0 ) {
        datos = datos[0];
    } else {
        datos = undefined;
    }

    const ingredientes       = await PlatoModel.getIngredientes(id_plato);
    const nutrientes        = await PlatoModel.getNutrientes(id_plato);

    return {
        datos: datos,
        ingredientes: ingredientes,
        nutrientes: nutrientes
    };
}

rutas.get('/:idPlato/detalles', (req: Request, res: Response) => {
    
    getDetallesPlato(parseInt(req.params.idPlato))
        .then( resp => {
            res.json({
                "okay": true,
                "respuesta": resp
            });
        })
        .catch( err => {
            console.log('Error detalles deportista', err);

            res.json({
                "okay": false,
                "respuesta": "Error"
            });
        });

});

export default rutas;