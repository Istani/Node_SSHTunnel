process.chdir(__dirname);
const package_info = require("./package.json");
var software = package_info.name + " (V " + package_info.version + ")";
console.log(software);
console.log("=".repeat(software.length));

const fs = require("fs");
var envpath = __dirname + "/.env";
var config = require("dotenv").config({ path: envpath });
var config_example = "";
if (fs.existsSync(".env")) {
  for (var attributename in config.parsed) {
    config_example += attributename + "=\r\n";
  }
  fs.writeFileSync(".env.example", config_example);
}

const tunnel = require("tunnel-ssh");

function startTunnel() {
  try {
    var server = tunnel(
      {
        host: process.env.SSH_Host,
        username: process.env.SSH_User,
        password: process.env.SSH_Pass,
        dstPort: 22
      },
      function(error, server) {
        if (error) {
          console.error(error);
          setTimeout(() => {
            startTunnel();
          }, 1000);
        }
      }
    );

    var server = tunnel(
      {
        host: process.env.SSH_Host,
        username: process.env.SSH_User,
        password: process.env.SSH_Pass,
        dstPort: 6001
      },
      function(error, server) {
        if (error) {
          console.error(error);
          setTimeout(() => {
            startTunnel();
          }, 1000);
        }
      }
    );

    var server = tunnel(
      {
        host: process.env.SSH_Host,
        username: process.env.SSH_User,
        password: process.env.SSH_Pass,
        dstPort: 5901
      },
      function(error, server) {
        if (error) {
          console.error(error);
          setTimeout(() => {
            startTunnel();
          }, 1000);
        }
      }
    );
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      startTunnel();
    }, 1000);
  }
}
startTunnel();
