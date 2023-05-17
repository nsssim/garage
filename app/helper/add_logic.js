

let ds = "000000"
let a  = ds.split('').map(i=>+i);
let aa = a.reduce(function (res, current ) {
    return res.concat([current, current]);
}, []);


console.log("---------------------");

//add shutters
for(i = 0 ; i < 6  ; i++ )
{

    if(a[i] == 0 )
    {
        console.log("shutter:",i+1);
    }
}
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

//add barriers
for(i = 0 ; i < 12  ; i++ )
{
    //console.log(aa[i]);
    if(aa[i] == 1 )
    {
        console.log("barrier:",i+1);
    }

}






