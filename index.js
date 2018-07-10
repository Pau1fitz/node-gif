#!/usr/bin/env node
const got = require('got');
const terminalImage = require('term-image');
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

const getGif = () => {
  (async () => {
    const {body} = await got(`https://api.giphy.com/v1/gifs/search?api_key=p1gIrzabo2nzwNhZblbhIp4x9Xp8zYcn&q=${args}&limit=1&offset=0&rating=G&lang=en`);
    const json = JSON.parse(body);
    console.log('Fetching.... 🌍')
    let fetchGif = async () => {
        console.log('Cooking.... 👨‍🍳')
        const { body } = await got(json.data[0].images.original.url, { encoding: null });
        console.log('Here we go.... 💃')
        console.log(await terminalImage.buffer(body, {height: '50%'}));
    };
    fetchGif();
  })()
}

getGif();