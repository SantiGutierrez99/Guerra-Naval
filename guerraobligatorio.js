
var read = require('prompt-sync')();

main();


function main() {
    var opcion = 0;
    var usuarios = [
        { "nombre": "Binary", "puntos": 0 }
    ];
    var tamanio = 10;
    var miGrilla;
    var enemigoGrilla;
    var restosDeBarcos;
    const barcos = [
        { name: 'portaviones', length: 5, symbol: 'P' },
        { name: 'acorazado', length: 4, symbol: 'A' },
        { name: 'submarino', length: 3, symbol: 'S' },
        { name: 'submarino', length: 3, symbol: 'S' },
        { name: 'destructor', length: 2, symbol: 'D' },
        { name: 'destructor', length: 2, symbol: 'D' },
        { name: 'destructor', length: 2, symbol: 'D' }
    ];

    do {
        caratula();
        console.info('\n1- JUGAR');
        console.info('2- AYUDA');
        console.info('3- RANKING');
        console.info('4- SALIR');
        opcion = parseInt(read(''));
        opcion = validarOpciones(opcion);


        if (opcion == 1) {
            console.clear();
            let salir = 0;
            while (salir != 4) {
                console.clear();
                console.log('4- Si desea volver al menu principal');
                console.log('\nPresione enter si quiere comenzar el juego...')
                salir = parseInt(read(''));
                console.clear();
                if (salir != 4) {
                    console.clear();
                    let gameOver = false;
                    let usuario = read('ingrese nombre de usuario: ');
                    while (validarUsuario(usuario, usuarios) != true) {
                        usuario = read('este usuario ya existe, ingrese otro: ');
                    }
                    nuevoUsuario(usuario, usuarios);
                    var enemigoGrilla = crearGrilla(tamanio);
                    ponerBarcosBinary(barcos, enemigoGrilla);
                    read('Tu turno!');
                    console.clear();
                    console.info('\nColoca tus barcos!');
                    var miGrilla = crearGrilla(tamanio);
                    ponerBarcos(barcos, miGrilla);

                    while (!gameOver) {
                        console.info('\nTu turno: ')
                        imprimirGrilla(enemigoGrilla, enemigoGrilla, true);
                        let letra = read(' introduce la fila que deseas atacar: ').toUpperCase();
                        let x = letra.charCodeAt(0) - 65;
                        let y = parseInt(read(' introduce la columna que deseas atacar: '));
                        y = grillaPosicion(y);
                        while (validarCoordenadas(x, y) != true) {
                            console.log(' la coordenada ingresada no existe, ingrese una correcta para disparar: ');
                            letra = read(' introduce la fila correcta para atacar: ').toUpperCase();
                            x = letra.charCodeAt(0) - 65;
                            y = parseInt(read(' introduce la columna correcta para atacar: '));
                            y = grillaPosicion(y);
                        }
                        while (enemigoGrilla[x][y] == 'X' || enemigoGrilla[x][y] == '-') {
                            console.log(' ya has tirado en esa cooordenada');

                            letra = read(' introduce la fila que deseas atacar: ').toUpperCase();
                            x = letra.charCodeAt(0) - 65;
                            y = parseInt(read(' introduce la columna que deseas atacar: '));
                            y = grillaPosicion(y);
                            while (validarCoordenadas(x, y) != true) {
                                console.log(' la coordenada ingresada no existe, ingrese una correcta para disparar: ');
                                letra = read(' introduce la fila correcta para atacar: ').toUpperCase();
                                x = letra.charCodeAt(0) - 65;
                                y = parseInt(read(' introduce la columna correcta para atacar: '));
                                y = grillaPosicion(y);
                            }
                        }
                        console.clear();
                        if (enemigoGrilla[x][y] !== ' ') {
                            while (enemigoGrilla[x][y] !== ' ') {
                                console.clear();
                                enemigoGrilla[x][y] = 'X';
                                imprimirGrilla(enemigoGrilla, enemigoGrilla, true);
                                restosDeBarcos = 0;

                                for (const barco of barcos) {
                                    restosDeBarcos += enemigoGrilla.flat().includes(barco.symbol) ? 1 : 0;
                                }
                                if (restosDeBarcos === 0) {
                                    console.clear();
                                    ganaste();
                                    puntaje(usuarios, enemigoGrilla);
                                    mostrarRanking(usuarios);
                                    gameOver = true;
                                    break;
                                }
                                read('¡Le diste a un barco enemigo!');
                                console.clear();

                                imprimirGrilla(enemigoGrilla, enemigoGrilla, true);
                                letra = read(' introduce la fila que deseas atacar: ').toUpperCase();
                                x = letra.charCodeAt(0) - 65;
                                y = parseInt(read(' introduce la columna que deseas atacar: '));
                                y = grillaPosicion(y);
                                while (validarCoordenadas(x, y) != true) {
                                    console.log(' la coordenada ingresada no existe, ingrese una correcta para disparar: ');
                                    letra = read(' introduce la fila correcta para atacar: ').toUpperCase();
                                    x = letra.charCodeAt(0) - 65;
                                    y = parseInt(read(' introduce la columna correcta para atacar: '));
                                    y = grillaPosicion(y);
                                }
                                while (enemigoGrilla[x][y] == 'X' || enemigoGrilla[x][y] == '-') {
                                    console.log(' ya has tirado en esa cooordenada');

                                    letra = read(' introduce la fila que deseas atacar: ').toUpperCase();
                                    x = letra.charCodeAt(0) - 65;
                                    y = parseInt(read(' introduce la columna que deseas atacar: '));
                                    y = grillaPosicion(y);
                                    while (validarCoordenadas(x, y) != true) {
                                        console.log(' la coordenada ingresada no existe, ingrese una correcta para disparar: ');
                                        letra = read(' introduce la fila correcta para atacar: ').toUpperCase();
                                        x = letra.charCodeAt(0) - 65;
                                        y = parseInt(read(' introduce la columna correcta para atacar: '));
                                        y = grillaPosicion(y);
                                    }
                                }
                            }
                            if (enemigoGrilla[x][y] == ' ') {
                                console.clear();
                                enemigoGrilla[x][y] = '-';
                                imprimirGrilla(enemigoGrilla, enemigoGrilla, true);
                                read('¡Fallaste!');
                                console.clear();
                            }
                        } else {
                            enemigoGrilla[x][y] = '-';
                            imprimirGrilla(enemigoGrilla, enemigoGrilla, true);
                            read('¡Fallaste!');
                            console.clear();

                        }

                        if (!gameOver) {
                            console.info('\nTurno de Binary:');
                            restosDeBarcos = 0;

                            for (const barco of barcos) {
                                restosDeBarcos += miGrilla.flat().includes(barco.symbol) ? 1 : 0;
                            }
                            if (restosDeBarcos === 0) {
                                console.clear();
                                perdiste();
                                binaryPuntos(usuarios, miGrilla);
                                mostrarRanking(usuarios);
                                gameOver = true;
                                break;
                            }
                            let xb = numeroRandom(0, 9);
                            let yb = numeroRandom(0, 9);
                            while (miGrilla[xb][yb] == 'X' || miGrilla[xb][yb] == '-') {
                                xb = numeroRandom(0, 9);
                                yb = numeroRandom(0, 9);
                            }
                            if (miGrilla[xb][yb] !== ' ') {
                                miGrilla[xb][yb] = 'X';
                                while (miGrilla[xb][yb] !== ' ') {
                                    imprimirGrilla(miGrilla);
                                    restosDeBarcos = 0;

                                    for (const barco of barcos) {
                                        restosDeBarcos += miGrilla.flat().includes(barco.symbol) ? 1 : 0;
                                    }
                                    if (restosDeBarcos === 0) {
                                        console.clear();
                                        perdiste();
                                        binaryPuntos(usuarios, miGrilla);
                                        mostrarRanking(usuarios);
                                        gameOver = true;
                                        break;
                                    }
                                    read('¡Binary te ha atacado, lo hara de nuevo!');
                                    console.clear();
                                    if (validarEspacio(miGrilla, xb, yb) == true) {
                                        while (miGrilla[xb][yb] == 'X' || miGrilla[xb][yb] == '-') {
                                            xb = numeroRandom(xb - 1, xb + 1);
                                            yb = numeroRandom(yb - 1, yb + 1);
                                            while (validarCoordenadas(xb, yb) != true) {
                                                xb = numeroRandom(xb - 1, xb + 1);
                                                yb = numeroRandom(yb - 1, yb + 1);
                                            }
                                        }
                                        if (miGrilla[xb][yb] !== ' ') {
                                            miGrilla[xb][yb] = 'X';
                                        }
                                    } else {
                                        xb = numeroRandom(0, 9);
                                        yb = numeroRandom(0, 9);
                                        while (miGrilla[xb][yb] == 'X' || miGrilla[xb][yb] == '-') {
                                            xb = numeroRandom(0, 9);
                                            yb = numeroRandom(0, 9);
                                        }
                                        if (miGrilla[xb][yb] !== ' ') {
                                            miGrilla[xb][yb] = 'X';
                                        }
                                    }

                                }
                                if (miGrilla[xb][yb] == ' ') {
                                    miGrilla[xb][yb] = '-';
                                    imprimirGrilla(miGrilla);
                                    read('Binary falló!');
                                    console.clear();
                                }
                            }

                            else {
                                miGrilla[xb][yb] = '-';
                                imprimirGrilla(miGrilla);
                                read('Binary falló!');
                                console.clear();

                            }
                        }
                    }
                }
            }
        } else if (opcion == 2) {
            ayuda();
        } else if(opcion == 3){
            mostrarRanking(usuarios);
        }
    } while (opcion != 4);
}
//CARATULA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function caratula() {

    console.info(" '   '  _________  ' ___ ' ___   ________ ' __________ '  __________  ' __________                         ");
    console.info("  '   /   _____ /   /  /  /  /  /  _____/  /  ___    /   /  ___    /   /   __    /   '   '    '            ");
    console.info(" '   /  / _____  ' /  /  /  / '/  /____ ' /  /__/   / ' /  /__/   / ' /   /_/   /                  '       ");
    console.info("  ' /  / /__   /  /  /  /  /' /  _____/  /   ___   / ' /   ___   /   /   __    /  '   '      '             ");
    console.info("   /  /____/  /  /  /__/  /  /  /____   /  /    |  |  /  / '  |  |  /   / /   /         '         '        ");
    console.info("' /__________/' /_______ /  /_______/ '/__/  ' /__/  /__/    /__/  /___/ /___/   '                         ");
    console.info("       _____    ___    __________   ___   ___   __________ ' ___            '                 '            ");
    console.info("  '   /     |' /  / ' /   __    /  /  /  /  /  /   __    /  /  /     '     '       '    '       '          ");
    console.info(" ' ' /  /|  | /  /   /   /_/   /  /  /  /  / '/   /_/   / '/  /   '                           '            ");
    console.info("  ' /  / |  |/  / ' /   __    / '/  /  /  /  /   __    /  /  /  '     '     '     '      '                 ");
    console.info(" ' /  /  |     /   /   / /   /  /  |__/  /  /   / /   / '/  /______           '             '    '         ");
    console.info("  /__/   |____/ ' /___/ /___/ ' |_____ /   /___/ /___/  /_________/    '           '                       ");

}
function ganaste() {
    console.info(" '   '  _________  '  __________    _____    ___    __________   __________  ______________  ________                       :)         ");
    console.info("  '   /   _____ /    /   __    /   /     |' /  /   /   __    /  /   ______/ /_____   _____/ /  _____/   :)                             ");
    console.info(" '   /  / _____ :)  /   /_/   /   /  /|  | /  /   /   /_/   /  /   /_____        /  /      /  /____                         :)         ");
    console.info(":)  /  / /__   /   /   __    /   /  / |  |/  /   /   __    /  /______   /       /  /  :)  /  _____/  :)        :)      :)            :)");
    console.info("   /  /____/  /   /   / /   /   /  /  |     /   /   / /   /  /¯¯¯/__/  / :)    /  /      /  /____                                      ");
    console.info("' /__________/'  /___/ /___/   /__/ :)|____/   /___/ /___/  /________ /       /__/      /_______/  :)        :)             :)         ");
    read('\nPresiona enter para ver tu puntaje!');
}
function perdiste() {
    console.info(" '       _________    ' _______    __________    _______      ___    __________  ______________  ________                               ");
    console.info("  '     /   ___   /   /  _____/   /  ___    /   /   _   |:(  /  /   /   ______/ /_____   _____/ /  _____/  :(    :(      :(   :(        ");
    console.info(" '     /   /__/  /   /  /____ :( /  /__/   /   /   / |  |   /  /   /   /_____        /  /      /  /____              :(                 ");
    console.info("  '   /   ______/   /  _____/   /   ___   /   /   /  /  /  /  /   /______   /  :(   /  /      /  _____/  :(     :(                 :(   ");
    console.info("     /   /         /  /____    /  /    |  |  /   /__/  /  /  /   /¯¯¯/__/  /       /  /      /  /____                     :(            ");
    console.info("'   /___/  :(     /_______/   /__/    /__/  /_________/  /__/   /________ /  :(   /__/      /_______/    :(       :(           :(       ");
    read('\nPresiona enter para ver tu puntaje!');
}

