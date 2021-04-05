let locationSelect = document.querySelector("#locationSelect");
locationSelect.addEventListener("change", renderLists);
let searchResult = document.querySelector("#searchResult");
let ticketLists = document.querySelector("#ticketLists");
let datas = [];
const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", insertData);
getData();
function insertData() {
    let data = {
        id: datas.length,
        name: document.querySelector("#ticketName").value,
        imgUrl: document.querySelector("#url").value,
        area: document.querySelector("#location").value,
        description: document.querySelector("#ticketDescription").value,
        group: parseInt(document.querySelector("#ticketNumber").value),
        price: parseInt(document.querySelector("#ticketPrice").value),
        rate: parseInt(document.querySelector("#ticketLevel").value)
    }
    if (checkData(data)) {
        datas.push(data);
    }
    cleanInput();
}
//新增完後刪除
function cleanInput() {
    document.querySelector("#ticketName").valu = "";
    document.querySelector("#url").value = "";
    document.querySelector("#location").value = "";
    document.querySelector("#ticketDescription").value = "";
    document.querySelector("#ticketNumber").value = "";
    document.querySelector("#ticketPrice").value = "";
    document.querySelector("#ticketLevel").value = "";
}
//顯示資料
function renderLists() {
    let html = "";
    let results = datas.filter(function (item) {
        if (locationSelect.value == "全部地區" || locationSelect.value == "") {

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

//檢查資料
function checkData(data) {

    let result = "";


    if (data.name.trim() == "") {
        result += "請填寫名稱\n";
    }
    if (data.imgUrl.trim() == "") {
        result += "請填寫網址\n";
    }
    if (data.area.trim() == "") {
        result += "請填寫地區\n";
    }
    if (isNaN(data.price)) {
        result += "請填寫金額\n";
    }
    if (isNaN(data.group)) {
        result += "請填寫數量\n";
    }
    if (isNaN(data.rate)) {
        result += "請填寫組數\n";
    }
    if (data.description.trim() == "") {
        result += "請填寫描述\n";
    }
    if (result != "") {
        alert(result);
        return false;
    }
    else {
        return true;
    }
}
//取得資料
function getData() {
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
        // 如果連接成功，可以用 then() 處理傳回來的值，以下程式碼將回傳結果儲存於 responce。
        .then(function (response) {
            datas = response.data.data;
            renderLists();
            renderDount();
        });
}
//圓餅圖
function renderDount() {
    let ary = [];
    let areaObj = {};
    //計算每個區域出現次數
    datas.forEach(function (item) {
        if (areaObj[item.area] == undefined) {
            areaObj[item.area] = 1;
        }
        else {
            areaObj[item.area] += 1;
        }
    });
    //將物件次數轉換成陣列
    const aryArea = Object.keys(areaObj);
    aryArea.forEach(function (item) {
        let newObj = [];
        newObj.push(item);
        let num = areaObj[item];
        newObj.push(num);

        ary.push(newObj);

    });
    var chart = c3.generate({
        size: {
            height: 176,
            width: 300
        },
        data: {
            labels: false,
            columns: ary,
            colors: {
                '台北': '#26C0C7',
                '台中': '#5151D3',
                '高雄': '#E68618'
            },
            type: 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            title: "套票地區比重",
            width: 15,
            label: {
                format: function (value) { return; }
            }
        },
        bindto: '#chart', // HTML 元素綁定
    });
}



