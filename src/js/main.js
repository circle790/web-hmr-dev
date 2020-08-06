$(function () {
  /**
   * 首页
   */
  $(document).on("pageInit", ".page-index", function (e, id, page) {
    $.toast("这是首页");
  });
  /**
   * 关于页
   */
  $(document).on("pageInit", ".page-about", function (e, id, page) {
    $.toast("这是关于页");
  });
  /**
   * 详细页
   */
  $(document).on("pageInit", ".page-detail", function (e, id, page) {
    $("#picker").picker({
      rotateEffect: true,
      toolbarCloseText: '2222',
      cols: [
        {
          textAlign: 'center',
          values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
        }
      ]
    });
    $.toast("这是详细页");
  });
  /**
   * 初始化
   */
  $.init()
});
