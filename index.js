const $ = s=> document.querySelector(s);
const $$ = s=> document.querySelectorAll(s);

const barContainer = $(".bars")


function addBars(totalBars = 20){
    let arrayOfRandomHeights = [];
    if(barContainer.hasChildNodes()){
        barContainer.innerHTML = '';
    }
    for(let i=0; i < totalBars; i++ ){
        arrayOfRandomHeights.push(Math.floor(Math.random() * 250)+ 1);
        const bar = document.createElement("div");
        bar.style.height = `${arrayOfRandomHeights[i] * 2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`bar-number-${i}`);
        barContainer.appendChild(bar)
    }
};



function swap(el1, el2) {    
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
}

function waitForMe(milisecs){
    return new Promise(resolve => {
        setTimeout(()=> resolve(''),milisecs)
    })
}


async function bubble() {
    const ele = $$(".bar");    
    for(let i = 0; i < ele.length-1; i++){    
        for(let j = 0; j < ele.length-i-1; j++){   
            ele[j].style.background = 'blue';
            ele[j+1].style.background = 'blue';
            if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)){
                await waitForMe(speed.value)
                swap(ele[j], ele[j+1]);
            }
            ele[j].style.background = 'cyan';
    
            ele[j+1].style.background = 'cyan';
    
        }
    
        ele[ele.length-1-i].style.background = 'green';
    
    }
    
    ele[0].style.background = 'green';

}

function clearArray(){
    const bar = $$(".bar")
    for(let i = 0; i < bar.length; i++){
        $('.bars').removeChild(bar[i]);
    }
}

function getNewArray(){
    clearArray();
    addBars(range.value);
}


async function selectionSort(){
    const ele = $$(".bar");
    for(let i=0; i< ele.length; i++){
        let min = i;
        for(let j=i+1; j< ele.length; j++){
            ele[j].style.background = 'blue';
            if(parseInt(ele[j].style.height) < parseInt(ele[min].style.height)){
                min = j;
            }
            ele[j].style.background = 'cyan';
        }
        if(min !== i){
            await waitForMe(speed.value)
            swap(ele[i], ele[min]);
        }
        ele[i].style.background = 'green';
    }
}

// async function mergeSort(){
//     const ele = $$(".bar");
//     let arr = [];
//     for(let i=0; i< ele.length; i++){
//         arr.push(parseInt(ele[i].style.height));
//         await waitForMe(speed.value)
//     }
//     arr = mergeSortHelper(arr);
//     for(let i=0; i< ele.length; i++){
//         ele[i].style.height = `${arr[i] * 1}px`;
//     }
// }

// function mergeSortHelper(arr){
//     if(arr.length === 1){
//         return arr;
//     }
//     let mid = Math.floor(arr.length/2);
//     let left = mergeSortHelper(arr.slice(0,mid));
//     let right = mergeSortHelper(arr.slice(mid));
//     return mergeSortHelper(left, right);
// }

// function mergeSortHelper(arr){
//     if(arr.length === 1){
//         return arr;
//     }
//     let mid = Math.floor(arr.length/2);
//     let left = mergeSortHelper(arr.slice(0,mid));
//     let right = mergeSortHelper(arr.slice(mid));
//     return mergeSortHelper(left, right);
// }
// function mergeSort(){
//     const ele = $$(".bar");
//     let arr = [];
//     for(let i=0; i< ele.length; i++){
//         arr.push(parseInt(ele[i].style.height));
//     }
//     arr = mergeSortHelper(arr);
//     for(let i=0; i< ele.length; i++){
//         ele[i].style.height = `${arr[i] * 2}px`;
//     }

// }



async function quickSort(){
    const ele = $$(".bar");
    let arr = [];
    for(let i=0; i< ele.length; i++){
        arr.push(parseInt(ele[i].style.height));
        ele[i].style.background = 'red'
    }

    arr = quickSortHelper(arr);

    for(let i=0; i< ele.length; i++){
        await waitForMe(speed.value)
        ele[i].style.background = 'green'
        ele[i].style.height = `${arr[i] * 1}px`;
    }
}

function quickSortHelper(arr){
    if(arr.length <= 1){
        return arr;
    }
    let pivot = arr[0];
    let left = [];
    let right = [];
    for(let i=1; i< arr.length; i++){
        if(arr[i] < pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSortHelper(left).concat(pivot, quickSortHelper(right));
}


async function insertionSort(){
    const ele = $$(".bar");
    for(let i=1; i < ele.length; i++){
        let j = i-1;
        while(j>=0 && parseInt(ele[j].style.height) > parseInt(ele[i].style.height)){
            ele[j].style.background = 'red';
            ele[i].style.background = 'red';
            await waitForMe(speed.value)
            swap(ele[j], ele[i]);
            j--;
        }
        ele[i].style.background = 'green';
    }
}



//INSERTION SORT NEEDS TO RUN UNTILL WHOLE ARRAY IS SORTED

const range = $("#range");
const rangeText = $("#rangeText");

range.addEventListener("change",()=>{
    addValueToRange(rangeText,range)
    addBars(range.value)
})

function addValueToRange(text,range){
    text.innerText = range.value;
}

window.onload = ()=>{
    addValueToRange(rangeText,range)
    addValueToRange(speedText,speed)
    addBars(range.value)
}

const speed = $("#speed");
const speedText = $("#speedText");

speed.addEventListener("change",()=>{
    addValueToRange(speedText,speed);
})



// async function insertionSort(){
//     //Start from the second element.
//     const ele = $$(".bar");
//     for(let i = 1; i < ele.length;i++){

//         //Go through the elements behind it.
//         for(let j = i - 1; j > -1; j--){
//             ele[j].style.background = 'red';
//             ele[i].style.background = 'red';
//             await waitForMe(10)
//             //value comparison using ascending order.
//             if(ele[j + 1].style.height < ele[j].style.height){

//                 //swap
//                 [ele[j+1].style.height,ele[j].style.height] = [ele[j].style.height,ele[j + 1].style.height];

//             }
//         }
//         ele[i].style.background = 'green';

//     };
// }

// async function insertionSort(){
//     const ele = $$(".bar");
//     for(let i = 1; i < ele.length; i++){
//         let temp = ele[i].style.height;
//         let j = i - 1;
//         while(j >= 0 && ele[j].style.height > temp){
//             await waitForMe(50);
//             ele[j].style.background = 'red';
//             ele[i].style.background = 'red';
//             ele[j + 1].style.height = ele[j].style.height;
//             j--;
//         }
//         ele[j + 1].style.height = temp;
//         ele[i].style.background = 'green';

//     }
// }
