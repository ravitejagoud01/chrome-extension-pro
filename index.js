let myLeads = []
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el");
let deleteBtn = document.getElementById("delete-btn")
let saveBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveBtn.addEventListener("click", ()=> {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads){
    let string = ""
    for(let i = 0 ; i<leads.length ; i++){
        string+= `
            <li>
                <a target="_blank" href= "${leads[i]}">
                ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = string
}

deleteBtn.addEventListener("dblclick" , ()=> {
    localStorage.clear();
    myLeads=[]
    ulEl.innerHTML=""
})

inputbtn.addEventListener("click" , () =>{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))

    render(myLeads)
     
});

