const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd; 
form.addEventListener('submit',(e)=>{

    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }

    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);

});

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

const fetchPrice= async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
     const price = r.data.coin.price;
     const volume  = r.data.coin.volume;
     const change = r.data.coin.priceChange1d;
     const base = r.data.coin.name;
     const target = 'USD';
    //  const time = r.data.timestamp;

     res.innerHTML =`<tr style="background-color:blue; color:white; font-weight:700">
     <td>
         Property
     </td>
     <td>Value</td>
 </tr>
 <tr style=" background-color:white; color:red; font-weight:700">
     <td>
         ${base}
     </td>
     <td>${price} ${target}</td>
 </tr>
 <tr style=" background-color:white; color:black;">
     <td>
         Volume
     </td>
     <td>${volume}</td>
 </tr>
 <tr style=" background-color:white; color:black;font-weight:bold">
     <td>
         Change
     </td>
     <td>${change}</td>
 </tr>
 `

    upd = setTimeout(()=>fetchPrice(ctype),10000);

}
