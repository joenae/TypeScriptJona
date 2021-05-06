export class sound {
    sound:HTMLAudioElement;
    play: () => void;
    constructor(src:any) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
    }
}

//Sound
export const hitSound = new sound('./src/sounds/TrefferSound.wav');
export const scoreSound = new sound('./src/sounds/TorSound.wav');
export const wallHitSound = new sound('./src/sounds/WandSound.wav');