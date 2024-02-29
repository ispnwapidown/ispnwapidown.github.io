const address = "https://api.politicsandwar.com/graphql";

const t1 = Date.now();
let t2;

const max = 2000;
let failed = false;

let httpReq = (window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
if(httpReq == null) {
    console.log("Error: XMLHttpRequest failed to initiate.");
}
httpReq.onreadystatechange = function() {
    console.log("Hey handsome");
    console.log(httpReq);

    const failTimer = setTimeout(function() {
                            failed = true;
                            httpReq.abort();
                            }, max);

    if (httpReq.readyState == 4) {  //Completed loading
        if (!failed && (httpReq.status == 200 || httpReq.status == 0)) {

            clearTimeout(failTimer);

            t2 = Date.now();

            const timeTotal = (t2 - t1);
            if(timeTotal > max) {
                onFail();
            } else {
                onSuccess();
            }

        }
        else {  //Otherwise, there was a problem while loading
            console.log("Error " + httpReq.status + " has occurred.");
            onFail();
        }
    }
}
try {
    httpReq.open("GET", address, true);
    httpReq.send(null);

} catch(e) {
    console.log("Error retrieving data.");
    onFail();
}


function onSuccess() {
    document.getElementById('status').innerHTML = "No"
}
function onFail() {
    document.getElementById('status').innerHTML = "Yes"
}