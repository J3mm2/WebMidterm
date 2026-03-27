import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { handleSearch } from './app.js';
import { historyCommand } from './history.js';

yargs(hideBin(process.argv))
    // command for search
    .command('search <keyword>', 'searches ticketmaster for events', (yargs) => {
        return yargs.positional('keyword', {
            describe: 'event type, venues, artists, or sports team to search for',
            type: 'string'
        });
    }, (args) => {
        //console.log('test search')
        handleSearch(args.keyword);
    })
    // command for search history
    .command('history <keywords>', 'shows searched keywords', (yargs) => {
        return yargs.positional('keywords', {
            describe: 'searched words',
            type: 'array'
        });
        
    }, (args) => {
        //console.log('test history')
        historyCommand(args.keywords);
    })
    .help().argv;