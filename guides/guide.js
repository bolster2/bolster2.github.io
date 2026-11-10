// copy buttons
document.querySelectorAll('pre').forEach(pre=>{
  const wrap=document.createElement('div');wrap.className='cb';
  const fn=pre.dataset.file;
  pre.parentNode.insertBefore(wrap,pre);
  if(fn){const f=document.createElement('div');f.className='fn';f.textContent=fn;wrap.appendChild(f)}
  wrap.appendChild(pre);
  const b=document.createElement('button');b.className='copy';b.textContent='Copy';
  b.onclick=()=>{navigator.clipboard.writeText(pre.innerText).then(()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1400)})};
  wrap.appendChild(b);
});
// scroll progress
const prog=document.getElementById('prog');
addEventListener('scroll',()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
// particle background
const cv=document.getElementById('bg'),cx=cv.getContext('2d');let W,H,P=[];
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(60,Math.floor(W*H/22000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
rs();addEventListener('resize',rs);
(function draw(){cx.clearRect(0,0,W,H);
 const g=cx.createRadialGradient(W*.8,H*.1,0,W*.8,H*.1,W*.6);g.addColorStop(0,'rgba(124,92,255,.15)');g.addColorStop(1,'transparent');cx.fillStyle=g;cx.fillRect(0,0,W,H);
 P.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
  cx.beginPath();cx.arc(p.x,p.y,1.4,0,6.3);cx.fillStyle='rgba(76,201,240,.7)';cx.fill();
  for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){cx.strokeStyle=`rgba(124,92,255,${.22*(1-d/120)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}});
 requestAnimationFrame(draw)})();
