var argv = require('yargs')
    .usage('Usage: $0 _User.json --accepted [yes/no/both] --confirmed [yes/no/both] [--output file.csv]')
    .demand(['accepted','confirmed'])
    .argv;

var filename = argv._[0];
var users = require(filename);

var output = "";
users.results.forEach(function(user) {
    var accepted = (user.status == "Accepted" || user.status == "Early Bird. You got the worm!" || user.email.indexOf("@princeton.edu") != -1);
    var confirmed = user.confirmSubmit;
    if ((argv.accepted == "yes" && accepted || argv.accepted == "no" && !accepted || argv.accepted == "both")
        && (argv.confirmed == "yes" && confirmed || argv.confirmed == "no" && !confirmed || argv.confirmed == "both")) {
        output += user.email + ",";
    }
});

output = output.substring(0, output.length - 1);

if (argv.output) {
    var fs = require('fs');
    fs.writeFileSync(argv.output, output);
} else {
    console.log(output);
}
