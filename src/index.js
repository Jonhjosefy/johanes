const csv = require('fast-csv');
const fs = require("fs");

const responseFile = 'challange-response-reverse-logs'
const requestFile = 'challenge-reverse-logs'

function readCsv(path) {
	return new Promise((resolve, reject) => {
		const data = [];
		csv
			.parseFile(path, { headers: true })
			.on("error", reject)
			.on("data", (row) => {
				data.push(row);
			})
			.on("end", () => {
				resolve(data);
			});
	});
}

function parseJson(row) {
	try {
		return JSON.parse(row["@message"].replace(`${row["@timestamp"]} `, ""))
	} catch (e) {
		console.log(e)
	}
}

function writeFile(data) {
	fs.writeFileSync('falhas.json', JSON.stringify({ falhas: data }, null, 2));
}


const main = async () => {
	console.log('Iniciando leitura dos arquivos')
	const request = await readCsv(`./src/data/${requestFile}.csv`)
	const response = await readCsv(`./src/data/${responseFile}.csv`)

	console.log('Realizando o parse das infos')
	const parsedRequest = request.map(parseJson)
	const parsedResponse = response.map(parseJson)

	console.log('Buscando por responses de falhas')
	const failedResponses = parsedResponse.filter(r => r.Response.code === 1 && r.Response.message === "ERROR").map(r => r.CorrelationId)
	console.log(`Ocorreram ${failedResponses.length} falhas`)

	console.log('Buscando pelo Id de compra')
	const result = parsedRequest.filter(r => failedResponses.includes(r.CorrelationId)).map(m => m.Payload.id_compra)

	console.log('Escrevendo arquivo de resposta')
	writeFile(result)
}


main().then(_ => console.log('Fim'))
