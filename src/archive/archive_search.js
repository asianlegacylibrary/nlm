import { client, log } from './connection';
const index = 'acip_update';
const type = ''; // 'data'
const size = 10;

const initialSearch = (filterClause) => {
	
	const body = {
		size: 0,
		aggregations: {
			collections: {
				terms: {
					field: 'collection.keyword',
					order: { _count: 'desc' }
				}
			}
		},
		query: {
			bool: {
				filter: {
					bool: {
						should : [
							filterClause
						]
					}
				}
			}
		}
	};
	log(body);
	return client.search({index, type, body});
};

const phraseTerm = (term, offset, filterClause) => {

	const aggregations = {
		data: {
			terms: { field: 'authortib.keyword', size: size, order: { max_score: 'desc' } },
			aggregations: { max_score: { max: { script: '_score' } } }
		}
	};

	const filter = {
		bool: { should: [ filterClause ] }
	};
	
	const multiMatchPhrase = {
		query: term,
		type: 'phrase',
		fields: ['author*^10', 'title*^10', 'tibtext^3']
	};

	const highlight_108 = {
		fields: { tibtext: { fragment_size: 108 } },
		pre_tags: ['<yo>'],
		post_tags: ['</yo>']
	};

	const body = {
		from: offset,
		size: size,
		aggregations: aggregations,
		query: {
			bool: {
				filter: filter,
				must: [{ multi_match: multiMatchPhrase }] //mustMultiMatchPhrase
			}
		},
		highlight: highlight_108
		
	};
	//console.log('the body of phrase match ', body);
	const b = client.search({index, type, body});
	log('logging client.search pre return ', b);
	return client.search({index, type, body});
};



const phraseTermWithAuthor = (term, offset, author, filterClause) => {

	const filter = {
		bool: { should: [ filterClause ] }
	};

	const multiMatchPhrase = {
		query: term,
		type: 'phrase',
		fields: ['author*^10', 'title*^10', 'tibtext^3']
	};

	const matchAuthor = {
		'authortib.keyword' : author 
	};

	const highlight_108 = {
		fields: { tibtext: { fragment_size: 108 } },
		pre_tags: ['<yo>'],
		post_tags: ['</yo>']
	};


	const body = {
		from: offset,
		size: size,
		query: {
			bool: {
				filter: filter,
				must: [
					{ multi_match: multiMatchPhrase },
					{ match : matchAuthor }
				]
			}
		},
		highlight: highlight_108
	};
	return client.search({index, type, body});
};

const textOnlyTerm = (term, catref, filterClause) => {

	const filter = {
		bool: { should: [ filterClause ] }
	};
	
	const multiMatchPhrase = {
		query: term,
		type: 'phrase',
		fields: ['author*^10', 'title*^10', 'tibtext^3']
	};

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
	//console.log('the body of phrase match ', body);
	const b = client.search({index, type, body});
	//log('logging client.search pre return ', b);
	return client.search({index, type, body});
};

const getParagraphs = (catref, startLocation, endLocation) => {
	const filter = [
		{ term: { catref: catref } },
		{ range: { location: { gte: startLocation, lte: endLocation } } }
	];

	const body = {
		size: endLocation - startLocation,
		sort: { location: 'asc' },
		query: { bool: { filter } }
	};

	return client.search({ index, type, body });
};


export { phraseTerm, phraseTermWithAuthor, initialSearch, getParagraphs, textOnlyTerm };
