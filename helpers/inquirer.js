import inquirer from 'inquirer';
 
import colors from 'colors';
 
const menuOpts = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Seleccione una opción',
    choices: [
        {
            value: 1,
            name: `${'1.'.cyan} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.cyan} Historial`
        },
        {
            value: 0,
            name: `${'0.'.cyan} Salir de la aplicación`
        }
    ],
  },
];
 
const inquirerMenu = async () => {
  console.clear();
  console.log('==========================='.green);
  console.log('   Seleccione una opción'.cyan);
  console.log('===========================\n'.green);
 
  const {opcion} = await inquirer.prompt(menuOpts);
 
  return opcion;
};

const pausa = async () =>{
    const menuPausa = [{
        type: 'input',
        name: 'pausa',
        message: `\nPrecione ${'ENTER'.cyan} para continuar\n`,
    }]
    await inquirer.prompt(menuPausa);;
}

const leerInput = async(message) =>{
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value .length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) =>{
    const choices = tareas.map( (tarea, i) =>{
        const indice = `${i + 1}.`.cyan;
        return {
            value: tarea.id,
            name: `${indice} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.cyan + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async(tareas = []) =>{
    const choices = tareas.map( (tarea, i) =>{
        const indice = `${i + 1}.`.cyan;
        return {
            value: tarea.id,
            name: `${indice} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}
 
export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist };
