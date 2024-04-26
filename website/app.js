/* Global Variables */
const zipcode = document.getElementById('zip')
const zcode = zipcode.value;
const generate = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const apiKey = '1723d83953bc5e38fce03c3f461f533f';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${zcode}&appid=${apiKey}&units=imperial`;
const localHost = 'http://localhost:8000/weatherData';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

generate.addEventListener('click', generatefunc);

async function getData() {
    try {
        const response = await fetch(localHost);
        // if (!response.ok) {
        //     throw new Error('Failed to fetch data');
        // }
        return await response.json(); // Return the parsed data
    } catch (error) {
        console.error('Error:', error.message);
    }
}
async function updateUI() {
    const request = await fetch('/weatherData');
 try {
 // Transform into JSON
 const allData = await request.json()
        .then(function (data) {
            if (data) {
                console.log("Data:", data);
                date.innerText = newDate;
                temp.innerText = allData.Temp;
                content.innerText = allData.Desc;
            } else {
                console.error("Error: Data is null");
            }
        })
    }
        catch(error) {
            console.error('Error:', error.message);
        };
}
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};


async function get_weather_data(url) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ zipcode: zcode })
        });
        const responseData = await response.json();
        if (!res.ok) {
            console.log('fetch error');
            return;
        }
        const data = await res.json();
        console.log('data:', data);
        // const temp = data.main.temp;
        // const desc = data.weather[0].description;
        let newData = {
            Temp: data.main.temp,
            Desc: data.weather[0].description
        };
        return newData;
    } catch (error) {
        console.log('error fetching:', error);
    }
}


async function generatefunc() {
    //fetch data from website
    get_weather_data(url)
    //post to server
        .then(function (data) {
            postData('/weatherData', data);
        })    
    //get from server
    // .then(getData)
    //update ui
    .then(updateUI);
/*     getData();
    const response = await fetch(localHost, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ zipcode: zcode })
    });
    const responseData = await response.json();
    console.log(responseData.message); // Log the response for debugging
    updateUI(); // Call updateUI after fetching the data
    //console.log(zipcode.value); */
}