//----------------------

function ayuda() {
    console.clear();
    console.info('            ________________  ');
    console.info('           || GUERRA NAVAL || ');
    console.info('            ----------------  ');
    console.log("\n¡Bienvenido al juego de Guerra Naval!");
    console.log("El objetivo del juego es hundir todos los barcos de tu oponente antes de que él hunda los tuyos.");
    console.log("El tablero está compuesto por 100 casilleros, con letras en el eje vertical y números en el eje horizontal.");
    console.log("Al comenzar el juego, tendrás la oportunidad de posicionar tus barcos en el tablero.");
    console.log("Tienes los siguientes barcos disponibles:");
    console.log("- 1 Portaviones (5 casilleros)");
    console.log("- 1 Acorazado (4 casilleros)");
    console.log("- 2 Submarinos (3 casilleros cada uno)");
    console.log("- 3 Destructores (2 casilleros cada uno)");
    console.log("Puedes colocar tus barcos de forma horizontal o vertical, no puedes posicionar un barco adyacente a otro barco ya posicionado.");
    console.log("Una vez que hayas posicionado tus barcos, el capitán Binary también colocará su flota de forma aleatoria.");
    console.log("Luego, el juego se desarrolla por turnos.");
    console.log("En cada turno, debes elegir una coordenada (por ejemplo, 'A y 3') para atacar un casillero en el tablero de Binary.");
    console.log("Si aciertas en un casillero ocupado por uno de sus barcos, lo hundirás.");
    console.log("Si fallas, Binary te atacará en su turno.");
    console.log("El juego continúa hasta que uno de los jugadores haya hundido todos los barcos del oponente.");
    console.log("¡Diviértete jugando al Guerra Naval!");

    read('\nPresione enter para volvr al menu princial... ');
    console.clear();
}



