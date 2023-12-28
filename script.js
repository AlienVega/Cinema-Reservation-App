const container=document.querySelector(".container");
const count =document.querySelector("#count");
const amount=document.getElementById("amount");
const select =document.getElementById("movie");
const seats=document.querySelectorAll(".seat:not(.reserved)")

getFromLocalStorage();
caltulateTotal();

container.addEventListener("click",function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
       e.target.classList.toggle("selected")
    
       caltulateTotal()
       

    }
})
select.addEventListener("change",function(e){
    caltulateTotal()
})
function caltulateTotal(){
    const selectedSeats=container.querySelectorAll(".seat.selected")
    
    // localstorage eklemek için tüm koltukları ve seçili koltukları array içerisine yedekledik
    const selectedSeatsArr=[...selectedSeats];
    const seatsArr=[...seats];
    
    let selectedSeatIndeks = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat)
    })
    

    let selectedSeatCount=selectedSeats.length;
       
    count.innerText=selectedSeatCount

    amount.innerText=select.value*selectedSeatCount

    savetoLocalStorage(selectedSeatIndeks)
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats != null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex=localStorage.getItem("indeks");

    if(selectedMovieIndex !=null){
        select.selectedIndex=selectedMovieIndex;
    }
}

function savetoLocalStorage(indeks){
    localStorage.setItem("selectedSeats",JSON.stringify(indeks))

    localStorage.setItem("indeks",select.selectedIndex)
}