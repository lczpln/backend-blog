const Post = require('../models/postSchema');

exports.index = async (req, res, next) => {
    try {
        const response = await Post.find({}).sort('-createdAt');

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).send({ msg: `Erro ao realizar requisição dos posts => ${e}` })
    }
}

exports.search = async (req, res, next) => {
    const id = req.params.url;

    try {
        const response = await Post.findOne({ url: id });

        if(!response) throw new Error('Post não encontrado.')

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).send({ msg: `Erro ao realizar requisição do post => ${e}` })  
    }
}


exports.store = async (req, res, next) => {
    const post = new Post(req.body);

    try {
        const response = await post.save();

        req.io.emit('newPost', response);

        return res.status(201).send({ msg: 'Novo post criado com sucesso.' });
    } catch (e) {
        return res.status(500).send({ msg: `Erro ao criar novo post => ${e}` })
    }
}

exports.delete = async (req, res, next) => {
    const post = req.params.id;
    
    try {
        await Post.findByIdAndDelete({ _id: post })

        return res.status(200).send({ msg: 'Post excluido com sucesso.' });
    } catch (e) {
        return res.status(500).send({ msg: `Erro ao criar excluir post => ${e}` })   
    }
}