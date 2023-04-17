import {ctx} from "../index.js";

//Classes background : Représente la carte et le background du jeu
export class Background {
    //Propriétés qui permettent de construire la carte et le background de leur instanciation
    constructor({position, imgSrc}) {
        //Détermine la position de l'élément dans le canvas
        this.position = position
        //Utilisée pour définir si l'image est chargée
        this.loaded = false
        //Création de l'élément HTML <img>
        this.image = new Image()
        //Attribution de la taille de l'image lors de sa création
        this.image.onload = () => {
            this.width = this.image.width
            this.height = this.image.height
            this.loaded = true
        }
        //Attribution de la source de l'image
        this.image.src = imgSrc
    }

    //Méthode pour dessiner une image dans canvas
    //Vérifie si l'image existe avant de la dessiner
    draw() {
        if (!this.image) return
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.draw()
    }


}