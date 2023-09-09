export default class Gallery {
  constructor(element) {
    this.element = element;
    this.count = 0;

    this.urlList = [];

    this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
    this.element.addEventListener('click', this.onCloseBtnClick);
  }

  static createLi(description, url) {
    return `
      <li class="img-item">
      <img src="${url}" class="img">
        <div class="close-button">X</div>
        <span class="img-discription">${description}</span>
      </li>
    `;
  }

  addToArray(el) {
    this.urlList.push(el);
  }

  clear() {
    const images = this.element.querySelectorAll('.img-item');
    images.forEach((item) => item.remove());
  }

  render() {
    this.clear();
    this.urlList.forEach((el) => {
      const li = Gallery.createLi(el.description, el.url);
      this.element.insertAdjacentHTML('beforeend', li);
    });
  }

  onCloseBtnClick(e) {
    if (!e.target.classList.contains('close-button')) {
      return;
    }
    const deletable = e.target.closest('.img-item');
    const url = deletable.querySelector('.img').getAttribute('src');
    const deletableIndex = this.urlList.findIndex((el) => el.url === url);
    this.urlList.splice(deletableIndex, 1);
    deletable.remove();
  }
}
