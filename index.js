'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
  
  /////////////////  modal popup  ///////////////////////
  let more            = document.body.getElementsByClassName('more')[0],
      overlay         = document.body.getElementsByClassName('overlay')[0],
      close           = document.body.getElementsByClassName('popup-close')[0],
      descriptionBtns = document.body.getElementsByClassName('description-btn');
  
  let msg = {
    loading: '<div style="color: wheat; line-height: 2;"><span>Loading....</span><img src="icons/tenor.gif" style="vertical-align: middle;" alt="" width="20" /> </div>',
    success: '<div style="color: greenyellow; line-height: 2;"><spn>Data sent successfully</spn><img src="icons/checked.png" width="20" style="vertical-align: middle;" alt=""></div>',
    fail:    '<div style="color: red; line-height: 2;" ><span>something wrong... jo_Oj</span><img src="icons/explosion.png" width="20" style="vertical-align: middle;" alt=""></div>'
  };
  
  let statusMsg = document.createElement('div');
  
  function showModalPopup (){
    overlay.style.display = 'block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  }
  
  more.addEventListener('click', showModalPopup);
  
  for (let i=0; i<descriptionBtns.length; i++){
    descriptionBtns[i].addEventListener('click', showModalPopup);
  }
  
  close.addEventListener('click', evt => {
    overlay.style.display = 'none';
    more.classList.remove('more-spalsh');
    document.body.style.overflow = '';
  });
  
  
  function sendFormData(data){
    return new Promise( (goodNews, badNews)=>{
      let request = new XMLHttpRequest();
    
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
      request.send(data);
    
      request.addEventListener('readystatechange', () =>{
        if (request.readyState < 4){
          goodNews();
        } else if (request.readyState === 4){
          goodNews();
        } else {
          badNews(msg.fail);
        }
      });
    } );
  }
  
  /////////////////   AJAX save popup form data  ///////////////////////
  let popupForm = document.querySelector('.main-form');
  
  popupForm.addEventListener('submit', evt =>{
    evt.preventDefault();
    popupForm.appendChild(statusMsg);

    sendFormData(popupForm)
      .then(()=>{ statusMsg.innerHTML = msg.loading; })
      .then(()=>{ statusMsg.innerHTML = msg.success; })
      .catch(()=>{ statusMsg.innerHTML = msg.fail; });
    
    
    [].forEach.call(popupForm.getElementsByTagName('input'), (el =>{ el.value = ''; }));
    setTimeout(()=>{ popupForm.lastChild.remove(); }, 5000);
  });
  
  
  /////////////////   AJAX save contact form data  ///////////////////////
  let contactForm = document.getElementById('form');
  
  contactForm.addEventListener('submit', evt =>{
    evt.preventDefault();
    contactForm.appendChild(statusMsg);
    
    sendFormData( new FormData(contactForm) )
      .then(()=>{ statusMsg.innerHTML = msg.loading; })
      .then(()=>{ statusMsg.innerHTML = msg.success; })
      .catch(()=>{ statusMsg.innerHTML = msg.fail; });
    
    [].forEach.call(contactForm.getElementsByTagName('input'), (el =>{ el.value = ''; }));
    setTimeout(()=>{ popupForm.lastChild.remove(); }, 5000);
  });
  
  
  /////////////////   validate tel inputs  ///////////////////////
  let tels = document.querySelectorAll('input[type="tel"]');
  
  [].forEach.call(tels, (el =>{
    el.addEventListener('input', evt =>{
      if ( !el.oldValue ) {el.oldValue = '';} // в js всё объекты, так что лепим свои свойства
      
      if ( /^\+?[()\d \-]*$/.test(el.value) || el.value === '' ){ // example: '+7(323) 343-34-65' , '8-333 343-55-12'
        el.oldValue = el.value;
        // el.classList.remove(':invalid');
      } else {
        el.value = el.oldValue;
        // el.classList.add(':invalid');
      }
    });
  }));
  
});