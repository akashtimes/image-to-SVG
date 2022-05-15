let file;const img=document.getElementById('converted-img');const oimg=document.getElementById('original-img');function dropZone($target,onDrop){$target.addEventListener('dragover',function(event){$target.classList.add('drag-over');event.stopPropagation();event.preventDefault();return false;})
$target.addEventListener("dragend",function(event){$target.classList.remove('drag-over');event.stopPropagation();event.preventDefault();return false;})
$target.addEventListener("dragleave",function(event){$target.classList.remove('drag-over');event.stopPropagation();event.preventDefault();return false;})
$target.addEventListener("drop",function(event){event.stopPropagation();event.preventDefault();let file=event.dataTransfer.files[0];$target.classList.remove('drag-over');let fileReader=new FileReader();fileReader.onload=function(ev){convertToSVG(ev.target.result)};fileReader.readAsDataURL(file);onDrop(file);return false;});}
dropZone(document.querySelector('#dropzone1'),function(file){console.log(file)})
document.getElementById('dropzone-file').addEventListener('change',function(event){file=event.target.files[0];event.stopPropagation();event.preventDefault();let fileReader=new FileReader();fileReader.onload=function(ev){convertToSVG(ev.target.result)};fileReader.readAsDataURL(file);})
function convertToSVG(file){img.src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAxXfEYamzUX0_PpBiZ8qXjLGjnQVU6_Q3cetRRNCx2MQPDxvdTrEeBb5R9YwYQ64Vu92cdaVFLvCFQ2xbbRfCam1rysozCMaLTm7w3Y1G7Lb99_B1Okh1iTFi33uYySiRuKs5URYXMUq_iTRCa8aTxoPpd69b1Pvm-MgnqaZhsw0ccogOEwvmvZvcAA/s320/Converted%20SVG%20Image%20(2).webp'
if(file)oimg.src=file;else file=oimg.src;const preset=document.getElementById('preset').value
if(preset=='potrace'){Potrace.loadImage(file)
Potrace.process(()=>showImage(Potrace.getSVG(1)));}else if(preset=='trace'||preset=='posterize'){if(worker){worker.postMessage({jimp:file,preset})}
else{Potrace2[preset](file,(err,svg)=>{if(err)return alert('Error creating trace. Use different method.');showImage(svg);})}}else{if(worker){ImageTracer.loadImage(file,(canvas)=>{const imgd=ImageTracer.getImgdata(canvas);worker.postMessage({image:{imgd,preset}})})}else{ImageTracer.imageToSVG(file,(svgstr)=>showImage(svgstr),preset);}}}
document.getElementById('preset').addEventListener('change',(event)=>{if(document.getElementById('original-img').getAttribute('src'))
convertToSVG()})
document.getElementById("save").addEventListener("click",function(e){if(img.src){e.target.download="akashtimes"+(new Date()).toLocaleTimeString()+".svg";e.target.href=img.src;}
if(typeof yaCounter48455426!='undefined')yaCounter48455426.reachGoal('svg')},false);document.getElementById('example').addEventListener('click',(e)=>{document.getElementById('original-img').src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjF9lAcxlwMarRTwji9zIdzuyx-6peq-0xsNxN_owzRTfjnC3b6x_jXxkL-hcl9BZjDT_GUdEUf8SgUXfbGLCyvDfgG2XJXOhYT64Sw3ljBXguS8n5NhZjcrG5itd5hrzFlQmqHFBFcWzyPVNBTgao6xk7m-oYmyFDjPmbJsRvxaLviMGVTmKs3Def2LA/w400-h400/Original%20uploded%20Image.webp'
convertToSVG()
e.preventDefault()},false);let worker;if(window.Worker){const blob=new Blob([document.querySelector('#worker1').textContent]);worker=new Worker(window.URL.createObjectURL(blob));worker.onmessage=(e)=>{const data=e.data;if(data.result){showImage(data.result);}}
worker.onerror=(e)=>{console.error(e);alert('Could not convert image. Please contact us if you need help.')}
worker.postMessage({url:location.origin});}
function showImage(svg){img.src='data:image/svg+xml;,'+svg;}
