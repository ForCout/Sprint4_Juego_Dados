const router = require("express").Router();
const controller = require("../controller/controller");


/* ROUTES */

//Crea un jugador
router.post('/players', controller.insertJugador);


// Modifica el nom del jugador
 router.put('/players', controller.actualizaNombre);

// Un jugador específic realitza una tirada dels daus.
router.post("/players/:id/games", controller.tiradaDados);

// Elimina les tirades del jugador
router.delete("/players/:id/games", controller.deletePartidas);

//Retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
router.get("/players", controller.player);

//Retorna el llistat de jugades per un jugador.
router.get("/players/:id/games", controller.listaPartidas);

//Retorna el ranking mig de tots els jugadors del sistema. 
router.get("/players/ranking", controller.allRanking);

//Retorna el jugador amb pitjor percentatge d’èxit
router.get("/players/ranking/loser", controller.loser);

//Retorna el jugador amb millor percentatge d’èxit
router.get("/players/ranking/winner", controller.winner);


module.exports = router;
