export function collisionDetection(objA, objB) { //objA = Player
    if (
        objA.position.y + objA.height >= objB.position.y &&
        objA.position.y <= objB.position.y + objB.height &&
        objA.position.x <= objB.position.x + objB.width &&
        objA.position.x + objA.width >= objB.position.x
    ) {
        return true
    }
}