//USUARIO---------------------------------------------------------------------------------------------------------------------------------------------------------------

function nuevoUsuario(usuario, usuarios) {
    let nombre = usuario
    let puntos = 0
    let newUser = crearUsuario(nombre, puntos)
    usuarios.push(newUser);
}

function crearUsuario(nombre, puntos) {
    let nuevoUsuario = {};
    nuevoUsuario["nombre"] = nombre;
    nuevoUsuario["puntos"] = puntos;

    return nuevoUsuario;
}



//CREAR GRILLA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function crearGrilla(tamanio) {
    let grilla = [];
    for (let i = 0; i < tamanio; i++) {
        grilla[i] = [];
        for (let j = 0; j < tamanio; j++) {
            grilla[i][j] = ' ';
        }
    }
    return grilla;
}

function imprimirGrilla(grilla, esEnemigo = false) {
    console.log('  |1 |2 |3 |4 |5 |6 |7 |8 |9 |10|');
    console.log("-".repeat(10 * 3 + 3));
    for (let i = 0; i < grilla.length; i++) {
        let fila = convertToLetter(i) + ' |';
        for (let celda of grilla[i]) {
            if (esEnemigo && celda != 'X' && celda != '-') {
                fila += '  |';
            } else {
                fila += celda + ' |';
            }
        }
        console.log(fila);
        console.log("-".repeat(10 * 3 + 3));
    }
}

