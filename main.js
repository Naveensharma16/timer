var color = "#f36f6b";
var font = "'Roboto', sans-serif";
var pomodoro = 25;
var shortbreak = 5;
var longbreak = 15;
var intervelid = 0;
let clockmeterincrementvalue = undefined;
let clockmeter= 0;

// audio to play when user click on clock type button
let audio = new Audio('./assets/sound.mp3');



// function to set the color of buttons progress bar
const setColorStyle = () =>{
        // setting default color of stuffs that use color i.e progressbar color, button color
        document.querySelector('.progress-circle-prog').style.stroke=color;
        // code for modal apply button
        document.querySelector(".apply-btn").style.backgroundColor=color;
        // code for clock type button
        document.querySelector(".button-container .active").style.backgroundColor=color;
}

// function to set the font of app
const setFontStyle = () =>{
  // adding font family to top parent class so it automatically applied to all section
  document.querySelector('.watch-container').style.fontFamily=font; 
  //code for modal apply button font
  document.querySelector(".apply-btn").style.fontFamily=font;
}



const setClock = () =>{

    const clock = document.querySelectorAll(".button-container button");
    for (let index = 0; index < clock.length; index++) {
         if(clock[index].classList.contains("active")){
            console.log("calling setclock");
              if(index == 0){
                document.querySelector(".progress-text h2").textContent= pomodoro;
              }
              else if(index == 1){
                document.querySelector(".progress-text h2").textContent= shortbreak;
              }
              else{
                document.querySelector(".progress-text h2").textContent= longbreak;
              }
         }
    }


}


(
    () =>{
        setColorStyle();
        setFontStyle();
        setClock();
    }
)();




// method to show the modal
const showSettingModal = () =>{
    document.querySelector(".setting-modal").style.display="block";
    document.querySelector(".setting-modal").classList="setting-modal animatemodal";
}
// method to hide the modal
const hideSettingModal = () =>{
    document.querySelector(".setting-modal").style.display="none";
    document.querySelector(".setting-modal").classList="setting-modal";
}


// setting the watch type value








// listning event on setting button which will open the modal
document.querySelector(".settings button").addEventListener('click',() =>{
    showSettingModal();
})

// listning event on cross button and apply to close the modal
document.querySelector(".top-head img").addEventListener('click',() =>{
    hideSettingModal();
})
document.querySelector(".apply-btn").addEventListener('click',() =>{
    hideSettingModal();
})



// function to remove active class
const removeActive = (list) =>{
    for (let index = 0; index < list.length; index++) {
        list[index].style="";
        list[index].classList="";
   } 
}


// code for changing color in app
const colorbox = document.querySelectorAll(".color-list button");
for (let index = 0; index < colorbox.length; index++) {
     colorbox[index].addEventListener('click',(e) => {
            console.log(e.target);
            color = e.target.value;
            removeActive(colorbox);
            setColorStyle();
            e.target.classList="active";   
     })
}


// code for changing font family in app
const fontbox = document.querySelectorAll(".fonts-list button");
for (let index = 0; index < fontbox.length; index++) {
    fontbox[index].addEventListener('click',(e) => {
           console.log(e.target);
           font = e.target.value;
           removeActive(fontbox);
           setFontStyle();
           e.target.classList="active";   
    })
}




// eventlistner for pomodoro app
document.getElementById("pomodoro").addEventListener("change",(e) =>{
            pomodoro = e.target.value;
            let status = document.querySelector('.progress-text p').textContent;
              // setting the clock increment value to undefined so we can again set it in event listner on clock so that our progress bar can work according to new value and also setting progress bar value to 0
            clockmeterincrementvalue = undefined;
            clockmeter= 0;
            document.querySelector(".progress-circle-prog").style.strokeDasharray= `${0} 900`;

          
             document.querySelector('.progress-text p').textContent = "START";
           
            clearInterval(intervelid);
           setClock();
})
// eventlistner for short break app
document.getElementById("shortbreak").addEventListener("change",(e) =>{
            shortbreak = e.target.value;
            let status = document.querySelector('.progress-text p').textContent;
             // setting the clock increment value to undefined so we can again set it in event listner on clock so that our progress bar can work according to new value and also setting progress bar value to 0
            clockmeterincrementvalue = undefined;
            clockmeter= 0;
            document.querySelector(".progress-circle-prog").style.strokeDasharray= `${0} 900`;

             document.querySelector('.progress-text p').textContent = "START";
       
            clearInterval(intervelid);
            setClock();
})
// eventlistner for long break app
document.getElementById("longbreak").addEventListener("change",(e) =>{
            longbreak = e.target.value;
            let status = document.querySelector('.progress-text p').textContent;
             // setting the clock increment value to undefined so we can again set it in event listner on clock so that our progress bar can work according to new value and also setting progress bar value to 0
            clockmeterincrementvalue = undefined;
            clockmeter= 0;
            document.querySelector(".progress-circle-prog").style.strokeDasharray= `${0} 900`;

             document.querySelector('.progress-text p').textContent = "START";
            
            clearInterval(intervelid);
            setClock();
})




// eventlistner on clock type button
const clock = document.querySelectorAll(".button-container button");
for (let index = 0; index < clock.length; index++) {
    clock[index].addEventListener('click',(e) => {
        // setting the clock increment value to undefined so we can again set it in event listner on clock so that our progress bar can work according to new value and also setting progress bar value to 0
        clockmeterincrementvalue = undefined;
        clockmeter= 0;
        document.querySelector(".progress-circle-prog").style.strokeDasharray= `${0} 900`;

        let status = document.querySelector('.progress-text p').textContent;

         document.querySelector('.progress-text p').textContent = "START";
        
        //  audio getting played on button click in types of timers
         audio.play();

           console.log(e.target);
           removeActive(clock);
           clearInterval(intervelid);
           e.target.classList="active";   
           setClock();
           setColorStyle();
    })
}





// running clock pause and play and timer
document.querySelector(".clock-wrap").addEventListener('click',() =>{
   let status = document.querySelector('.progress-text p').textContent;
   if(status === "START"){
    document.querySelector('.progress-text p').textContent = "PAUSE";
   }
   else{
    document.querySelector('.progress-text p').textContent = "START";
   }


   if(clockmeterincrementvalue === undefined){
    clockmeterincrementvalue = 800 /  ( Number.parseInt(document.querySelector(".progress-text h2").textContent) * 60 );
   }
   


   if(status == "START"){
   
       let end = Date.now() + (Number.parseInt(document.querySelector(".progress-text h2").textContent) * 60000) ;  
  
       intervelid = setInterval(() => {
        console.log(Date.now());

        if(Date.now() >= end){
          clearInterval(intervelid)
        }

        clockmeter = clockmeter + clockmeterincrementvalue;
        document.querySelector(".progress-text h2").textContent = ( Math.abs(end - Date.now()) / 60000).toFixed(2) ;
        document.querySelector(".progress-circle-prog").style.strokeDasharray= `${ clockmeter} 900`;
       
        if(document.querySelector(".progress-text h2").textContent == "0.00" ){
                setTimeout(() => {
                    alert("your timer has ended");
                   
        clockmeterincrementvalue = undefined;
        clockmeter= 0;
        document.querySelector(".progress-circle-prog").style.strokeDasharray= `${0} 900`;

        let status = document.querySelector('.progress-text p').textContent;

         document.querySelector('.progress-text p').textContent = "START";
        
       
           clearInterval(intervelid);  
           setClock();
           setColorStyle();
                }, 1000);
          }

      }, 1000);




   }
   else{
     clearInterval(intervelid);
     console.log("clearing the intervel");
   }



})