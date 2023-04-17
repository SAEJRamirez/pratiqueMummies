
export function KeyboardListener(keys, player) {
    //Ecoute des touches pressées par l'utilisateur
    addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'a':
                keys.a.pressed = true
                break
            case 'd':
                keys.d.pressed = true
                break
            case 'w':
                if (!player.jump) {
                    player.jump = true
                    player.velocity.y -= 16.5
                }
                break
        }
    })

//Ecoute des touches relâchées par l'utilisateur
    addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'a':
                keys.a.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
        }
    })
}
