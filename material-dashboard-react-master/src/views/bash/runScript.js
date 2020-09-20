function runBashScript() {

  const { exec } = require('child_process');
  exec('chmod u+x script.sh')
  
  exec('./script.sh', (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
     // the *entire* stdout and stderr (buffered)
     console.log(`stdout: ${stdout}`);
     console.log(`stderr: ${stderr}`);
    }
  });
  
}
runBashScript()