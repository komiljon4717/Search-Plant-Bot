
import fs from 'fs' 
import axios from 'axios' 
import FormData from 'form-data'
import util from 'util'
import key from '../config.js'




async function find(bot, psql, user){

	let messageInfo = await bot.sendMessage(user.chat_id, "Yuklanmoqda...")

	let form = new FormData();

	for (let i = 0; i < process.organs.length; i++) {

		form.append('organs', process.organs[i]);
		form.append('images', fs.createReadStream(process.cwd() + `/${process.pictures[i]}`));
	}

	try {

		const { status, data } = await axios.post(
				`https://my-api.plantnet.org/v2/identify/all?api-key=${key.API_KEY}`,
				form, {
					headers: form.getHeaders()
				}
		);

		process.organs = []
		process.pictures = []
		
		console.log(data);

		if (allInfo) {
			let text = `
			Eng yaxshi mos kelgan: <b>${data.bestMatch}</b> \n\n`

			for (let i = 0; i < 3; i++) {
				let typeInfo = `${i+1}. <b>O'xshashlik darajasi:</b> <i>${data.results[i].score * 100} %</i>
				<b>Ilmiy nomi:</b> <i>${data.results[i].species.scientificNameWithoutAuthor} ${data.results[i].species.scientificNameAuthorship}</i>
				<b>Oilasi:</b> <i>${data.results[i].species.family.scientificNameWithoutAuthor}</i>
				<b>Umumiy nomlari:</b> <i>${data.results[i].species.commonNames}</i>
				<b>GBIF:</b> <i>${data.results[i].gbif.id}</i>\n\n
				`
				text += typeInfo
			}

			bot.deleteMessage(user.chat_id, messageInfo.message_id)

			bot.sendMessage(user.chat_id, text, {parse_mode: "HTML"})
		}
	} catch (error) {
		console.log("dang");
		console.error('error', error.message);
	}
}

export {
	find
}