function convertToLetter(number) {
    const alphabet = "ABCDEFGHIJ";
    const letter = alphabet.charAt(number);
    return letter;
}

//VALIDACIONES--------------------------------------------------------------------------------------------------------------------------

function validarOpciones(opcion) {
    while (opcion != 1 && opcion != 2 && opcion != 3 && opcion !=4) {
        opcion = parseInt(read('ingrese opcion correcta: '));
    }
    return opcion;
}

function validarUsuario(usuario, usuarios) {
    if(usuario == ''){
        return false;
    }
    for (var i = 0; i < usuarios.length; i++) {
        if (usuario == usuarios[i]["nombre"]) {
            return false;
        }
    }
    return true;
}

function validarEleccion(eleccion) {
    while (eleccion != 1 && eleccion != 2) {
        eleccion = parseInt(read('debe ingresar 1 o 2: '))
    }
    return eleccion;
}

function validarCoordenadas(x, y) {
    if (isNaN(y)){
        return false;
    }
    if (x == null || y == null) {
        return false;
    }
    if (x.length > 1 || y.length > 1) {
        return false;
    }
    if (validacionNaN(x, y) != true) {
        return false;
    }
    if (x < 0 || x >= 10) {
        return false;
    }
    if (y < 0 || y >= 10) {
        return false;
    }
    return true
}

