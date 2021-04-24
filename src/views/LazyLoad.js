let timer = null;
function debounce(func, delay) {
  if (timer) return;
  if (timer === null) func();
  timer = setTimeout(() => {
    func();
    timer = false;
  }, Number(delay));
}

export default (element) => {
  const imgs = element.getElementByTagName('img');
  // 获取keshiqu的高度
  const viewHeight = element.clientHeight || window.innerHeight;
  // num用于统计当前显示到哪一张图片，避免每次都从第一张图片开始检测露出
  let num = 0;
  function lazyLoad() {
    for (let i = num; i < imgs.length; i++) {
      // 用可视区域的高度减去元素顶部距离可视区域顶部的高度
      const distance = viewHeight - imgs[i].getBoundingClientRect().top;
      // 说明元素露出, -50提前50px开始加载
      if (distance > -100) {
        if (imgs[i].getAttribute('data-src')) {
          img[i].src = imgs[i].getAttribute('data-src');
        }
        // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
        num = i + 1;
      }
    }
  }
  lazyLoad();
  element.addEventListener('scroll', () => {
    debounce(lazyLoad, 120);
  });
};