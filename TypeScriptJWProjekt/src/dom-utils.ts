export const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement; 
export const ctx = canvas.getContext('2d')!;

const splash = document.querySelector('.splash') as HTMLElement; 
const opBtn = document.getElementById('rules-btn') as HTMLElement;
const clBtn = document.getElementById('close-btn')as HTMLElement;
const gamerules = document.getElementById('rules') as HTMLElement;

export const startSpiel = document.querySelector("#startSpiel") as HTMLElement;
export const startSpiel2 = document.querySelector("#startSpielZweiSpieler") as HTMLElement;


opBtn.addEventListener('click', () => gamerules.classList.add('show'));
clBtn.addEventListener('click', () => gamerules.classList.remove('show'));

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none'); 
    }, 2000)
})


