(function() {
  // 获取变量
var _xsrf = 'a8517637e13c86530ee9661538d8a664',
    url_token = '46312145',
    nodename = 'QuestionAnswerListV2',
    count = '200',
    stepCount = Math.ceil(count / 20),
    nowCount = 0,
    offset = 0;

// 新建节点，隐藏原网页
$("#zh-question-answer-wrap").empty().hide();
$("body").append('<div id="img-fuli" style="position:absolute;left: 0; top: 0; width:100%; background:rgba(0,0,0,.8); z-index:100000;-webkit-column-count:4;-moz-column-count:4;column-count:4;-moz-column-gap:0;-webkit-column-gap:0;column-gap:0;padding: 0;"><h1 style="color:#fff;">加载中，请稍后...</h1></div>');

// 主函数
loadImg(offset);


// Ajax获取资源函数
function loadImg(offset){
  $.ajax({
    url: '//www.zhihu.com/node/' + nodename,
    type: 'POST',
    dataType: 'jsonp',
    data: {
      method: 'next',
      params: '{"url_token":' + url_token + ',"pagesize":20,"offset":' + offset + '}',
      _xsrf: _xsrf
    }
  })
  .done(function(data){
    for(idx in data.msg){
      $("#zh-question-answer-wrap").append(data.msg[idx]);
    }
    nowCount ++;
    if(nowCount == stepCount){
      showImg();
    } else {
      offset += 20;
      loadImg(offset);
    }

  });
}

// 显示图像函数
function showImg(){
  var length=$(".zm-item-rich-text .lazy").length,
      img = "";
  for(var i = 0;i<length;i++){
    var src = $(".zm-item-rich-text .lazy").eq(i).data("actualsrc"),
        people = $(".zm-item-rich-text .lazy").eq(i).parents(".zm-item-answer").find('.zm-item-link-avatar').attr("href"),
        peoplesrc = people ? people : src,
        title = people ? people : "匿名用户";
    img += '<div><a title="' + title + '" href="' + peoplesrc + '" target = "_blank"><img src="'+ src + '" width="100%;"></a></div>';
  }
  $("#img-fuli").html(img);
}

})()