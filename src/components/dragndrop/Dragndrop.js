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
    this.fileContainer.addEventListener('dragleave', Dragndrop.onDragleave);
    this.fileContainer.addEventListener('dragover', Dragndrop.onDragover);
    this.fileContainer.addEventListener('drop', this.onDrop);
    this.fileInput.addEventListener('change', this.onChange);
  }

  static onDragover(e) {
    e.preventDefault();

    e.target.classList.remove('normal-state');
    e.target.classList.add('dragged');
  }

  static onDragleave(e) {
    e.preventDefault();

    e.target.classList.add('normal-state');
    e.target.classList.remove('dragged');
  }

  onDrop(e) {
    e.preventDefault();

    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    const reader = new FileReader();
    const id = performance.now();

    reader.addEventListener('load', (ev) => {
      const imgObject = {
        url: `${ev.target.result}#${id}`,
        description: file.name,
      };
      this.gallery.addToArray(imgObject);
      this.gallery.render();
    });
    reader.readAsDataURL(file);

    e.target.classList.add('normal-state');
    e.target.classList.remove('dragged');
  }

  onChange() {
    const file = this.fileInput.files && this.fileInput.files[0];

    if (!file) {
      return;
    }

    const id = performance.now();

    const reader = new FileReader();
    reader.addEventListener('load', (ev) => {
      const imgObject = {
        url: `${ev.target.result}#${id}`,
        description: file.name,
      };
      this.gallery.addToArray(imgObject);
      this.gallery.render();
    });
    reader.readAsDataURL(file);
    console.log(id);
  }

  onClick() {
    this.fileInput.dispatchEvent(new MouseEvent('click'));
  }
}
