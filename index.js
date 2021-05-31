function calc(){
    var s = 100;    // scale
    // 화면에 보여지는 값들
    var tankWidth =document.getElementById("tank-width").value ;
    var tankHeight = document.getElementById("tank-height").value ; 
    var tankDepth = document.getElementById("tank-depth").value;
    var tankSand = document.getElementById("tank-sand").value;
    var waterLevel = document.getElementById("water-level").value;
    var tankWeight = document.getElementById("tank-weight").value;
    // 물양 계산에 사용되는 값들
    var tankWidth2 = tankWidth;
    var tankHeight2 = tankHeight;
    var tankDepth2 = tankDepth;
    var tankSand2 = tankSand;
    var waterLevel2 = waterLevel;
    var min = Math.min(tankWidth,tankDepth,tankHeight)
    tankWidth = (tankWidth/min)*s;
    tankHeight = (tankHeight/min)*s;
    tankDepth = (tankDepth/min)*s;
    tankSand = (tankSand/min)*s;
    waterLevel = (waterLevel/min)*s
    if(Math.max(tankWidth,tankDepth,tankHeight)>200){
        var scale = 200/Math.max(tankWidth,tankDepth,tankHeight);
        tankWidth *= scale;
        tankDepth *= scale;
        tankHeight *= scale;
        tankSand *= scale;
        waterLevel *= scale;
    }

    var front = document.getElementById("front");
    var back = document.getElementById("back");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var top = document.getElementById("top");
    var bottom = document.getElementById("bottom");
    var checkbox = document.getElementById("checkbox");
    var tankArr = [front,back,left,right,top,bottom]
    for (const key in tankArr){
        tankArr[key].innerHTML = "";
    }
    if (tankSand != ""){
        

        var sand =`<div style='width:100%; height:${tankSand}px;position:absolute;bottom:0;background-color:rgba(150, 96, 29, 0.714);margin:0px'></div>`;
        front.innerHTML = sand;

        left.innerHTML = sand;
        right.innerHTML=sand;
        back.innerHTML = `<div style='width:100%; height:${tankSand}px;position:absolute;top:0;background-color:rgba(150, 96, 29, 0.714);margin:0px'></div>`;

        
    }
    if (waterLevel != ""){

        var sand =`<div style='width:100%; height:${waterLevel}px;position:absolute;top:0;background-color:rgba(255, 255, 255, 0.714);margin:0px'></div>`;
        front.innerHTML += sand;
        left.innerHTML += sand;
        right.innerHTML += sand;
        back.innerHTML += `<div style='width:100%; height:${waterLevel}px;position:absolute;bottom:0;background-color:rgba(255, 255, 255, 0.714);margin:0px'></div>`;
        
    }

    var banner = document.createElement("b");
    var textNode = document.createTextNode("fishhi.kr");
    banner.setAttribute("style","color:whitesmoke");
    banner.appendChild(textNode);
    front.appendChild(banner);
    
    front.style.width = tankWidth + 'px';
    front.style.height = tankHeight + 'px';
    front.style.transform = '';
    front.style.transform = 'translateZ(' + (tankDepth/2) +'px)';
    back.style.width = tankWidth + 'px';
    back.style.transform = 'rotate(-180deg) translateZ(' + -(tankDepth/2) +'px)';
    back.style.height = tankHeight + 'px';
    left.style.width = tankDepth + 'px';
    left.style.transform = 'translateX(' + -((tankDepth/2)) +'px) rotateY(90deg)';
    // left.setAttribute("transform",`translateX(-${tankDepth}px) rotateY(190deg)`);
    left.style.height = tankHeight + 'px';
    right.style.width = tankDepth + 'px';
    right.style.height = tankHeight + 'px';
    right.style.transform = 'translateX(' +  (tankWidth - tankDepth + tankDepth/2) +'px) rotateY(90deg)';
    top.style.width = tankWidth + 'px';
    top.style.height = tankDepth + 'px';
    top.style.transform = 'translateY(' + -(tankDepth/2) + 'px) rotateX(90deg)';
    bottom.style.width = tankWidth + 'px';
    bottom.style.height = tankDepth + 'px';
    bottom.style.transform = 'translateY(' + (tankHeight - tankDepth + tankDepth/2) + 'px) rotateX(90deg)';

    var containerWidth = document.querySelector('.tank-container').clientWidth;
    var containerHeight = document.querySelector('.tank-container').clientHeight;
    var face = document.querySelectorAll('.face');

    // alert();

    face.forEach(
        (el) =>{
            if(tankWidth>tankDepth){
                el.style.left = (containerWidth/2) - (front.clientWidth/2);
            }
            else if(tankWidth<tankDepth){
                el.style.left = (containerWidth - Math.min(front.clientWidth,right.clientWidth))/2;
            }
            else{
                el.style.left = (containerWidth - Math.min(front.clientWidth,right.clientWidth))/2;
            }
            
            el.style.top = (containerHeight -front.clientHeight)/2;
        }
        
        );
    let mytank = tankWidth2 * tankDepth2 * tankHeight2/1000;
    var capacity = document.getElementById('calc-capacity') ;
    if (checkbox.checked){
        var x = (((tankWidth2*10 * tankHeight2 * 10 * tankWeight * 2.5) /1000000) * 2);
        var y = (((tankHeight2*10 * ((tankDepth2 * 10)-tankWeight*2) * tankWeight * 2.5) /1000000) * 2);
        var z = ((((tankWidth2*10) - tankWeight*2) * ((tankDepth2 * 10)-tankWeight*2) * tankWeight * 2.5) /1000000);
        var sum = x+y+z;

        tankWidth2 -= tankWeight / 5;
        tankDepth2 -= tankWeight / 5;
        mytank = tankWidth2 * tankDepth2 * (tankHeight2-tankSand2-waterLevel2-tankWeight/10)/1000;
        capacity.innerHTML = `수조의 물 용량은 약 <b>${mytank.toFixed(2)}L</b><br>`
        capacity.innerHTML += `어항의 무게는 약 <b>${sum.toFixed(2)}kg</b>`;
    }else{
        capacity.innerHTML = `수조의 물 용량은 약 <b>${mytank.toFixed(2)}L</b>`
    }
    fetch('https://pannchat.github.io/supplies_product.json')
    .then((res) => res.json())
    .then((data) => {
    data.item.forEach(el => {
        document.getElementById('item-'+el.id).innerHTML = `${(mytank/el.recommendedUsage1*el.recommendedUsage2).toFixed(2)}cc`;
    });
});
}
            
