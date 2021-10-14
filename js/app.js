"use strict";
/**
    parseInt()
    Math.floor()
    Math.random()
    try...catch
    fetch
    async / wait
    slice method
    map method
    join method
    event.preventDefault()
    load / submit events
 */

const url = "https://raw.githubusercontent.com/webferrol/json/master/experiencia-laboral.json";
let data = null; //Variable donde guardaremos los datos json
//Nodos del DOM
const dataText = document.querySelector("#paragraph-number");
const loader = document.querySelector("#loader");
const info = document.querySelector(".info");
const parragraphContainer = document.querySelector(".paragraphs-container");

/**
 * Función que obtiene un json de una url pasada
 * @returns Object Retorna un fichero json con los datos para escribir los párrafos
 */
const getData = async () => {
    try {
        let response = await fetch(url);
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.error(`Error catch en función getData: ${error}`);
    }
}

/**
 * Generador de un número aleatorio
 * @param {Number} tam Tamaño máximo -1 del número aleatorio a generar
 * @returns Número entre 0 y tam-1
 */
const getRandom = tam => Math.floor(Math.random() * tam);

/**
 * Función que retorna un nuevo array recortado a partir de unos índices dados
 * @param {Array} array Copia del Array original 
 * @returns {Array} Array recortado a partir de unos índices dados Array.prototype.slice()
 */
const loremGenerate = (array) => {
    const num = parseInt(dataText.value);
    const random = getRandom(array.length);
    return array.slice(0, num);
}

/**
 * Al cargar la página obtenemos los datos del json
 */
window.addEventListener(
    "load",
    async () => {
        try {
            data = await getData();
            if (data) {
                loader.classList.add('display-none');
                dataText.setAttribute("max", data.experiencias.length);
                info.textContent = `Entre 1 y ${data.experiencias.length}`;
            }
        } catch (error) {
            console.error(`Error catch en window.addEventeListester: ${error}`);
        }
    }
);

/**
 * Cada vez que enviamos el formulario generamos los párrafos
 */
document.querySelector("#my-form")
    .addEventListener(
        "submit",
        e => {
            e.preventDefault();
            let dataArray = loremGenerate(data.experiencias).map(element => {
                console.log(element)
                return `<p>${element.titulo}</p>`;
            });
            parragraphContainer.innerHTML = dataArray.join("");
        }
    );