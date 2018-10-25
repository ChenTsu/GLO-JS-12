let inputRub = document.getElementById('rub'),
  inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
  exchangeData()
    .then(json=>{
      console.log(json);
      inputUsd.value = inputRub.value / json.usd;})
    .catch(()=>{inputUsd.value = "Что-то пошло не так!";});
  
});

function exchangeData(data) {
  return new Promise((goodNews, badNews) => {
    let request = new XMLHttpRequest();
  
    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
  
    request.addEventListener('readystatechange', function () {
      if (request.readyState === 4 && request.status === 200) {
        let json = JSON.parse(request.response);
        goodNews(json);
      } else {
        badNews();
      }
    });
  });
}