const con = require('../connect/connect');

const create = (req, res) => {
    let cliente_id = req.body.cliente_id;
    let marca_veiculo = req.body.marca_veiculo;
    let modelo_veiculo = req.body.modelo_veiculo;
    let ano_veiculo = req.body.ano_veiculo;
    let fabricacao_veiculo = req.body.fabricacao_veiculo;  

    let query = `INSERT INTO veiculos (cliente_id, marca_veiculo , modelo_veiculo, ano_veiculo, fabricacao_veiculo ) VALUES `;
    query += `('${cliente_id}', '${marca_veiculo}', '${modelo_veiculo}', '${ano_veiculo}', '${fabricacao_veiculo}');`; 

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(201).json(result)
        }
    })
}

const read = (req, res) => {
    con.query('SELECT * FROM veiculos', (err, result) => {  
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    })
}

const update = (req, res) => {
    const id = req.params.id 
    const { cliente_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo } = req.body 

    con.query(
        'UPDATE veiculos SET cliente_id = ?, marca_veiculo = ?,modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiculo = ? WHERE veiculos_id = ?',
        [cliente_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, id], 
        (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    )
}

const deletar = (req, res) => {
    const id = req.params.id;

    con.query('DELETE FROM veiculos WHERE veiculos_id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json(err).end();  
        } else {
            res.status(204).send();  
        }
    })
}

module.exports = {
    create,
    read,
    update,
    deletar
}
