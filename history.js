import inquirer from 'inquirer';
import { readFileSync } from 'fs';
import { handleSearch } from './app.js';

const historyCommand = async (arg) => {
    if (arg !== 'keywords') {
        console.log('Invalid argument. Use: node cli.js history keywords');
        return;
    }

    let history = [];

    try {
        const data = readFileSync('./search_history.json', 'utf-8');
        history = JSON.parse(data);
    } catch (error) {
        console.log('No search history found.');
        return;
    }

    if (history.length === 0) {
        console.log('No search history found.');
        return;
    }

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'keyword',
            message: 'Select a keyword:',
            choices: ['Exit', ...history]
        }
    ]);

    if (answer.keyword === 'Exit') {
        console.log('Exiting.');
        return;
    }

    await handleSearch(answer.keyword);
};

export { historyCommand };