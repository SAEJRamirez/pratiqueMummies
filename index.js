import {Player} from "./Classes/Player.js";
import {KeyboardListener} from "./Tools/Keyboard.js";
import {Background} from "./Classes/Background.js";
import {floorCollisionBlocks} from "./Tools/CreateFloorCollisionBlock.js";
import {platformCollisionBlocks} from "./Tools/CreatePlatformCollisionBlocks.js";

//Récuperer l'élément DOM canvas
export const canvas = document.getElementById('game-canvas')
//Appliquer le contexte
export const ctx = canvas.getContext('2d')
//Gravité en jeu
export let gravity = 0.8
//Initialisation du Background
export const bgMap = new Background({
    position: {
        x: 0,
        y: 0
    },
    imgSrc : "./Images/mapBg.png"
})
//Initialisation de la map
export const map = new Background({
    position: {
        x: 0,
        y: 0
    },
    imgSrc : "./Images/mapMummies.png"
})
//Instanciation de notre classe Player
const player = new Player({
    position: {
        x: 100,
        y: 100,
    },
    imgSrc: "./Images/hero/idle/IdleAnubis.png"
})

//Objet utilisé pour réagir au événements "keydown" et "keyUp"
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}
//Méthode pour écouter les événements liés au touches
KeyboardListener(keys, player)

const camera = {
    position: {
        x: 0,
        y: 0
    }
}


//Fonction de création de boucle de jeu
function animate() {
    //Boucle du jeu (tourne indéfiniment afin de créer
    // les mouvements et les animations)
    requestAnimationFrame(animate)
    ctx.clearRect(0,0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(camera.position.x, 0)
    //Méthode pour dessiner le bg (créée dans la classe Background)
    bgMap.update()
    //Méthode pour dessiner la map (créée dans la classe Background)
    map.update()

    floorCollisionBlocks.forEach(block =>  {
        block.update()
    })

    platformCollisionBlocks.forEach(platform => {
        platform.update()
    })

    player.checkForWorldBorder()
    //Méthode pour dessiner la map (créée dans la classe Background)
    player.update()

    //Mouvement du joueur (utilise l'objet "keys" et les écoutes
    // d'événements)
    if (keys.d.pressed) {
        player.velocity.x = 8
        player.cameraMoveToLeft({camera})
    } else if (keys.a.pressed) {
        player.velocity.x = -8
        player.cameraMoveToRight({camera})
    } else {
        player.velocity.x = 0
    }

    ctx.restore()
}
animate()

