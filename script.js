
const WHATSAPP_NUMBER = "60103900481"; // Nombor WhatsApp Malaysia dalam format antarabangsa tanpa +
function sendWhatsApp(message){
  if(!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "MASUKKAN_NOMBOR_DI_SINI"){
    alert("Sila kemas kini WHATSAPP_NUMBER dalam kod HTML kepada nombor WhatsApp sebenar sebelum menerbitkan website.");
    return;
  }
  window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
}
document.querySelectorAll(".wa-link").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();sendWhatsApp("Assalamualaikum, saya ingin bertanya tentang servis mesin basuh atau peti sejuk di Kelantan.");}));
document.getElementById("bookingForm").addEventListener("submit",e=>{
  e.preventDefault();
  const nama=document.getElementById("nama").value.trim();
  const servis=document.getElementById("servisPilihan").value;
  const lokasi=document.getElementById("lokasiPelanggan").value.trim();
  const jenama=document.getElementById("jenama").value.trim()||"Tidak dinyatakan";
  const masalah=document.getElementById("masalah").value.trim();
  sendWhatsApp(`Assalamualaikum, saya ingin membuat pertanyaan/tempahan servis.\nNama: ${nama}\nServis: ${servis}\nLokasi: ${lokasi}, Kelantan\nJenama: ${jenama}\nMasalah: ${masalah}\nBoleh maklumkan ketersediaan dan anggaran kos?`);
});
document.getElementById("year").textContent=new Date().getFullYear();

/* Slideshow galeri */
(function(){
  const s=document.getElementById("slider"); if(!s) return;
  const track=s.querySelector(".track"), n=track.children.length, dotsEl=s.querySelector(".dots");
  let i=0, timer;
  const dots=[...Array(n)].map((_,k)=>{const b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Gambar "+(k+1));b.onclick=()=>{go(k);play();};dotsEl.appendChild(b);return b;});
  function go(k){i=(k+n)%n;track.style.transform="translateX(-"+i*100+"%)";dots.forEach((d,x)=>d.classList.toggle("on",x===i));}
  function play(){clearInterval(timer);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)timer=setInterval(()=>go(i+1),4500);}
  s.querySelector(".prev").onclick=()=>{go(i-1);play();};
  s.querySelector(".next").onclick=()=>{go(i+1);play();};
  s.addEventListener("mouseenter",()=>clearInterval(timer));s.addEventListener("mouseleave",play);
  let x0=null;
  s.addEventListener("touchstart",e=>{x0=e.touches[0].clientX;clearInterval(timer);},{passive:true});
  s.addEventListener("touchend",e=>{if(x0!==null){const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(i+(d<0?1:-1));x0=null;}play();});
  s.setAttribute("tabindex","0");s.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){go(i-1);play();}if(e.key==="ArrowRight"){go(i+1);play();}});
  go(0);play();
})();
