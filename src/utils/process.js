
const { Command } = require('commander')

const program = new Command()

program
    
    .option('--mode <mode>', 'modo de ejecución del entorno del server', 'production')
    .parse()


module.exports = {
    program
}
