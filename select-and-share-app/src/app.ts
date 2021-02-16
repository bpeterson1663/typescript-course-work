// Code goes here!
import axios from 'axios'
document.body.appendChild(document.createElement('script')).src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`;

const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

type GeocodResponse = {
    results: {
        geometry: {
            location: {
                lat: number;
                lng: number;
            }
        }
    }[],
    status: 'OK' | 'ZERO_RESULTS'
}
const API_KEY = process.env.API_KEY
function searchAddressHandler(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value
    

    axios.get<GeocodResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${API_KEY}`)
        .then(res => {
            if(res.data.status !== 'OK'){
                throw new Error('Could not fetch location')
            }
            const coordinates = res.data.results[0].geometry.location
            const map = new google.maps.Map(document.getElementById("map")!, {
                center: coordinates,
                zoom: 16
            })
            new google.maps.Marker({position: coordinates, map: map})
        })
        .catch(err => {
            alert(err.message)
            console.error(err)
        })
}

form?.addEventListener('submit', searchAddressHandler)