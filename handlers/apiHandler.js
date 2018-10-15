let axios = require('axios');
require('dotenv').config();
import { getEmbed} from "./helpers/embedsHelper";

export default class ApiHandler {

    constructor(message) {
        this.channel = message.channel;
        this.instance = axios.create({
            baseURL: process.env.API_URL
        });
    }

    searchRequest(query, type) {
        this.instance.get(query).then((response) => {
            if (response.status === 200) {
                let embed = getEmbed(response.data, type);
                this.channel.send(embed).catch((error) => {
                    this.channel.send('Oops ! Something went wrong while executing your request ...');
                    console.log(error)
                });
            }
        }).catch((error) => {
            this.channel.send('No results found !');
            console.log(error);
        });
    }
}