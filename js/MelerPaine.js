var currentLang;//浏览器语言
var showedLang = '';//显示的评论版本:zh为中文版，global为国际版。

//检测浏览器语言
currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
if(!currentLang){//判断IE浏览器使用语言
  currentLang = navigator.browserLanguage;
}
currentLang = currentLang.substr(0,2);

if(currentLang == 'zh'){
  showedLang = 'zh';
}else if(currentLang != 'zh'){
  showedLang = 'global';
}

try {
  initComment();
  window.onload = showCommentCount;

} catch (e) {
  //alert("name: " + e.name + ",message: " + e.message);
}

//加载disqus评论模块
function show_disqus(){

  //<!-- disqus start (一个网页只需插入一次) -->
  /* * * DON'T EDIT BELOW THIS LINE * * */
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  //<!-- disqus end -->
}

//加载disqus统计模块
function disqus_count(){
  /* * * DON'T EDIT BELOW THIS LINE * * */
  var s = document.createElement('script'); s.async = true;
  s.type = 'text/javascript';
  s.src = '//' + disqus_shortname + '.disqus.com/count.js';
  (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}

//加载多说评论模块
function show_duoshuo(){
  //<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
  var ds = document.createElement('script');
  ds.type = 'text/javascript';ds.async = true;
  ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
  ds.charset = 'UTF-8';
  (document.getElementsByTagName('head')[0]
  || document.getElementsByTagName('body')[0]).appendChild(ds);
  //<!-- 多说公共JS代码 end -->
}

//控制[评论统计数]的显示方式
function showCommentCount(){
  var arr = document.getElementsByTagName("a");
  for(i=0;i<arr.length;i++){
    if(showedLang == 'global'){
      if(arr[i].id=="disqusCount") arr[i].style.display = "";
      if(arr[i].id=="duoshuoCount") arr[i].style.display = "none";
    }else if(showedLang == 'zh'){
      if(arr[i].id=="disqusCount") arr[i].style.display = "none";
      if(arr[i].id=="duoshuoCount") arr[i].style.display = "";
    }
  }
}

//根据需要加载评论模块
function initComment(){
  if(showedLang == 'global'){
    show_disqus();
    disqus_count();
  }else if(showedLang == 'zh'){
    show_duoshuo();
  }
}

//切换不同的评论系统：Disqus、多说
function switchComment(selfObject){
  if(selfObject){
    if(showedLang == 'zh'){
      showedLang = 'global';
    }else if(showedLang == 'global'){
      showedLang = 'zh';
    }
  }

  initComment();//切换评论系统后需要加载对应的外接代码

  if(showedLang == 'global'){
    document.getElementById("commentSwitcher").innerHTML='(View Chinese Duoshuo Comments)';
    document.getElementById("ds-thread").style.display = "none";
    document.getElementById("disqus_thread").style.display = "block";
  }else if(showedLang == 'zh'){
    document.getElementById("commentSwitcher").innerHTML='(查看Disqus评论)';
    document.getElementById("ds-thread").style.display = "block";
    document.getElementById("disqus_thread").style.display = "none";
  }

  showCommentCount();//根据选定的评论系统显示相应的评论数

}
