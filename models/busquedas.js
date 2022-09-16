import fs from 'fs';
import axios from 'axios';
class Busquedas{
    historial = [];
    dbPath = './db/database.json';
    constructor(){
        //Leer DB si existe
        this.historial = this.leerDB();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar=''){

        try {
            //peticion http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map(lugar =>({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            
        } catch (error) {
            return [];
        }
    }

    async buscarClima(lat,lon){

        try {
            //peticion http
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsOpenWeather
            });
            const resp = await intance.get();
            const {weather, main} = resp.data;
            return{
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
                hum: main.humidity
            };
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    agregarHistorial(lugar){
        //Mantener solo 3 registros del historial
        this.historial = this.historial.splice(0,2);
        //Agregamos el lugar al historial
        //Nota: El unshift para agregarlo al inicio en ves de al final
        this.historial.unshift(lugar);

        //Grabar en DB
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        };
        //console.log(payload);
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)){
            var fileContent = '{"historial":[]}'
            fs.writeFileSync(this.dbPath, fileContent, (err) => {
                if (err) throw err;
            
                console.log("The file was succesfully saved!");
            }); 
            //return null;
        }
    
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        
        const data = JSON.parse(info);
        return data.historial;
    }
}

export { Busquedas };