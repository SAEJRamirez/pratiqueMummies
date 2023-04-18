//Imports
import {bgMap, canvas, ctx, gravity} from "../index.js";
import {floorCollisionBlocks} from "../Tools/CreateFloorCollisionBlock.js";
import {collisionDetection, platformCollision} from "../Tools/CollisionDetection.js";
import {platformCollisionBlocks} from "../Tools/CreatePlatformCollisionBlocks.js";
import {Sprite} from "./Sprite.js";

//Classe joueur: Représente le personneage jouable par les utilisateurs
export class Player extends Sprite{
    //Propriétés qui permettent de construire le joueur lors de son instanciation
    constructor({position, imgSrc}) {
        super({imgSrc})

        //Détermine la position du joueur dans le jeu lors de sa création (axe X et Y)
        this.position = position
        //Détermine la vélocité du joueur sur l'axe X et Y
        this.velocity = {
            x: 0,
            y: 1
        }

        //Détermine la taille du joueur en largeur et hauteur
        this.width = 50
        this.height = 50

        //Booléen utilisé pour empêcher le saut multiple
        this.jump = false

        //Caméra qui suit le joueur
        this.camera = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 0,
            height: 0
        }
    }

    //Méthode pour détecter les collisions entre le joueur
    //et le sol de manière verticale
    checkForVerticalCollision() {
        for (let i = 0; i < floorCollisionBlocks.length; i++) {
            const collision = floorCollisionBlocks[i]

            if(collisionDetection(this, collision)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.jump = false
                    this.position.y = collision.position.y - this.height - 0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collision.position.y + collision.height + 0.01
                    break
                }
            }
        }
    }

    //Méthode pour détecter les collisions entre le joueur
    //et le sol de manière horizontale
    checkForHorizontalCollision() {
        for (let i = 0; i < floorCollisionBlocks.length; i++) {
            const collision = floorCollisionBlocks[i]

            if(collisionDetection(this, collision)) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    this.position.x = collision.position.x - this.width - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = collision.position.x + collision.width + 0.01
                    break
                }
            }
        }
    }

    //Méthode pour détecter les collisions entre le joueur et les plateformes
    checkForPlatformCollision() {
        for (let i = 0; i < platformCollisionBlocks.length; i++) {
            const collision = platformCollisionBlocks[i]
            if (platformCollision(this, collision)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.jump = false
                    this.position.y = collision.position.y - this.height - 0.01
                    break
                }
            }
        }
    }

    updateCameraBox() {
        this.camera = {
            position: {
                x: this.position.x - 475,
                y: this.position.y
            },
            width: 1000,
            height: 180
        }
    }

    //Méthode pour faire défiler la map et le bg vers la gauche selon les mouvements du joueur
    cameraMoveToLeft({camera}) {
        const cameraBoxRightSide = this.camera.position.x + this.camera.width

        if (cameraBoxRightSide >= 12800) return

        if (cameraBoxRightSide >= canvas.width + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
            bgMap.position.x += 0.8
        }
    }

    //Méthode pour faire défiler la map et le bg vers la droite selon les mouvements du joueur
    cameraMoveToRight({camera}) {
        if (this.camera.position.x <= 0) return

        if (this.camera.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
            bgMap.position.x -= 0.8
        }
    }

    //Empêche le joueur de tomber lorsqu'il est au bord du monde
    checkForWorldBorder() {
        if (this.position.x + this.width + this.velocity.x >= 12800
            || this.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0
        }
    }

    //Méthode pour appliquer la gravité
    applyGravity() {
        //Applique la gravité au joueur s'il ne touche pas le bas du canvas
        //sinon le joueur est à la position la plus basse du canvas
        this.velocity.y += gravity;
        this.position.y += this.velocity.y
    }

    //Permet de mettre à jour le joueur (position, vélocité, etc) dans une
    //boucle
    update() {

        ctx.fillStyle = "rgba(0, 255, 0, 0.5)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        //Dessine le joueur une fois les modifications faites
        this.draw()

        this.updateCameraBox()
        //Modifie la position du joueur sur l'axe Y et X
        this.position.x += this.velocity.x
        this.checkForHorizontalCollision()
        this.applyGravity()
        this.checkForVerticalCollision()
        this.checkForPlatformCollision()
    }
}