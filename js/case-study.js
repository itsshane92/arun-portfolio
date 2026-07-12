(function(){
  'use strict';
  var progress=document.createElement('div');
  progress.className='case-study-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.appendChild(progress);

  var content=document.querySelector('.portfolio-des');
  if(content){
    content.classList.add('case-study-layout');
    var headings=[].slice.call(content.querySelectorAll('h2.text-block-title'));
    var toc=document.createElement('nav');
    toc.className='case-study-toc';
    toc.setAttribute('aria-label','Case study sections');
    toc.innerHTML='<strong>On this page</strong>';
    headings.forEach(function(heading,index){
      if(!heading.id){heading.id='section-'+(index+1);}
      var link=document.createElement('a');
      link.href='#'+heading.id;
      link.textContent=heading.textContent.replace(/:$/,'').trim();
      toc.appendChild(link);
    });
    if(headings.length>2){document.body.appendChild(toc);}
  }

  [].slice.call(document.querySelectorAll('img')).forEach(function(img,index){
    if(index>0){img.loading='lazy';img.decoding='async';}
    var alt=(img.getAttribute('alt')||'').trim().toLowerCase();
    if(!alt||alt==='images'||alt==='image'||alt==='image description'){
      var section=img.closest('.text-block,.portfolio-gallery');
      var heading=section&&section.querySelector('h1,h2,h3');
      img.alt=heading?heading.textContent.trim()+' visual':'Project interface and research visual';
    }
  });

  function update(){
    var max=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(max?Math.min(100,window.scrollY/max*100):0)+'%';
    var toc=document.querySelector('.case-study-toc');
    var study=document.querySelector('.portfolio-des');
    if(toc&&study){
      var studyRect=study.getBoundingClientRect();
      var tocBottom=115+toc.offsetHeight;
      var insideStudy=studyRect.top<window.innerHeight-80&&studyRect.bottom>tocBottom+32;
      toc.style.display=insideStudy?'block':'none';
    }
    var links=[].slice.call(document.querySelectorAll('.case-study-toc a'));
    var current='';
    links.forEach(function(link){var node=document.querySelector(link.hash);if(node&&node.getBoundingClientRect().top<180){current=link.hash;}});
    links.forEach(function(link){link.classList.toggle('active',link.hash===current);});
  }
  window.addEventListener('scroll',update,{passive:true});
  update();
}());
