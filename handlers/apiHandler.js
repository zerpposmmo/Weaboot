let axios = require('axios');
require('dotenv').config();

export default class ApiHandler {

    constructor(message) {
        this.channel = message.channel;
        this.instance = axios.create({
            baseURL: process.env.API_URL
        });
    }

    request(query) {
        this.instance.get(query).then((response) => {
            if (response.status === 200) {
                console.log(response)
                /*this.channel.send(self.getRichEmbed(response.data, command)).catch((error) => {
                    this.channel.send('Oops ! Something went wrong while executing your request ...');
                    console.log(error)
                });*/
            }
        }).catch((err) => {
            this.channel.send('No results found !');
            console.log(err);
        });
    }
}