import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
//import express from 'express'
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async() =>{
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
          case 1:
            //Desplegamos la pregunta: Que lugar esta buscando?
            const lugar = await leerInput('Ingrese la ciudad que busca: ');
            await busquedas.ciudad(lugar);

            //Desplegamos todos los lugares que concuerden con la respuesta

            //El usuario debe seleccionar el lugar que buscaba

            //Obtener datos del clima de la ciudad

            //Mostrar los datos del clima en consola
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Ciudad: ',);
            console.log('Latitud: ',);
            console.log('Longitud: ',);
            console.log('Temperatura: ',);
            console.log('Temp. Minima: ',);
            console.log('Temp. Maxima: ',);

          break;
    
          case 2:
            //Historial de ciudades buscadas
            console.log('Historial');
          break;  
    
          case 0:
            //Salir de aplicacion
            console.log('Nos vemos luego!!'.rainbow);
          break;
        }
        
        if (opt !== 0) {
            await pausa();
        }
        
      } while (opt !== 0);

}

main();