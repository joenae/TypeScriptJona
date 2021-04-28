// inspiriert durch https://www.w3schools.com/graphics/game_sound.asp

export class sound {
    sound:HTMLAudioElement;
    play: () => void;
    stop: () => void;
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

        this.stop = function () {
            this.sound.pause();
        };
    }
}

//Sound
export const hitSound = new sound('./src/sounds/hitSound.wav');
export const scoreSound = new sound('./src/sounds/scoreSound.wav');
export const wallHitSound = new sound('./src/sounds/wallHitSound.wav');