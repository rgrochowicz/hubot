/*
 * Description:
 *   Generates help commands for Brobbot.
 *
 * URLS:
 *   /brobbot/help
 *
 * Notes:
 *   These commands are grabbed from comment blocks at the top of each file.
 */

//TODO template file
var helpContents = function(name, commands) {
  return "<!DOCTYPE html>\n<html>\n  <head>\n  <meta charset=\"utf-8\">\n  <title>" + name + " Help</title>\n  <style type=\"text/css\">\n    body {\n      background: #d3d6d9;\n      color: #636c75;\n      text-shadow: 0 1px 1px rgba(255, 255, 255, .5);\n      font-family: Helvetica, Arial, sans-serif;\n    }\n    h1 {\n      margin: 8px 0;\n      padding: 0;\n    }\n    .commands {\n      font-size: 13px;\n    }\n    p {\n      border-bottom: 1px solid #eee;\n      margin: 6px 0 0 0;\n      padding-bottom: 5px;\n    }\n    p:last-child {\n      border: 0;\n    }\n  </style>\n  </head>\n  <body>\n    <h1>" + name + " Help</h1>\n    <div class=\"commands\">\n      " + commands + "\n    </div>\n  </body>\n</html>";
};

module.exports = function(robot) {
  robot.helpCommand('brobbot help', 'Displays all of the help commands that Brobbot knows about.');
  robot.helpCommand('brobbot help `query`', 'Displays all help commands that match `query`.');

  robot.respond(/^help\s*(.*)$/i, function(msg) {
    var cmds = robot.helpCommands();
    var filter = msg.match[1];

    if (filter) {
      cmds = cmds.filter(function(cmd) {
        return cmd.match(new RegExp(filter, 'i'));
      });

      if (cmds.length === 0) {
        msg.send("No available commands match " + filter);
        return;
      }
    }

    var prefix = robot.alias || robot.name;
    cmds = cmds.map(function(cmd) {
      cmd = cmd.replace(/brobbot/ig, robot.name);
      return cmd.replace(new RegExp("^" + robot.name), prefix);
    });

    return msg.send(cmds.join("\n"));
  });

  return robot.router.get("/" + robot.name + "/help", function(req, res) {
    var cmds = robot.helpCommands().map(function(cmd) {
      return cmd.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });

    var emit = "<p>" + (cmds.join('</p><p>')) + "</p>";
    emit = emit.replace(/brobbot/ig, "<b>" + robot.name + "</b>");

    res.setHeader('content-type', 'text/html');

    return res.end(helpContents(robot.name, emit));
  });
};
