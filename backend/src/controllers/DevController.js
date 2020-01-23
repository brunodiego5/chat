 axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

//index, show, store, update, destroy

module.exports = {
    async index(request, response)  {
        const devs = await Dev.find();

        return response.json(devs);

    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body ; // desestruturação

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //template string

            //login é o default de name    
            const { name = login, avatar_url, bio } = apiResponse.data; //desestruturação

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            // Object short syntax
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            // Filtrar as conexões que estao no maximo 10km de distancia 
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }      
        
        return response.json(dev);
    }
};