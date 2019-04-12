const server = require(./server.js);

const port = process.env.Port || 5000;

server.listen(port, () => {
  console.log(`\n** Ah ha! Its ya boy running on port ${port} **\n`)
})