function validacionColocarBarco(grilla, barco, x, y, eleccion) {
    const margen = 1;

    if (eleccion == 1) {

        if (x + barco.length > 10) {
            return false;
        }

        for (let i = x - margen; i <= x + barco.length; i++) {
            for (let j = y - margen; j <= y + margen; j++) {
                if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                    if (grilla[i][j] !== ' ') {
                        return false;
                    }
                }
            }
        }
        return true;
    } else {

        if (y + barco.length > 10) {
            return false;
        }
        for (let i = x - margen; i <= x + margen; i++) {
            for (let j = y - margen; j <= y + barco.length; j++) {
                if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                    if (grilla[i][j] !== ' ') {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}

function validarEspacio(miGrilla, xb, yb) {

    for (let i = xb - 1; i <= xb + 1; i++) {
        for (let j = yb - 1; j <= yb + 1; j++) {
            if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                if (miGrilla[i][j] != 'X' && miGrilla[i][j] != '-') {
                    return true;
                }
            }
        }
    }
    return false;
}

function validacionNaN(x, y) {
    if (isNaN(x, y)) {
        return false
    }
    return true
}

function grillaPosicion(y) {
     y -= 1
    return y;
}
//COLOCAR BARCOS----------------------------------------------------------------------------------------------------------------


function ponerBarcos(barcos, miGrilla) {

    for (let barco of barcos) {
        imprimirGrilla(miGrilla);
        console.info(`\nColocar ${barco.name} (${barco.length} casilleros)`);
        let hayLugar = false;
        while (!hayLugar) {
            let letra = read(' introduce la fila de tu barco: ').toUpperCase();
            let x = letra.charCodeAt(0) - 65;
            let y = parseInt(read(' introduce la columna de tu barco: '));
            y = grillaPosicion(y);
            while (validarCoordenadas(x, y) != true) {
                console.log(' la coordenada ingresada no existe, ingrese una correcta para colocar barco: ');
                letra = read(' introduce la fila correcta de tu barco: ').toUpperCase();
                x = letra.charCodeAt(0) - 65;
                y = parseInt(read(' introduce la columna correcta de tu barco: '));
                y = grillaPosicion(y);
            }
            console.log(' 1- si desea ingresar barco verticalmente');
            console.log(' 2- si desea ingresar barco horizontalmente');
            let eleccion = parseInt(read('ingrese 1 o 2: '));
            eleccion = validarEleccion(eleccion)

            if (validacionColocarBarco(miGrilla, barco, x, y, eleccion)) {
                colocarBarco(miGrilla, barco, x, y, eleccion);
                hayLugar = true;
                imprimirGrilla(miGrilla);
            } else {
                console.log('posicion invalida, intente de nuevo: ');

            }
        }
        console.clear();
    }
    imprimirGrilla(miGrilla);
    read('Presione enter para comenzar a atacar a Binary!');
    console.clear();
}
function ponerBarcosBinary(barcos, binaryGrilla) {
    console.info('\nColocando los barcos de Binary..');
    for (let barco of barcos) {
        let hayLugar = false;
        while (!hayLugar) {
            let x = numeroRandom(0, 9);
            let y = numeroRandom(0, 9);
            let eleccion = numeroRandom(1, 2);
            if (validacionColocarBarco(binaryGrilla, barco, x, y, eleccion)) {
                colocarBarco(binaryGrilla, barco, x, y, eleccion);
                hayLugar = true;
            }
        }
    }
    imprimirGrilla(binaryGrilla, binaryGrilla, true);
}

function colocarBarco(grilla, barco, x, y, eleccion) {
    if (eleccion == 1) {
        for (let i = x; i < x + barco.length; i++) {
            grilla[i][y] = barco.symbol;
        }
    } else {
        for (let j = y; j < y + barco.length; j++) {
            grilla[x][j] = barco.symbol;
        }
    }
}


//ATACAR------------------------------------------------------------------------------------------------------------------------

function numeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function puntaje(usuarios, grilla) {

    let contador = 0;

    for (let i = 0; i < grilla.length; i++) {
        for (let j = 0; j < grilla[i].length; j++) {
            if (grilla[i][j] == ' ') {
                contador++;
            }
        }
    }
    usuarios[usuarios.length - 1]["puntos"] = contador;
}


function binaryPuntos(usuarios, grilla) {

    let contador = 0;

    for (let i = 0; i < grilla.length; i++) {
        for (let j = 0; j < grilla[i].length; j++) {
            if (grilla[i][j] == ' ') {
                contador++;
            }
        }
    }
    usuarios[0]["puntos"] = contador;
}


function mostrarRanking(usuarios) {
    console.clear();
    console.info('            ___________       ');
    console.info('           || RANKING ||      ');
    console.info('            -----------       '); 
    if (usuarios.length === 0) {
        console.info('\nAún no hay puntajes registrados.');
    } else {
        usuarios.sort((a, b) => b["puntos"] - a["puntos"]);
        for (let i = 0; i < usuarios.length; i++) {
            console.info(`${i + 1}. ${usuarios[i]["nombre"]}: ${usuarios[i]["puntos"]}`);
        }
    }
    read('\nPresione enter para volver al menu principal... ');
    console.clear();
}

