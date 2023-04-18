import {ctx} from "../index.js";

export class Sprite {
    constructor({position, imgSrc}) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.width = this.image.width
            this.height = this.image.height
        }
        this.image.src = imgSrc
    }

    draw() {
        if (!this.image) return
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}