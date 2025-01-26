let myLinks = []
let inputEl = document.getElementById("input-el")
const linkBtn = document.getElementById('link-btn')
const tabBtn = document.getElementById('tab-btn')
const delBtn = document.getElementById('del-btn')
let linkEl = document.getElementById('links-el')
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))


if(linksFromLocalStorage){
    myLinks = linksFromLocalStorage
    render(myLinks)
}

linkBtn.addEventListener('click', ()=>{
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem('myLinks', JSON.stringify(myLinks))
    render(myLinks)
})

tabBtn.addEventListener('click', ()=>{
    chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks",JSON.stringify(myLinks))
        render(myLinks)
    })
})

delBtn.addEventListener('dblclick', ()=>{
    localStorage.clear()
    myLinks = []
    render(myLinks)
})
function render(links){
    let linkList = ''
for(let i = 0; i < links.length; i++){
    linkList += `<li><a href = '${links[i]}' target= '_blank'>${links[i]}</a></li>`
}
linkEl.innerHTML = linkList

}