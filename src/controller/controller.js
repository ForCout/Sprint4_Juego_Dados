const servicio = require("../services/services");

// Insertamos Jugadores

const insertJugador = async (req, res) => {
  if (req.body.nombre === "") {
    await servicio.nuevoJugador("ANONIMO");
    res.status(201).json({ message: "Jugador con nombre anonimo añadido" });
  } else {
    try {
      resultado = await servicio
        .checkJugadorNombre(req.body.nombre)
        .catch((e) => e);

      if (resultado === true) {
        await servicio.nuevoJugador(req.body.nombre);
        res.status(201).json({
          message: `Jugador con nombre:${req.body.nombre} añadido.`,
        });
      } else {
        res.status(501).json({
          message: `El jugador '${req.body.nombre}' ya existe.`,
        });
      }
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
};

//Actualizamos nombre
const actualizaNombre = async (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: "Debe introducir un id" });
  } else {
    try {
      checkId = await servicio.checkPlayerId(req.body.id).catch((e) => e);

      if (checkId === false) {
        res.status(400).json({ message: "El id no es correcto" });
      }
      checkNombre = await servicio
        .checkJugadorNombre(req.body.nombre)
        .catch((e) => e);
      if (checkNombre === true) {
        await servicio.update(req.body.id, req.body.nombre);
        res.status(201).json({
          message: `Actualizado ${req.body.nombre}.`,
        });
      } else {
        res.status(501).json({
          message: `El nombre:${req.body.nombre} ya existe, introduzca otro.`,
        });
      }
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
};
//Jugamos una partida
const tiradaDados = async (req, res) => {
  let id = req.params.id;
  let existe = await servicio.checkPlayerId(id);

  if (existe === true) {
    result = await servicio.insertPartida(id);
    res.status(201).json({
      message: `Resultado partida:${result}`,
    });
  } else {
    res.status(404).json({
      message: "El jugador introducido no exite",
    });
  }
};

//Eliminamos todas las partidas de un jugador por su id
const deletePartidas = async (req, res) => {
  let id = req.params.id;

  resultado = await servicio.checkPlayerId(id);
  if (resultado === true) {
    await servicio.removePartidas(id);
    res.status(201).json({
      message: `Se han eliminado todas las tiradas del jugador con id ${id}`,
    });
  } else {
    res.status(400).send({
      error: "No existen jugadores con ese id ",
    });
  }
};
//Devuelve todos los jugadores y ratio partidas ganadas
const player = async (req, res) => {
  try {
    let jugadores = await servicio.ratioPartidasGanadas();
    res.status(201).json({
      Jugadores: jugadores,
    });
  } catch (error) {
    res.status(400).send({
      error: "No existen jugadores, por favor cree un jugador",
    });
  }
};

// Lista las partidas de un jugador concreto
const listaPartidas = async (req, res) => {
  let id = req.params.id;
  let existe = await servicio.checkPlayerId(id);
  if (existe === true) {
    const resultado = await servicio.recuperaPartidas(id);
    res.status(200).json(resultado);
  } else {
    res.status(404).json({
      message: "El jugador introducido no exite",
    });
  }
};
//Devuelve el ranking de todos los jugadores
const allRanking = async (req, res) => {
  try {
    const results = await servicio.allRanking();
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
//Devuelve el mejor del ranking
const winner = async (req, res) => {
  try {
    const resultado = await servicio.allRanking();
    res.status(200).send(resultado[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
//Devuelve el peor del ranking que haya jugado al menos una partida
const loser = async (req, res) => {
  try {
    const resultado = await servicio.allRanking();
    res.status(200).send(resultado[resultado.length - 1]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  player,
  insertJugador,
  deletePartidas,
  tiradaDados,
  listaPartidas,
  allRanking,
  winner,
  loser,
  actualizaNombre,
};
