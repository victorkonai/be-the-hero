const connection = require('../database/connection');

module.exports = {
  //trazendo todos os dados da tabela 
  async index(request, response){
    const { page = 1} = request.query;

    const [count] = await connection ('incidents').count();

    const incidents = await connection('incidents')
    //5 casos por pagina
    .join('ongs' , 'ongs.id' , '=' , 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select(['incidents.*',
    'ongs.name',
    'ongs.email',
    'ongs.whatsapp',
    'ongs.city',
    'ongs.uf',
    ]);
  
    response.header('X-Total-Count' , count['count(*)']);
    return response.json(incidents);
  },

  async create(request, response){
      const { title, description, value} = request.body;

      //acessando o id da ong
      const ong_id = request.headers.authorization;

      //inserir os dados com os
      const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
      });

      return response.json({ id });
  },

  async delete(request, response){
    //pegar o id que vem de dentro do request
    const { id } = request.params;
    //buscar o id da ong atraves do hearders.authorization
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents')
    .where('id' , id)
    .select('ong_id')
    .first();

    if(incidents.ong_id != ong_id){
      return response.status(401).json({ error: 'Operation not permited.'});
    }

    //se o fi estiver certo vai deletar o id do bd
    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
};