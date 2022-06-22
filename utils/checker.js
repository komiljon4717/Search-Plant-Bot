
import fs from 'fs' 
import axios from 'axios' 
import FormData from 'form-data'
import util from 'util'

const image_1 = process.cwd() + '/img/1.jpg';
const image_2 = process.cwd() + '/img/2.jpg';


async function find(){
		let form = new FormData();

		form.append('organs', 'leaf');
		form.append('images', fs.createReadStream(image_1));

		form.append('organs', 'fruit');
		form.append('images', fs.createReadStream(image_2));

		try {
				const { status, data } = await axios.post(
						'https://my-api.plantnet.org/v2/identify/all?api-key=2b10ugpSykQ18mPmdxQHtrogu',
						form, {
							headers: form.getHeaders()
						}
				);
				console.log('status', status); // should be: 200
				console.log('data', util.inspect(data, false, null, true)); // should be: read "Step 6" below
                console.log('\n');
                console.log('\n');
                console.log('\n');
                console.log('\n');
                
		} catch (error) {
            console.log("dang");
			console.error('error', error.message);
		}
}


export {
	find
}