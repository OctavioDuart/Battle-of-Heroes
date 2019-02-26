const querys = {
    find_power_heroe: `SELECT personagens.nome , poderes.poder FROM personagens_poderes 
    INNER JOIN personagens ON personagens.id = personagens_poderes.id_personagem
    INNER JOIN poderes 	ON poderes.id = personagens_poderes.id_poder ORDER BY nome  ; `
}


module.exports = querys;