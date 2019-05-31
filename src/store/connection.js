import elasticsearch from 'elasticsearch'
import { log } from './actions'

const port = 9200
//const host = process.env.NODE_ENV === 'production' ? '157.230.172.69' : 'localhost';
const host = '157.230.172.69' // : 'localhost';


let isConnected = false
let healthStatus = 'red'

const client = new elasticsearch.Client({
	host: {
		protocol: 'http',
		host: host,
		port: port,
		path: ''
	},
	log: 'info' //'trace'
})

async function checkConnection() {
	log('process.env.NODE_ENV ', host);
	while(!isConnected) {
		log('Connnnnecting....')
		while(healthStatus === 'red') {
			log('awaiting green light')
			try {
				const health = await client.cluster.health({});
				log('health: ', health)
				healthStatus = health.status
				isConnected = true
			} catch (err) {
				console.error('Connection is failing...', err)
				isConnected = false
			}
		}
    }
    
    // HAVE A LOOK INTO THIS FOR FILTERING OBJECTS
    // Object.filter = (obj, predicate) => 
    // Object.assign(...Object.keys(obj)
    //                 .filter( key => predicate(obj[key]) )
    //                 .map( key => ({ [key]: obj[key] }) ) );

    // STATS MODULE to retreive indices
    // client.indices.stats({
    //     index: "_all",
    //     level: "indices"
    //  }, function(err, res) {
    //     // res contains JSON data about indices stats
    //     log('stats', res.indices)
    //  });
    
	return isConnected
}

export { client, checkConnection, isConnected }