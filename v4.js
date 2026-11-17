(function TinyWinsV4(window){
 "use strict";
 const accents={
  lilac:{light:"#7465db",dark:"#b7a9ff",washLight:"#efedff",washDark:"#302d4a",name:"Lilac"},
  ocean:{light:"#247bac",dark:"#7dc9ff",washLight:"#e7f4fc",washDark:"#213748",name:"Ocean"},
  mint:{light:"#2f8a73",dark:"#73d7b5",washLight:"#e7f6ef",washDark:"#203b34",name:"Mint"},
  coral:{light:"#c76a50",dark:"#ffac90",washLight:"#fff0e8",washDark:"#442e2a",name:"Coral"},
  rose:{light:"#b85486",dark:"#f4a2c8",washLight:"#fdecf5",washDark:"#422b3c",name:"Rose"},
  gold:{light:"#a7772f",dark:"#f0c880",washLight:"#fff5df",washDark:"#413627",name:"Honey"},
  slate:{light:"#546a81",dark:"#acbed4",washLight:"#edf2f6",washDark:"#293747",name:"Slate"}
 };
 const backgrounds=["none","sky","peach","sage","sunset","night","photo"];
 const labels={
  en:{
   viewMatrix:"Matrix",matrixIntro:"Sort by importance and urgency—not everything needs to happen now.",
   matrixQ1:"Do first",matrixQ1Sub:"Important & urgent",
   matrixQ2:"Schedule",matrixQ2Sub:"Important, not urgent",
   matrixQ3:"Delegate or simplify",matrixQ3Sub:"Urgent, less important",
   matrixQ4:"Later or let go",matrixQ4Sub:"Neither urgent nor important",
   urgent:"Urgent",important:"Important",matrixEmpty:"No tasks here yet",
   appearanceTitle:"Make TinyWins yours",accentTitle:"Color theme",backgroundTitle:"Background",
   backgroundNotes:"Your background and colors stay on this device. Photos are not uploaded.",
   addPhoto:"Use a photo",removePhoto:"Remove photo",photoError:"Could not load that image",photoLarge:"Please choose a smaller image (12 MB max).",
   accentLilac:"Lilac",accentOcean:"Ocean",accentMint:"Mint",accentCoral:"Coral",accentRose:"Rose",accentGold:"Honey",accentSlate:"Slate",
   bgNone:"Clean",bgSky:"Sky",bgPeach:"Peach",bgSage:"Sage",bgSunset:"Sunset",bgNight:"Midnight",bgPhoto:"My photo",
   tourMatrixTitle:"Decide what matters",tourMatrixCopy:"Use the Eisenhower Matrix to separate important tasks from urgent ones. Tick both labels when editing a task.",
   tourAppearanceTitle:"A look that fits you",tourAppearanceCopy:"In Settings, pick a color theme, background gradient or your own photo. Every person can choose a different look.",
   versionName:"TinyWins v4"
  },
  he:{
   viewMatrix:"מטריצה",matrixIntro:"מסדרים לפי חשיבות ודחיפות — לא הכול חייב לקרות עכשיו.",
   matrixQ1:"לעשות עכשיו",matrixQ1Sub:"חשוב ודחוף",
   matrixQ2:"לתכנן",matrixQ2Sub:"חשוב, לא דחוף",
   matrixQ3:"להעביר או לפשט",matrixQ3Sub:"דחוף, פחות חשוב",
   matrixQ4:"לאחר כך או לוותר",matrixQ4Sub:"לא דחוף ולא חשוב",
   urgent:"דחוף",important:"חשוב",matrixEmpty:"אין כאן משימות כרגע",
   appearanceTitle:"TinyWins בסגנון שלכם",accentTitle:"צבע האפליקציה",backgroundTitle:"רקע",
   backgroundNotes:"הרקע והצבעים נשמרים במכשיר הזה. תמונות אישיות לא מועלות לאינטרנט.",
   addPhoto:"בחירת תמונה",removePhoto:"הסרת תמונה",photoError:"לא הצלחנו לפתוח את התמונה",photoLarge:"בחרו תמונה קטנה יותר (עד 12MB).",
   accentLilac:"לילך",accentOcean:"אוקיינוס",accentMint:"מנטה",accentCoral:"קורל",accentRose:"ורוד",accentGold:"דבש",accentSlate:"אפור כחלחל",
   bgNone:"נקי",bgSky:"שמיים",bgPeach:"אפרסק",bgSage:"מרווה",bgSunset:"שקיעה",bgNight:"לילה",bgPhoto:"תמונה שלי",
   tourMatrixTitle:"מה חשוב ומה דחוף?",tourMatrixCopy:"מטריצת אייזנהאואר מחלקת משימות לפי חשיבות ודחיפות. אפשר לסמן את שתי התכונות בעריכת משימה.",
   tourAppearanceTitle:"האפליקציה בסגנון שלכם",tourAppearanceCopy:"בהגדרות אפשר לבחור צבע, רקע מדורג או תמונה אישית. כל משתמש יכול לבחור מראה אחר.",
   versionName:"TinyWins v4"
  }
 };
 const getColor=(data)=>accents[data.accent]||accents.lilac;
 function normalize(data){
  if(!accents[data.accent])data.accent="lilac";
  if(!backgrounds.includes(data.wallpaper))data.wallpaper="none";
  if(typeof data.wallpaperImage!=="string"||!/^data:image\/jpeg;base64,[a-z0-9+/=]+$/i.test(data.wallpaperImage)||data.wallpaperImage.length>1000000)data.wallpaperImage="";
  if(data.wallpaper==="photo"&&!data.wallpaperImage)data.wallpaper="none";
 }
 function applyAppearance(data){
  normalize(data);
  const c=getColor(data),dark=data.theme==="dark",root=document.documentElement;
  root.style.setProperty("--accent",dark?c.dark:c.light);
  root.style.setProperty("--accent-light",dark?c.washDark:c.washLight);
  root.style.setProperty("--theme-accent",dark?c.dark:c.light);
  root.style.setProperty("--theme-wash",dark?c.washDark:c.washLight);
  document.body.dataset.wallpaper=data.wallpaper;
  if(data.wallpaper==="photo" && data.wallpaperImage){
   document.body.style.setProperty("--wallpaper-photo",'url("'+data.wallpaperImage+'")');
  }else document.body.style.removeProperty("--wallpaper-photo");
 }
 function settings(data,t){
  const themeCards=Object.keys(accents).map(k=>`<button type="button" class="theme-choice ${data.accent===k?'selected':''}" data-accent="${k}" aria-pressed="${data.accent===k}"><span class="theme-bubble" style="background:${accents[k].light}"></span>${t('accent'+k[0].toUpperCase()+k.slice(1))}</button>`).join("");
  const bgCards=backgrounds.map(k=>`<button type="button" class="background-choice ${data.wallpaper===k?'selected':''}" data-background="${k}" aria-pressed="${data.wallpaper===k}"><span class="background-tile bg-${k}"></span>${t('bg'+k[0].toUpperCase()+k.slice(1))}</button>`).join("");
  return `<div class="appearance-controls"><div class="field-label">${t('appearanceTitle')}</div><div class="field-label">${t('accentTitle')}</div><div class="theme-options" role="group" aria-label="${t('accentTitle')}">${themeCards}</div><div class="field-label">${t('backgroundTitle')}</div><div class="background-options" role="group" aria-label="${t('backgroundTitle')}">${bgCards}</div><div class="appearance-upload"><label for="background-file">${t('addPhoto')}</label><input type="file" id="background-file" accept="image/jpeg,image/png,image/webp" hidden><button type="button" id="remove-background-photo" ${!data.wallpaperImage?'hidden':''}>${t('removePhoto')}</button></div><p class="appearance-caption">${t('backgroundNotes')}</p></div>`;
 }
 async function compressImage(file){
  if(!file||!/^image\/(jpeg|png|webp)$/.test(file.type))throw Error("invalid-type");
  if(file.size>12*1024*1024)throw Error("too-large");
  const url=URL.createObjectURL(file),img=new Image();
  try{
   await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error("decode"));img.src=url;});
   const size=Math.min(1,1400/Math.max(img.naturalWidth,img.naturalHeight));
   const canvas=document.createElement("canvas");
   canvas.width=Math.max(1,Math.round(img.naturalWidth*size));
   canvas.height=Math.max(1,Math.round(img.naturalHeight*size));
   const ctx=canvas.getContext("2d");
   ctx.fillStyle="#eeeeee";ctx.fillRect(0,0,canvas.width,canvas.height);
   ctx.drawImage(img,0,0,canvas.width,canvas.height);
   let encoded=canvas.toDataURL("image/jpeg",.72);
   if(encoded.length>900000){
    const ratio=Math.sqrt(820000/encoded.length);
    const c2=document.createElement("canvas");c2.width=Math.max(1,Math.round(canvas.width*ratio));c2.height=Math.max(1,Math.round(canvas.height*ratio));
    const ctx2=c2.getContext("2d");ctx2.drawImage(canvas,0,0,c2.width,c2.height);
    encoded=c2.toDataURL("image/jpeg",.66);
   }
   if(encoded.length>1000000)throw Error("too-large");
   return encoded;
  } finally{URL.revokeObjectURL(url);}
 }
 function bindSettings(data,save,applyTheme,toast,t){
  const root=document.querySelector("#modal-layer");
  function paintSelection(attr,current){
   root.querySelectorAll("["+attr+"]").forEach(el=>{
    const ok=el.getAttribute(attr)===current;
    el.classList.toggle("selected",ok);
    el.setAttribute("aria-pressed",String(ok));
   });
  }
  root.querySelectorAll("[data-accent]").forEach(b=>b.onclick=()=>{
   data.accent=b.dataset.accent;
   applyTheme();save();paintSelection("data-accent",data.accent);
  });
  const input=root.querySelector("#background-file");
  root.querySelectorAll("[data-background]").forEach(b=>b.onclick=()=>{
   if(b.dataset.background==="photo"&&!data.wallpaperImage){input.click();return;}
   data.wallpaper=b.dataset.background;
   applyTheme();save();paintSelection("data-background",data.wallpaper);
  });
  input.onchange=async ()=>{
   const file=input.files&&input.files[0];if(!file)return;
   try{
    const photo=await compressImage(file);
    const beforeImage=data.wallpaperImage,beforeWall=data.wallpaper;
    data.wallpaperImage=photo;data.wallpaper="photo";
    save();
    if(localStorage.getItem("tinywins-checklist-v1")===null||localStorage.getItem("tinywins-checklist-v1")?.indexOf('"wallpaperImage"')===-1){
     data.wallpaperImage=beforeImage;data.wallpaper=beforeWall;save();throw Error("storage");
    }
    applyTheme();paintSelection("data-background",data.wallpaper);
    const remove=root.querySelector("#remove-background-photo");if(remove)remove.hidden=false;
   }catch(err){toast(err.message==="too-large"?t("photoLarge"):t("photoError"));}
   input.value="";
  };
  const remove=root.querySelector("#remove-background-photo");
  remove.onclick=()=>{data.wallpaperImage="";if(data.wallpaper==="photo")data.wallpaper="none";applyTheme();save();remove.hidden=true;paintSelection("data-background",data.wallpaper);};
 }
 function flags(task,t){
  return `${task.important?`<span class="eisen-flag">${t("important")}</span>`:""}${task.urgent?`<span class="eisen-flag">${t("urgent")}</span>`:""}`;
 }
 function matrix(root,tasks,data,t,escapeHtml,ico){
  const qs=[
   ["q1","matrixQ1","matrixQ1Sub",x=>!!x.important&&!!x.urgent],
   ["q2","matrixQ2","matrixQ2Sub",x=>!!x.important&&!x.urgent],
   ["q3","matrixQ3","matrixQ3Sub",x=>!x.important&&!!x.urgent],
   ["q4","matrixQ4","matrixQ4Sub",x=>!x.important&&!x.urgent]
  ];
  const dir=data.lang==="he"?"rtl":"ltr";
  root.innerHTML=`<div class="matrix-intro">${t("matrixIntro")}</div><div class="matrix-grid">${qs.map(([q,key,desc,accept],idx)=>{
   const items=tasks.filter(accept);
   return `<section class="matrix-lane" data-q="${q}" dir="${dir}"><div class="matrix-lane-head"><span class="matrix-q">${idx+1}</span><div><h3>${t(key)}</h3><p>${t(desc)}</p></div><span class="matrix-num">${items.length}</span></div><div class="matrix-cards">${items.length?items.map(x=>`<article class="matrix-card ${x.done?'done':''}"><button type="button" class="task-check" data-complete="${escapeHtml(x.id)}" aria-label="${x.done?t('active'):t('finished')}">${x.done?ico('check',14):''}</button><div class="matrix-task" dir="auto">${escapeHtml(x.title)}<div class="matrix-details">${escapeHtml((data.categories.find(c=>c.id===x.cat)||{name:"Other"}).name)}</div></div><button class="icon-btn" data-edit="${escapeHtml(x.id)}" aria-label="${t('edit')}" title="${t('edit')}">${ico('more',16)}</button></article>`).join(""):`<div class="matrix-empty">${t("matrixEmpty")}</div>`}</div></section>`;
  }).join("")}</div>`;
 }
 window.TW4={accents,backgrounds,labels,normalize,applyAppearance,settings,bindSettings,flags,matrix};
})(window);
