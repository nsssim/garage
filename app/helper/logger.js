const chalk = require('chalk');
 
const red =  chalk.bold.red;
const orange = chalk.keyword('orange');
const yellow = chalk.keyword('yellow');
const blue = chalk.keyword('skyblue');
const lightgreen = chalk.keyword('lightgreen');

 

exports.dd = (file,method,variable,data) => { 

    let VERBOSE = process.env.VERBOSE
    
    
    if(VERBOSE==="true")
    {
        console.log(red("---------~~~~~~~~~~~~~-----------"));
        console.log(blue(Date()));

        console.log(orange(file) +"->"+ yellow(method) +"->"+ yellow(variable) );
        console.log(red("---------~~~~~~~~~~~~~-----------"));

        let data_type = typeof data;

        if (data_type == "string")
            console.log(lightgreen(data));
        else if(data_type == "boolean")
            console.log(yellow(data));
        else 
            console.log(data);
    }

    

}
