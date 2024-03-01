const PW_URL = 'https://api.politicsandwar.com/graphql?api_key={apiKey}';

window.onload = async function() {
    try {
        // Dummy API key with no scopes whatsoever; knock yourself out
        const nationId = await fetchPnWData(`{me{nation{id}}}`, '81621d0936a381037743');
        if(nationId == '298035') onSuccess();
        else onFail();

    } catch(e) {
        console.log("Error retrieving data.");
        onFail();
    }
}

function onSuccess() {
    document.getElementById('status').innerHTML = "No";
}
function onFail() {
    document.getElementById('status').innerHTML = "Yes";
}

async function fetchPnWData(query, apiKey) {
    try {
        const url = PW_URL.replace('{apiKey}', apiKey);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseObject = await response.json();
        return responseObject.data.me.nation.id;
    } catch(e) {
        console.log(e);
        throw e; // Rethrow the error for higher-level handling
    }
}
