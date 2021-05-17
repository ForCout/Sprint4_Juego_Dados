const q = require("../scripts/querys");
const db = require("../config/dbconexion");

// Jugar al juego de los dados
const juegoDados = () => {
  let dado1 = Math.floor(Math.random() * 6) + 1;
  let dado2 = Math.floor(Math.random() * 6) + 1;
  let dados = [dado1, dado2];
  return dados;
};
//Ingresa un jugador
const nuevoJugador = (nombre) => {
  return new Promise((resolve, reject) => {
    db.query(q.insert, nombre, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
};

//Retorna ratios partidas ganadas de todos los jugadores
const ratioPartidasGanadas = () => {
  return new Promise((resolve, reject) => {
    db.query(q.porcentaj, (err, filas) => {
      if (!err) {
        if (filas.length > 0) {
          resolve(filas);
        } else if (filas.length === 0) {
          reject(err);
        }
      } else {
        reject(err);
      }
    });
  });
};

// Eliminamos las tiradas de un jugador**
const removePartidas = (idjugador) => {
  return new Promise((resolve, reject) => {
    db.query(q.remove, idjugador, (err) => {
      if (!err) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

// Comrpobamos si existe un jugador mediante el ID
const checkPlayerId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(q.checkJugadorId, id, (err, res) => {
      if (!err) {
        if (res.length !== 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        reject(err);
      }
    });
  });
};
//Comprueba si existe un nombre
const checkJugadorNombre = (nombre) => {
  return new Promise((reject, resolve) => {
    db.query(q.checkJugador, nombre, (err, res) => {
      if (!err) {
        if (res.length == 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        reject();
      }
    });
  });
};

//Actualiza  nombre Jugador
const update = (nombre, id) => {
  return new Promise((resolve, reject) => {
    db.query(q.update, [id, nombre], (err) => {
      if (!err) {
        resolve(true);
      } else {
        reject(err);
      }
    });
  });
};

// Obtenemos ranking 
const allRanking = () => {
  return new Promise((resolve, reject) => {
    db.query(q.allranking, (err, row) => {
      if (!err) {
        if (row.length > 0) {
          resolve(row);
        } else if (row.length === 0) {
          reject("No existen jugadores, por favor cree un jugador");
        }
      } else {
        reject(err);
      }
    });
  });
};

// Insertar el resultado de lanzar los dados
const insertPartida = (idjugador) => {
  return new Promise((resolve, reject) => {
    let resultado = juegoDados();
    let result = "";

    if (resultado[0] + resultado[1] === 7) {
      result = "Ganas";
    } else {
      result = "Pierdes";
    }

    db.query(
      q.juego,
      [result, resultado[0], resultado[1], idjugador],
      (err) => {
        if (!err) {
          resolve(resultado[0] + resultado[1]);
        } else {
          reject(`Error al tirar los dados, vuelve a intentarlo`);
        }
      }
    );
  });
};

//Lista partidas de un jugador
const recuperaPartidas = (id) => {
  return new Promise((resolve, reject) => {
    db.query(q.partidasJugadas, id, (err, filas) => {
      if (err) {
        reject(err);
      }
      if (filas) {
        resolve(filas);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  ratioPartidasGanadas,
  checkPlayerId,
  removePartidas,
  nuevoJugador,
  checkJugadorNombre,
  juegoDados,
  insertPartida,
  recuperaPartidas,
  allRanking,
  update,
};
