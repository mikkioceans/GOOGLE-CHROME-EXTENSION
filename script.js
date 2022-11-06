let inputEl = document.querySelector("#inputEl")
let saveBtn = document.querySelector(".saveBtn");
let ulElements = document.querySelector(".list-items")
let deleteBtn = document.querySelector(".delete-btn")
let saveUrlBtn = document.querySelector(".save-url")

deleteBtn.addEventListener("click", ()=> {
    
    notesStorage = [];
    notes = [];
     add = "";
    
    localStorage.clear();
    addLinks();
})
// SAVE BTN IS WHERE THE CHROME API STARTS WORKING WITH THE CUREENT URL
saveUrlBtn.addEventListener("click", ()=>{
    chrome.tabs.query({/*CHROME API WORKING TO GET THE EXACT TAB THATS CURRENT, IT FETCHES THE URL*/active: true, currentWindow: true}, function(tabs){
        notes.push(tabs[0].url)
       /*AS ALWAYS ALL ARRAYS MUST BE STRINGIFIED*/  localStorage.setItem("notes", JSON.stringify(notes) )
        addLinks();
    })
    
})

let notes = [];
// Use JSON PARSE(NOTES) TO TURN INTO ARRAY
let notesStorage = JSON.parse(localStorage.getItem("notes"))

if(notesStorage) {
    
    notes = notesStorage;
    addLinks();
}

saveBtn.addEventListener("click", () => {
    
notes.push(inputEl.value)
/* LOCAL STORAGE PREVENTS DELETION OF RENDERED CONTENTS AFTER REFRESH, 
JSON FILS ARE ALWAYS STRINGS, YOU MUST STRINGIFY YOUR ARRAYS*/localStorage.setItem("notes", JSON.stringify(notes));

addLinks();
inputEl.value = "";
})

function addLinks(){
    let add = "";
    for(let i = 0; i < notes.length; i++){
     /* YOU CAN USE INNERHTML TO PRINT OUT EXACT HTML 
     CONTENTS, ANCHORS - H1-H6 ETC. */   add += `<li><a target="_blank" href="${notes[i]}"> ${notes[i]} </li>`
    }
    ulElements.innerHTML = add;
}

