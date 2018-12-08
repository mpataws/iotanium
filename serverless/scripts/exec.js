
const child_process = require('child_process')

module.exports = function exec(command) {
  return new Promise((resolve, reject) => {
    console.log(`COMMAND: ${command}`)
    const child = child_process.spawn(command, [], { shell: true })

    child.stdout.on('data', (data) => {
      process.stdout.write(`${data}`)
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(`${data}`)
    });

    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`)

      if (code)
        reject(code)

      resolve()
    });
  })
}
