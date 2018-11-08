import elasticsearch from 'elasticsearch';

const port = 9200;
//const host = process.env.NODE_ENV === 'production' ? '142.93.23.6' : 'localhost';
const host = '142.93.23.6' // : 'localhost';

let isConnected = false;
let healthStatus = 'red';

console.log(host);

const log = (...msgs) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(...msgs)
	}
};

const client = new elasticsearch.Client({
	host: {
		protocol: 'http',
		host: host,
		port: port,
		path: ''
	},
	log: 'info' //'trace'
});

async function checkConnection() {
	log('process.env.NODE_ENV ', host);
	while(!isConnected) {
		log('Connnnnecting....');
		while(healthStatus === 'red') {
			log('awaiting green light');
			try {
				const health = await client.cluster.health({});
				log('health: ', health);
				healthStatus = health.status;
				isConnected = true;
			} catch (err) {
				console.error('Connection yo, is failing...', err);
				isConnected = false;
			}
		}
    }
    
    // cat module with json formatting
    // client.cat.indices({"format": "json"}, (err, res) => {
    //     log('cat2', res.filter(f => f.index.substring(0,4) === "bdrc"))
    //     log(err)
    // });

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
    
	return isConnected;
}

export { client, checkConnection, isConnected, log };