const audioIds = ['first', 'second', 'third', 'fourth'];

class Otamatone {
  constructor(root) {
    this.root = root;
  }

  execute() {
    this.render();
    this.bindEvent();
  }

  toTemplate() {
    return `
    <div id="otamatone-chord-slider">
    ${audioIds
      .map(
        (id, index) => `
          <audio id=${id}>
          <source src=${['/assets/', index + 1, '.mp3'].join('')} type="audio/mp3">
          브라우저에서 음성을 재생할 수 없습니다.
          </audio>
        `
      )
      .join('')}
      <label id="chord-label">
        <input type="range" id="chord" name="chord" min="0" max="3" />
      </label>
    </div>
    `;
  }

  render() {
    this.root.innerHTML = this.toTemplate();
  }

  bindEvent() {
    document.querySelector('#chord').addEventListener('input', (event) => {
      const { value: index } = event.target;
      const audioId = audioIds[index];

      document.querySelector(`#${audioId}`).play();
    });
  }
}

export default class App {
  constructor() {
    this.root = document.querySelector('#app');
    this.otamatone = new Otamatone(this.root);
  }

  execute() {
    this.otamatone.execute();
  }
}

const app = new App();
app.execute();
