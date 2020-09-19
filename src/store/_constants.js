const IIIFImageAPI = {
    region: 'full',
    size: 'max',
    rotation: '0',
    qualityAndFormat: 'default.jpg',
}

export const constants = {
    routerActions: {
        LOCATION_CHANGE: '@@router/LOCATION_CHANGE',
    },
    buildYear: '2018',
    defaultLanguage: 'en',
    languages: {
        en: 'English',
        mn: 'Mongolian',
    },
    pages: ['home', 'archives'],
    browseOptions: ['Title', 'Author', 'Subject'],
    menuItems: [
        { key: 'browse', label: 'Browse' },
        { key: 'search', label: 'Search results' },
    ],
    sectionLinks: [
        { key: 'student', node: 'personTeacherOf', icon: 'fa fa-user' },
        { key: 'teacher', node: 'personStudentOf', icon: 'fa fa-user-crown' },
        { key: 'work', node: '', icon: 'fa fa-book-spells' },
        { key: 'author', node: '_creator', icon: 'fa fa-user-edit' },
        { key: 'genre', node: 'workGenre', icon: 'fa fa-layer-group' },
        { key: 'subject', node: 'workIsAbout', icon: 'fa fa-list' },
    ],
    browseItems: [
        { key: 'works', label: 'Works' },
        { key: 'authors', label: 'Authors' },
        { key: 'subjects', label: 'Subjects' },
    ],
    browseTypes: ['works', 'authors', 'subjects'],
    searchTypeOptions: [
        { key: 'work', color: 'col-blue' },
        { key: 'topic', color: 'col-blue' },
        { key: 'subject', color: 'col-dark' },
        { key: 'person', color: 'col-gold' },
        { key: 'place', color: 'col-red' },
    ],
    defaultColor: 'col-gold',
    searchOptions: {
        searchOffset: 0,
        resultSetSize: 10,
    },
    searchTerms: [
        `TSUL`,
        `MDZES PA DBYIG GNYEN`,
        `GUHYASAMAJA`,
        `DPAL`,
        `RGYAS PAR`,
        `LTAR`,
        `MI JOGS`,
        `NOTES`,
        `BLO BZANG GRAGS PA`,
    ],
    links: {
        wpAdmin: 'http://178.128.7.239/wp-login.php',
        acipEmail: 'mailto:info@asianclassics.org',
        nlmSite: 'http://nationallibrary.mn/mn/',
    },
    smallScreenWidth: 601,
    bdrGender: {
        'bdr:GenderMale': 'Male',
        'bdr:GenderFemale': 'Female',
    },

    bdrObjectType: {
        'bdr:ObjectTypeBlockprint': 'Blockprint',
    },

    bdrPurlURL: `http://purl.bdrc.io/resource/`,

    collections: [
        { key: '1', name: 'Collection 1' },
        { key: '2', name: 'Collection 2' },
    ],

    searchParams: {
        initialIndex: 'v1_bdrc_work',
        initialIndexPrefix: 'v1_bdrc_',
        type: '_doc',
        size: 10,
    },

    v1Indices: ['v1_*'],
    v2Indices: ['v2_*'],
    IIIFsuffix: `/${IIIFImageAPI.region}/${IIIFImageAPI.size}/${IIIFImageAPI.rotation}/${IIIFImageAPI.qualityAndFormat}`,
}
