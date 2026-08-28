document.addEventListener("DOMContentLoaded",()=>{const menu=document.querySelector(".menu"),links=document.querySelector(".links");if(menu&&links)menu.onclick=()=>links.classList.toggle("open");const path=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".links a").forEach(a=>{const h=a.getAttribute("href");if(h===path||(path===""&&h==="index.html"))a.classList.add("active")});const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("show")),{threshold:.12});document.querySelectorAll(".reveal").forEach(x=>io.observe(x));document.querySelectorAll("[data-count]").forEach(el=>{let target=+el.dataset.count,done=false;let ob=new IntersectionObserver(es=>{if(!es[0].isIntersecting||done)return;done=true;let n=0,step=Math.max(1,Math.ceil(target/45));let t=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n+(el.dataset.suffix||"");if(n===target)clearInterval(t)},22);ob.disconnect()});ob.observe(el)});document.querySelectorAll(".tilt").forEach(card=>{card.addEventListener("pointermove",e=>{if(innerWidth<900)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-5px)`});card.addEventListener("pointerleave",()=>{card.style.transform=""})});});
/* ScoreX feedback form: opens the visitor's email client with a complete message. */
(function(){
  const form=document.getElementById('feedbackForm');
  if(!form)return;
  const status=document.getElementById('formStatus');
  const officialEmail='scorex.feedback@gmail.com';
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const name=document.getElementById('senderName').value.trim();
    const email=document.getElementById('senderEmail').value.trim();
    const topic=document.getElementById('topic').value;
    const message=document.getElementById('message').value.trim();
    if(!name||!email||!topic||!message){
      status.textContent='Please complete all fields before sending.';
      return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      status.textContent='Please enter a valid email address.';
      return;
    }
    const subject='ScoreX Website — '+topic;
    const body=[
      'Hello ScoreX Team,','',
      'Name: '+name,
      'Email: '+email,
      'Topic: '+topic,'',
      'Message:',
      message,'','— Sent from the ScoreX website'
    ].join('\n');
    status.textContent='Opening your email application…';
    window.location.href='mailto:'+officialEmail+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  });
})();

/* Gentle 3D tilt for the feedback form and dark developer rows. */
(function(){
  if(window.innerWidth<900)return;
  document.querySelectorAll('.feedback-form,.dark-person').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      const depth=el.classList.contains('feedback-form')?4:2.5;
      el.style.transform=`perspective(1100px) rotateX(${(-y*depth).toFixed(2)}deg) rotateY(${(x*depth).toFixed(2)}deg) translateZ(2px)`;
    });
    el.addEventListener('pointerleave',()=>{el.style.transform='';});
  });
})();
