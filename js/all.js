let locationSelect = document.querySelector("#locationSelect");
locationSelect.addEventListener("change", changeTicketList);
let searchResult = document.querySelector("#searchResult");
let ticketLists = document.querySelector("#ticketLists");
const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", insertData);
function insertData() {
    let data = {
        "id": datas.length +1,
        "name": document.querySelector("#ticketName").value,
        "imgUrl": document.querySelector("#url").value,
        "area": document.querySelector("#location").value,
        "description": document.querySelector("#ticketDescription").value,
        "group": parseInt(document.querySelector("#ticketNumber").value),
        "price": parseInt(document.querySelector("#ticketPrice").value),
        "rate": parseInt(document.querySelector("#ticketLevel").value)
    }
    
    if(checkData(data))
    {
        datas.push(data);
    }

}
function changeTicketList() {
    let html = "";
    let results = datas.filter(function (item) {
        if (locationSelect.value == "全部地區") {
            return item.area;
        } else {
            return locationSelect.value == item.area;
        }
    });
    results.forEach(function (item) {
        html += `<li><div class="titcketLocation">${item.area}</div>
        <img src="${item.imgUrl}" alt="">
        <div class="titcketRating">${item.rate}</div>
            <div class="ticketContent">
                <h3 class="titcketHeader">${item.name}</h3>
                <p>${item.description}</p>
                <div class="titcketBottom">
                    <span><i class="fas fa-exclamation-circle"></i></span>
                    <h5>剩下最後 ${item.group} 組</h5>
                    <h5 class="titcketPrice ">TWD <span class="titcketPrice">$${item.price}</span></h5>
                </div>
            </div></li>`;

    });
    ticketLists.innerHTML = html;
    searchResult.textContent = `本次搜尋共 ${results.length} 筆資料`;
}
function checkData(data) {
    
    let result = "";

    
    if (data.name.trim() == "") {
        result += "請填寫名稱";
    }
    if (data.imgUrl.trim() == "") {
        result += "請填寫網址";
    }
    if (data.area.trim() == "") {
        result += "請填寫地區";
    }
    if (data.price == "") {
        result += "請填寫金額";
    }
    if (data.group == "") {
        result += "請填寫數量";
    }
    if (data.rate == "") {
        result += "請填寫組數";
    }
    if (data.description.trim() == "") {
        result += "請填寫描述";
    }
    if (result != "") {
        alert(result);
        return false;
    }
    else {
        return true;
    }
}
let datas = [
    {
        "id": 0,
        "name": "肥宅心碎賞櫻3日",
        "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        "area": "高雄",
        "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        "group": 87,
        "price": 1400,
        "rate": 10
    },
    {
        "id": 1,
        "name": "貓空纜車雙程票",
        "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台北",
        "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        "group": 99,
        "price": 240,
        "rate": 2
    },
    {
        "id": 2,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
    },
    {
        "id": 3,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
    }
];
/*
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
    // 如果連接成功，可以用 then() 處理傳回來的值，以下程式碼將回傳結果儲存於 responce。
  .then(function (response) {
    	console.log(response);
  });*/