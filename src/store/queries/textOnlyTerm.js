import { client } from '../connection'

const i = "t_bdrc_work"

export const textOnlyTerm = (term, catref, filterClause) => {

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
	
	return client.search({ i, body})
	
}