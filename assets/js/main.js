let ctaVisible;
 
 const header = document.querySelector('header')
 const pellets = Array.from(document.querySelectorAll('[data-pellet]'))

 
 let prevScroll=0;

 window.addEventListener('scroll',()=>{
    
     
  

    if(pageYOffset<10){
            deactivate(header);
    }else{
            activate(header);
    }



    if(ctaVisible){

      animatePellets(pageYOffset/100,pageYOffset/20)
    }
 
    
 })

 
const cta = document.querySelector('#cta')
 

 
 let observer = new IntersectionObserver(entries=>{

   ctaVisible = entries[0].isIntersecting 
 
   console.log(ctaVisible)
 
 });

 observer.observe(cta);


 function animatePellets(progress,rotation){
   pellets.forEach(pellet => {
      let dir = pellet.getAttribute('data-pellet-direction')
      pellet.style.transform = `translateY(${progress*6*dir}px) rotate(${rotation*dir}deg)`
      
  });
 }

 const regexps = {
   email:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
   name:'',
   phone:'', 
 }

const forms = document.querySelectorAll('[data-form]');
 

Array.from(forms).forEach(form=>{
      const submitBtn = form.querySelector('[data-form-submit-btn]')
      
      submitBtn.addEventListener('click',()=>{
         validateForm(form);
      })
})

function validateForm(form){
   form.classList.remove('success')
   let errs = 0;
   const formFeedback = form.querySelector('[data-form-feedback]');
   const inputs = form.querySelectorAll('[data-form-validate]')

   Array.from(inputs).forEach(input=>{
       if(!validateInput(input)){
        errs++
       }
    })

    if(errs>0){
       
    }
    else{
      Array.from(inputs).forEach(input=>{
         input.querySelector('[data-form-input]').value=""
      })

      form.classList.add('success');
      setTimeout(()=>{
         form.classList.remove('success');
      },2000)
      ////send ajax,axios..
    }
}
 function validateInput(i){
   const feedback = i.querySelector('[data-form-input-feedback]')
   let input = i.querySelector('[data-form-input]')
   let inputType = input.getAttribute('data-form-input')
   
   
   feedback.classList.remove('active','success','fail')
 
   if(!input.value.match(regexps[inputType])){
     feedback.classList.add('active','fail')
     return false;
   } else{
      feedback.classList.remove('active','fail')
      return true;
   }
 
 }


 const togglers = Array.from(document.querySelectorAll('[data-vs-toggler]'));

 togglers.forEach(toggler=>{

   const target = document.querySelector(toggler.getAttribute('data-vs-toggler'))
   toggler.addEventListener('click',()=>{
      toggle(target)
   })
 })


function toggle(element){
    if(element.classList.contains('active')){
      element.classList.remove('active');
    }else{
      element.classList.add('active');
    }
}

 function deactivate(element,newState){
   element.classList.remove('active')
    
}
function activate(element){
  
   element.classList.add('active')
}