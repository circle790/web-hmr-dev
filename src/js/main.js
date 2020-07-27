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
    $.toast("这是详细页");
  });
  /**
   * 初始化
   */
  $.init()
});
