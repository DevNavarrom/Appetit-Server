import rutasPlato from './routes/plato.router';
import Servidor from './server/servidor';

const servidor: Servidor = Servidor.getInstancia(4300);

servidor.agregarRutas( new Map([
    ['/platos', rutasPlato]

]));

servidor.iniciar( () => console.log(`Servidor corriendo`));
