import _ from 'lodash';
import * as R from './modules.js'
import data from './myData.json'assert { type: 'json' };
import a from 'axios'

// console.log(data)
// console.log(cube(2,4))
// console.log(R.arrs)
// console.log(R.getName())

// const user = {
//     name : 'yunsung',
//     age : 25,
//     email:['yschoi0119@naver.com',
//         'yunsung0119@gmail.com'
//     ]
// }

// const str = JSON.stringify(user)
// console.log(str)
// const obj = JSON.parse(str)
// console.log(obj)

// localStorage.setItem('user',JSON.stringify(user))
// console.log(localStorage.getItem('user'))
// console.log(JSON.parse(localStorage.getItem('user')))

// const str= localStorage.getItem('user')
// const obj = JSON.parse(str)
// obj.age = 22
// console.log(obj)
// localStorage.setItem('user',JSON.stringify(obj))

// const copyUser = user
// console.log(copyUser ===user)

// user.age = 20
// console.log(user)
// console.log(copyUser)

// const copyUser = Object.assign({},user)
// console.log(user ===copyUser)

// user.age = 20
// console.log(user)
// console.log(copyUser)

// const copyUser = {...user}
// console.log(copyUser === user)

// user.age = 20
// console.log(user)
// console.log(copyUser)

// user.email.push('yunsung0119@gmail.com')
// console.log(user.email === copyUser.email)

// const copyUser = _.cloneDeep(user)
// console.log(copyUser === user)

// user.age = 20
// console.log(user)
// console.log(copyUser)

// user.email.push('yschoi0119@daum.net')
// console.log(user.email === copyUser.email)

// const userA =[
//     {userID: '1', name:'yunsung'},
//     {userID: '2', name:'yunsun'}
// ]
// const userB =[
//     {userID: '3' , name:'yunsu'},
//     {userID: '4' , name:'yuns'}
// ]
// const userC = userA.concat(userB)
// console.log(userC)
// console.log(_.uniqBy(userC , 'userId'))
// const userD = _.unionBy(userA,userB,'userId')
// console.log(userD)

// const users =[
//     {userID: '1', name:'yunsung'},
//     {userID: '2', name:'yunsun'},
//     {userID: '3' , name:'yunsu'},
//     {userID: '4' , name:'yuns'}
// ]
// const findUser = _.find(users,{name:'yuns'})
// // console.log(findUser)

// const findUserIndex = _.findIndex(users,{name : 'yunsu'})
// console.log(findUserIndex)

// _.remove(users,{name:'yunsun'})
// console.log(users)

// let arr = [1,2,3,4]
// let even = _.remove(arr,(n)=>{
//     return n%2 ===0
// })
// console.log(arr, even)

// let myFriend = [
//     {name:'choi', active : false},
//     {name:'lee', active : false}
// ]
// console.log(_.every(myFriend,{name:'choi', active:false}))
// console.log(_.every(myFriend,{active:false}))
// console.log(_.every(myFriend,'active'))

// let sister = [
//     {name : 'kim', age : 22, city : 'anyang'},
//     {name : 'choi', age : 23, city : 'suwon'},
//     {name : 'choi', age : 23, city : 'yongin'},
//     {name : 'park', age : 24, city : 'seoul'}
// ]
// console.log(_.filter(sister,{age: 22, name:'kim'}))
// console.log(_.filter(sister,s=>
//     s.age === 22
// ))


// function getMovies(){
//     a
//     .get('http://www.omdbapi.com/?i=tt3896198&apikey=8f9dd560&s=Guardians of the Galaxy Vol. 2')
//     .then((response =>{
//         console.log(response)
//         const h1El = document.querySelector('h1')
//         const imgEl = document.querySelector('img')
//         const dv = document.querySelector('div')
//         const hh = document.getElementById('type')
//         h1El.textContent = response.data.Search[0].Title
//         imgEl.src =response.data.Search[0].Poster
//         dv.textContent = '개봉년도 : '+response.data.Search[0].Year
//         type.textContent = '타입 : '+response.data.Search[0].Type
 
//     }))
// }
// getMovies()

const API_KEY ='6957777769797363373771785a7a64'
async function getData(){
    const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/bikeList/1/10/`
    const response = await fetch(url)
    const data = await response.json()
    const locations = data.rentBikeStatus.row.map(spot =>{spot.stationName,spot.stationLatitude,spot.Longitude})
    console.log(data)
    console.log('locations',locations)
    drawMap(locations)
}
getData()
function drawMap(locations){
    const map = new google.maps.Map(document.getElementById('map'),{
        zoom:13,
        center:new google.maps.LatLng(locations[0][1], locations[0][2]),
        mapTypeId:google.maps.mapTypeId.ROADMAP
    })
    const infowindow = new google.maps.InfoWindow()
    locations.forEach(location, i => {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[1], locations[2]),
            map : map,
            title : locations[0]
        
        })
        marker.addListener('click',()=>{
            infowindow.setContent(location[3])
            infowindow.open(map,marker)
        })

        
    });
}