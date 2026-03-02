"use strict"

async function chamadaApiConversao (base, num) {
    const res = await fetch("https://api-conversor-7j7e.onrender.com/converter", {
        method: "POST",
        headers: ({ "Content-Type": "application/json" }),
        body: JSON.stringify({ base, num })
    });

    const data = await res.json();
    if(data.success) {
        return data;
    } 
}

const decimalInput = document.querySelector('.input-decimal');
const octalInput = document.querySelector('.input-octal');
const hexadecimalInput = document.querySelector('.input-hexadecimal');
const binarioInput = document.querySelector('.input-binario');
const confirmarBtn = document.querySelector('.confirmar-btn');

let num = " ";
let base = " ";
let controladorTempo;

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("input", (e) => {
        clearTimeout(controladorTempo);
        controladorTempo = setTimeout(async () => {
            num = e.target.value.trim();
            if(num === ""){
                decimalInput.value = "";
                octalInput.value = "";
                hexadecimalInput.value = "";
                binarioInput.value = "";
                num = "";
                return;
            }

            let ultimoChar = " ";
            base = e.target.dataset.base;

            switch (base) {
                case 'decimal':
                    for(let j = 0; j < num.length; j++) {
                        ultimoChar = num[j];
                        if(ultimoChar < '0' || ultimoChar > '9' || num.length > 10) {
                            num = num.slice(0, j) + num.slice(j + 1);
                            decimalInput.style.backgroundColor = '#da0101e1';
                            setTimeout(() => {
                                decimalInput.style.backgroundColor = 'white'; 
                            }, 200);
                            j--;
                        } 
                        decimalInput.value = num;
                        octalInput.value = num;
                        hexadecimalInput.value = num;
                        binarioInput.value = num;
                    }
                    break;

                case 'octal':

                    for(let j = 0; j < num.length; j++) {
                        ultimoChar = num[j];
                        if(ultimoChar < '0' || ultimoChar > '7' || num.length > 10) {
                            num = num.slice(0, j) + num.slice(j + 1);
                            octalInput.style.backgroundColor = '#da0101e1';
                            setTimeout(() => {
                                octalInput.style.backgroundColor = 'white'; 
                            }, 200);
                            j--;
                        } 
                        decimalInput.value = num;
                        octalInput.value = num;
                        hexadecimalInput.value = num;
                        binarioInput.value = num;
                    }
                    break;

                case 'hexadecimal':

                    for(let j = 0; j < num.length; j++) {
                        ultimoChar = num[j];
                        if(!((ultimoChar >= '0' && ultimoChar <= '9') ||
                            (ultimoChar >= 'A' && ultimoChar <= 'F') ||
                            (ultimoChar >= 'a' && ultimoChar <= 'f')) || num.length > 8) {
                            num = num.slice(0, j) + num.slice(j + 1);
                            hexadecimalInput.style.backgroundColor = '#da0101e1';
                            setTimeout(() => {
                                hexadecimalInput.style.backgroundColor = 'white'; 
                            }, 200);
                            j--;
                        } 
                        decimalInput.value = num;
                        octalInput.value = num;
                        hexadecimalInput.value = num;
                        binarioInput.value = num;
                    }
                    break;

                case 'binario':

                    for(let j = 0; j < num.length; j++) {
                        ultimoChar = num[j];
                        if(ultimoChar != '0' && ultimoChar != '1' || num.length > 32) {
                            num = num.slice(0, j) + num.slice(j + 1);
                            binarioInput.style.backgroundColor = '#ff0000e1';
                            setTimeout(() => {
                                binarioInput.style.backgroundColor = 'white'; 
                            }, 100);
                            j--;
                        } 
                        decimalInput.value = num;
                        octalInput.value = num;
                        hexadecimalInput.value = num;
                        binarioInput.value = num;
                    }
                    break;

                default:
                    break;
            }

            const data = await chamadaApiConversao(base, num);
            const c = data.resultado.map(item => item.split(":")[1].trim());

            if(base === 'binario') {
                decimalInput.value = c[1];
                octalInput.value = c[2];
                hexadecimalInput.value = c[3];
            } else if(base === 'decimal') {
                binarioInput.value = c[0];
                octalInput.value = c[2];
                hexadecimalInput.value = c[3];
            } else if(base === 'octal') {
                binarioInput.value = c[0];
                decimalInput.value = c[1];
                hexadecimalInput.value = c[3];
            } else if(base === 'hexadecimal') {
                binarioInput.value = c[0];
                decimalInput.value = c[1];
                octalInput.value = c[2];
            }
        }, 500);
    });
});
