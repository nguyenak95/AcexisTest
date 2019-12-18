let n = prompt("So dong can hien thi");
let m = prompt("So cot can hien thi");


//html
let header_col = "";
for (let i = 1; i <= m;i++){
    // make index to obtain when click
    header_col += `<th data-index=${i-1}>${i}</th>`
}
let html = `<tr class="hd">${header_col}</tr>`;

//row
// make an array for easy to sort, re-map everytime sort
html_array = [];
for (let i=0;i < n;i++){
    let row = [];
    for (let j=0;j< m;j++){
        row.push(rd());
    }
    html_array.push(row);
    row = [];
}


let tbl = document.getElementById("tbl");
tbl.innerHTML= reMapHTML(html_array);

let head = Array.from(document.querySelectorAll("th"));
head.forEach((th)=>th.addEventListener("click",reDisplay));
// head.addEventListener("click",reDisplay);

//random fucntion
function rd(){
    return Math.floor(Math.random()*1000) +1;
}


//maping array function
function reMapHTML(_array){
    let array =[..._array];
    //map number to <td>number</td>
    array = array.map((row)=>{
        return row.map((value) => `<td>${value}</td>`);
    })
    //map child array to child string;
    array = array.map((row)=>{
        return `<tr>${row.join("")}</tr>`;
    })
    return html + array.join("");
}


//redisplay everytime click(sort)
function reDisplay(e){
    let id = parseInt(e.target.dataset.index);
    // if a[id]<b[id] so a come first
    html_array.sort((a,b)=>{
        if (a[id] < b[id]){
            return -1;
        }
        else return 1;
    })
    tbl.innerHTML = reMapHTML(html_array);

    // reAdd event after re-render
    let head = Array.from(document.querySelectorAll("th"));
	head.forEach(th => th.addEventListener("click", reDisplay));
}