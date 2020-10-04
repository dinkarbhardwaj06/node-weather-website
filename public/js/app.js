// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const searchelement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchelement.value
    //console.log('Submit the Form' + location)
    const url = '/weather?address='+location
    //console.log(url)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(url).then((response)=>{
       // console.log(response)
        response.json().then((forecast)=>{
            if(forecast.error){
                messageOne.textContent = forecast.error
                messageTwo.textContent = ''
            }else{
                messageOne.textContent = forecast.location
                messageTwo.textContent = forecast.forecast
            }
        //console.log(forecast)
    })
})

})