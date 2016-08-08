'use strict';

module.exports = function () {

    return {

        tasks: {

            // Utility so useful for versioning
            bump: {
                options: {
                    files: ['package.json', 'config.xml'],
                    commitFiles: ['package.json', 'config.xml', 'CHANGELOG.md'],
                    pushTo: 'origin',
                    tagName: 'v%VERSION%',
                    commitMessage: 'Release v%VERSION%'
                }
            },

            conventionalChangelog: {
                options: {
                    // conventional-changelog options go here
                    changelogOpts: {
                        preset: 'angular',
                        // releaseCount: 1,
                        transform: function (commit, done) {
                            // console.log('commit:', commit);
                            switch (commit.type) {
                                case 'features':
                                case 'feature':
                                    commit.type = 'feat';
                                    break;
                                case 'bugfix':
                                    commit.type = 'fix';
                                    break;
                                default:
                                    commit.type = 'feat';
                                    commit.subject = commit.header;
                            }
                            done(null, commit);
                        }
                    },
                    // context goes here
                    context: {},
                    // git-raw-commits options go here
                    gitRawCommitsOpts: {
                        // from: 'baed59a19a95a7bc57af0932ed1771e97c1ccebf',
                        // to: 'v0.3.0'
                    },
                    // conventional-commits-parser options go here
                    parserOpts: {
                        headerPattern: /^(\w*)\/([\w-]*)?[^—]*\—?\s?(.*)$/
                    },
                    // conventional-changelog-writer options go here
                    writerOpts: {}
                },
                release: {
                    src: 'CHANGELOG.md'
                }
            }

        }
    };

};
