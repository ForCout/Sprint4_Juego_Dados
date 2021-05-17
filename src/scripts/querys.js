// Insertar un usuario **
const insert = "INSERT INTO jugador (nombre, fecha) VALUES (?, CURRENT_TIMESTAMP);";

// Comprobamos si existe el usuario
const checkJugador = "SELECT * FROM jugador WHERE nombre=? ;";

// Comprobamos el ID del jugador
const checkJugadorId = "SELECT nombre FROM jugador WHERE id =?;";


// Actualizamos el nombre del jugador
const update = "UPDATE jugador SET nombre = ? WHERE id = ?;";

// Insertamos un juego al tirar los dados
const juego = "INSERT INTO juego (resultado, dado1, dado2, idjugador)VALUES (?,'?',?,?);";

// Eliminamos las partidas del jugador seleccionado**
const remove = "DELETE FROM juego WHERE idjugador = ?;";

// Obtenemos el porcentaje de partidas ganadas de los jugadores
const porcentaj = `
    SELECT j.id as id, j.nombre as Nombre,
    COUNT(ju.resultado) 'Partidas jugadas',
    ROUND(100 * SUM(ju.resultado = 'Ganas') / COUNT(ju.resultado)) 'Porcentaje partidas ganadas'
    FROM juego ju
    JOIN jugador j ON ju.idjugador = j.id
    GROUP BY j.id;
`;

// Obtenemos todas las partidas de un jugador
const partidasJugadas = "SELECT * FROM juego WHERE idjugador=?ORDER BY id ASC;";

// Obtenemos el porcentaje de todas las partidas ganadas de todos los usuarios ordenadas de mejor a peor
const allranking = ( `
SELECT j.id as id, j.nombre as Nombre,
COUNT(ju.resultado) 'Partidas jugadas',
ROUND(100 * SUM(ju.resultado = 'Ganas') / COUNT(ju.resultado)) 'Porcentaje partidas ganadas'
FROM juego ju
JOIN jugador j ON ju.idjugador = j.id
GROUP BY j.id
ORDER BY (100 * SUM(ju.resultado = 'Ganas') / COUNT(ju.resultado))desc;
`);

module.exports = {
  insert, checkJugador, checkJugadorId, update, juego,
    remove, allranking, partidasJugadas, porcentaj
}

