import { client, log } from './connection';
const initialIndex = 'frontend';
const type = ''; // 'data'
const size = 10;

const initialSearch = (ids) => {
	
	const body = {
		
		size: size,
		query: {
            ids: {
                type: "_doc",
                values: ids
            }
        }
	};
	log('initial search body', body);
	return client.search({index: initialIndex, type, body});
};

const searchID = (id) => {
	
	const body = {
		
		size: size,
		query: {
            ids: {
                type: "_doc",
                values: id
            }
        }
	};
	log('initial search body', body);
	return client.search({index: ['bdrc_work', 'bdrc_topic', 'bdrc_person', 'bdrc_item'], type, body});
};

const textOnlyTerm = (term, catref, filterClause) => {

	// const filter = {
	// 	bool: { should: [ filterClause ] }
	// };
	
	// const multiMatchPhrase = {
	// 	query: term,
	// 	type: 'phrase',
	// 	fields: ['author*^10', 'title*^10', 'tibtext^3']
	// };

	const highlight_all = {
		fields: {
			tibtext: {
				fragment_size: 0,
				highlight_query: {
					match_phrase: {
						tibtext: term 
					}
				}
			}
		},
		pre_tags: ['<yo>'],
		post_tags: ['</yo>']
	};

	const body = {
		query: {
			term: {
				'catref': catref
			}
		},
		highlight: highlight_all,
		_source: {
			includes: ['tibtext']
		}
		
	};
	
	return client.search({initialIndex, type, body});
};


export { initialSearch, textOnlyTerm, searchID };