import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
//import express from 'express'
import { inquirerMenu, pausa, leerInput, listar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async() =>{
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
          case 1:
            //Desplegamos la pregunta: Que lugar esta buscando?
            const busqueda = await leerInput('Ingrese el lugar que busca (Pais, Ciudad, Region, Comuna, etc.): '); 
            
            //Buscamos los lugares
            const lugares = await busquedas.ciudad(busqueda);

            //Desplegamos todos los lugares que concuerden con la respuesta
            const id = await listar(lugares);
            if(id === '0') continue;

            //El usuario debe seleccionar el lugar que buscaba
            const lugarSeleccionado = lugares.find(lugar => lugar.id === id);
            
            //Obtener datos del clima de la ciudad
            const clima = await busquedas.buscarClima(lugarSeleccionado.lat,lugarSeleccionado.lng);

            //Mostrar los datos del clima en consola
            console.clear();
            console.log('==========================='.green);
            console.log(' INFORMACION DE LA CIUDAD'.cyan);
            console.log('===========================\n'.green);
            console.log('Lugar: ', `${lugarSeleccionado.nombre}`.cyan);
            console.log('Latitud: ',`${lugarSeleccionado.lng} °`.cyan);
            console.log('Longitud: ',`${lugarSeleccionado.lat} °`.cyan);
            console.log('Descripcion del Clima: ',`${clima.desc}`.cyan);
            console.log('Temperatura: ',`${clima.temp} °C`.cyan);
            console.log('Temp. Minima: ',`${clima.min} °C`.cyan);
            console.log('Temp. Maxima: ',`${clima.max} °C`.cyan);
            console.log('Humedad del ambiente: ',`${clima.hum}%`.cyan);

            const date = new Date();
            const jsonLugar = {
                nombre: lugarSeleccionado.nombre,
                lat: `${lugarSeleccionado.lng} °`,
                lon: `${lugarSeleccionado.lng} °`,
                desc: clima.desc,
                temp: `${clima.temp} °C`,
                min: `${clima.min} °C`,
                max: `${clima.max} °C`,
                hum: `${clima.hum}%`,
                fecha: `${date.getDate()}`.green + '/'.gray + `${date.getMonth()}`.green + '/'.gray + `${date.getFullYear()}`.green,
                hora: `${date.getHours()}`.green + ':'.grey + `${date.getMinutes()}`.green
            }
            //Guardar en DB
            busquedas.agregarHistorial(jsonLugar);
          break;
    
          case 2:
            //Historial de ciudades buscadas
            console.clear();
            console.log('==========================='.green);
            console.log('  Historial de busquedas'.cyan);
            console.log('===========================\n'.green);
            busquedas.historial.forEach( lugar => {
                console.log('Busqueda realizada el: '.green,lugar.fecha, lugar.hora);
                console.log('Lugar: ', lugar.nombre.cyan);
                console.log('Latitud: ', lugar.lat.cyan);
                console.log('Longitud: ', lugar.lon.cyan);
                console.log('Descripcion del Clima: ', lugar.desc.cyan);
                console.log('Temperatura: ', lugar.temp.cyan);
                console.log('Temp. Minima: ', lugar.min.cyan);
                console.log('Temp. Maxima: ', lugar.max.cyan);
                console.log('Humedad del ambiente: ',lugar.hum.cyan);
            });
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