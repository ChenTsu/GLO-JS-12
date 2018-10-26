let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
  exchangeData()
    // .then(json => {inputUsd.value = json;})
    .then((json)=>{
      console.log(json);
      if (!json){
        inputUsd.value = 'loading';
      }else {
        inputUsd.value = inputRub.value / json.usd;
      }
    })
    .catch(()=>{inputUsd.value = "Что-то пошло не так!";});
  
});

function exchangeData(data) {
  return new Promise((goodNews, badNews) => {
    let request = new XMLHttpRequest();
  
    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
  
    request.addEventListener('readystatechange', () =>{
      if (request.readyState < 4){
        // goodNews();
        // goodNews('loading');
      } else if (request.readyState === 4 && request.status === 200){
        goodNews( JSON.parse(request.responseText) );
      } else {
        badNews();
      }
    });
  });
}