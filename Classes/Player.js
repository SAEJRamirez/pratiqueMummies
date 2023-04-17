//Imports
import {ctx, gravity} from "../index.js";
import {floorCollisionBlocks} from "../Tools/CreateFloorCollisionBlock.js";
import {collisionDetection} from "../Tools/CollisionDetection.js";

//Classe joueur: Représente le personneage jouable par les utilisateurs
export class Player {
    //Propriétés qui permettent de construire le joueur lors de son instanciation
    constructor() {

        //Détermine la position du joueur dans le jeu lors de sa création (axe X et Y)
        this.position = {
            x: 100,
            y: 100
        }
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
            width: 400,
            height: 180
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

    //Méthode pour appliquer la gravité
    applyGravity() {
        //Applique la gravité au joueur s'il ne touche pas le bas du canvas
        //sinon le joueur est à la position la plus basse du canvas
        this.velocity.y += gravity;
        this.position.y += this.velocity.y
    }

    //Dessiner le personnage sur le canvas en lui passant
    //sa position sur l'axe X et Y et sa taille
    draw() {
        ctx.fillStyle = "green"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    //Permet de mettre à jour le joueur (position, vélocité, etc) dans une
    //boucle
    update() {
        //Dessine le joueur une fois les modifications faites
        this.draw()

        this.updateCameraBox()
        ctx.fillStyle = "rgba(9, 73, 129, 0.7)"
        ctx.fillRect(this.camera.position.x, this.camera.position.y, this.camera.width, this.camera.height)

        //Modifie la position du joueur sur l'axe Y et X
        this.position.x += this.velocity.x
        this.checkForHorizontalCollision()
        this.applyGravity()
        this.checkForVerticalCollision()
    }

}