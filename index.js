#!/usr/bin/env node
const got = require('got')
const terminalImage = require('term-image')
const chalk = require('chalk')
const CFonts = require('cfonts')
const { version } = require('./package.json')
const args = process.argv.slice(2)[0];

const menu = {
  main: `
    node-gif [gifName]

    gifName ............ show gif based on input
    version ............ show package version
    help ............... show help menu for a command
    
    `
}

if(args === '-v' || args === '--version') {
  console.log(`v${version}`);
  return;
}

if(args === '-h' || args === '--help') {
  console.log(menu.main);
  return;
}

CFonts.say('node-gif', {
	font: 'chrome',              // define the font face
	align: 'left',              // define text alignment
	colors: ['cyanBright','greenBright','white'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1,           // define letter spacing
	lineHeight: 1,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
});

const getGif = () => {
  (async () => {
    const {body} = await got(`https://api.giphy.com/v1/gifs/search?api_key=p1gIrzabo2nzwNhZblbhIp4x9Xp8zYcn&q=${args}&limit=1&offset=0&rating=G&lang=en`);
    const json = JSON.parse(body);
    console.log(chalk.cyan('Fetching.... 🌍'))
    let fetchGif = async () => {
        console.log(chalk.yellow('Cooking.... 👨‍🍳'))
        const { body } = await got(json.data[0].images.original.url, { encoding: null });
        console.log(chalk.red('Here we go.... 💃'))
        console.log(await terminalImage.buffer(body, {height: '50%'}));
    };
    fetchGif();
  })()
}

getGif();