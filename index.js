const axios = require('axios');
const qs = require('qs');
const moment = require('moment');
const fs = require('fs');

const discord_link = 'https://discord.gg/WQErwe';
const real_invite = 'https://discordapp.com/api/v6/invite/' + discord_link.split('/')[-1];

function log(log_text) {
    log_text = moment().format('YYYY.MM.DD HH:mm:ss') + ' ➾ ' + log_text;
    console.log(log_text);
    fs.appendFileSync('log.txt', log_text + '\n');
}

log('Program başladı.');
log('Yapımcı: Can');
log('GitHub: https://github.com/fastuptime');

fs.readFile('tokens.txt', 'utf-8', (err, data) => {
    if (err) {
        log('Tokens dosyası okunamadı.');
        return;
    }
    const tokens = data.split('\n');
    for (let token of tokens) {
        log(token + ' tokeni davet ediliyor...');
        let config = {
            headers: {
                'Authorization': token
            }
        };
        axios.post(real_invite, qs.stringify(config))
            .then(res => {
                if (res.status === 200) {
                    log(token + ' tokeni davet edildi.');
                } else {
                    log(token + ' tokeni davet edilemedi.');
                }
            })
            .catch(err => {
                log(token + ' tokeni davet edilemedi.');
            });
    }
});
