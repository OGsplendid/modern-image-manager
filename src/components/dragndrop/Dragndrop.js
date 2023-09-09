import Gallery from '../gallery/Gallery';

export default class Dragndrop {
  constructor(element) {
    this.element = element;
    this.gallery = new Gallery(document.querySelector('.bottom-container'));
    this.bottomContainer = document.querySelector('.bottom-container');
    this.fileContainer = this.element.querySelector('.file-container');
    this.fileInput = document.querySelector('.input');

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.fileContainer.addEventListener('click', this.onClick);
    this.fileContainer.addEventListener('dragover', Dragndrop.onDragover);
    this.fileContainer.addEventListener('drop', this.onDrop);
    this.fileInput.addEventListener('change', this.onChange);
  }

  static onDragover(e) {
    e.preventDefault();

    e.target.style.backgroundColor = 'purple';
    e.target.style.color = 'white';
  }

  onDrop(e) {
    e.preventDefault();

    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (ev) => {
      const imgObject = {
        url: ev.target.result,
        description: file.name,
      };
      this.gallery.addToArray(imgObject);
      this.gallery.render();
    });
    reader.readAsDataURL(file);
    e.target.style.backgroundColor = 'white';
    e.target.style.color = 'black';
  }

  onChange(e) {
    const file = this.fileInput.files && this.fileInput.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', (ev) => {
      const imgObject = {
        url: ev.target.result,
        description: file.name,
      };
      this.gallery.addToArray(imgObject);
      this.gallery.render();
    });
    reader.readAsDataURL(file);

    // const url = URL.createObjectURL(file);
    // const imgObject = {
    //   url,
    //   description: file.name,
    // };
    // this.gallery.addToArray(imgObject);
    // this.gallery.render();
    // setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  onClick(e) {
    this.fileInput.dispatchEvent(new MouseEvent('click'));
  }
}
