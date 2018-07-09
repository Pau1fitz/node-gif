const program = require('commander');
const got = require('got');
const terminalImage = require('term-image');

program
  .version('0.0.1')
  .description('Node Gif');

program
  .command('fetchGif')
  .description('Get Image')
  .action((query) => {
      (async () => {
        const {body} = await got(`https://api.giphy.com/v1/gifs/search?api_key=p1gIrzabo2nzwNhZblbhIp4x9Xp8zYcn&q=${query}&limit=1&offset=0&rating=G&lang=en`);
        const json = JSON.parse(body);
        console.log('Fetching.... 🌍')
        let fetchGif = async () => {
            console.log('Cooking.... 👨‍🍳')
            const { body } = await got(json.data[0].images.original.url, { encoding: null });
            console.log(await terminalImage.buffer(body, {height: '50%'}));
        };
        fetchGif();
      })()
      
});

program.parse(process.argv);