checkbox.addEventListener('change', function() {
    var detail = document.getElementById('detailed');
    if(this.checked){
        detail.style.display="block";
    }else{
        detail.style.display="none";
        Level.value = '';
        Weight.value= '';
        Sand.value='';
    }
})


const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".md_overlay");
const img = document.getElementById('modal-image');



const openModal = (id) =>{
    
    fetch('https://pannchat.github.io/supplies_product_detail.json')
    .then((res)=> res.json())
    .then((data) =>{
        items = data.item;
        item = items.filter((e) =>{
            return(e.fid === id);
        });
        img.src = './thumbnails/detail/' + item[0].descriptionImage;
        modal.classList.remove("hidden");
    });
    
};


const closeModal = () => {
    modal.classList.add("hidden");
}


closeBtn.addEventListener("click", closeModal); 

function tooltip(){
    document.getElementById('tooltip').className='show';
    setTimeout(() => {
        document.getElementById('tooltip').classList.remove('show')
    }, 3000);

    var url = document.getElementById('url');
    url.innerText = `http://fishhi.kr`;

    var range = document.createRange();
    range.selectNode(url.childNodes[0]);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
    sel.removeRange(range);
}


fetch('https://pannchat.github.io/supplies_product.json')
.then((res) => res.json())
.then((data) => {
    var searchContainer = document.getElementById('search-container');
    let elList= ''; 

    data.item.forEach((el, index) => {

    //     var listNode = document.createElement("li");
    //     listNode.setAttribute("class","search-list");

        

    //     var img = document.createElement("img");
    //     img.setAttribute("src",el.img);
    //     img.setAttribute("class","supplies-product-img");

    //     var div = document.createElement("div")

    //     listNode.appendChild(img);
    //     listNode.appendChild(div);

    //     searchContainer.appendChild(listNode);   
    //     var para = document.createElement("p");
    //     var node = document.createTextNode(el.productName);
    //                         var bold = document.createElement("b");
    //     var boldText = document.createTextNode("?");
    //     var calcNode = document.createTextNode(`권장 사용량 : ${el.recommendedUsage1}L 당 ${el.recommendedUsage2}cc`);
    //     var link = document.createElement("a");

    //     bold.appendChild(boldText);
    //     link.setAttribute("href","#");
    //     link.setAttribute("onclick",`openModal(${el.id})`);
    //     link.setAttribute("class","open");
    //     link.appendChild(document.createTextNode("상세 설명서 보기"));
    //     para.appendChild(node);
    //     div.appendChild(para);
    //     div.appendChild(calcNode + bold);
    //     div.appendChild(bold);
    //     div.appendChild(link);
        elList += `
        <li class="search-list">
        <img src="./thumbnails/${el.img}" class="supplies-product-img">
        <div style="">
            <p style="">${el.productName}</p>
            권장 사용량 : ${el.recommendedUsage1}L 당 ${el.recommendedUsage2}cc<br>
            내 어항 사용량 : <b id="item-${el.id}">?</b> 권장<br>
            <a onclick="openModal(${el.id})" class="open">상세 설명서 보기</a>
        </div>
        </li>`;
    });
    
    searchContainer.innerHTML = elList;
});