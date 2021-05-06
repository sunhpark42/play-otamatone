import { ROOT } from './constants.js';

const audioIds = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
];

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
    <div id="otamatone-body">
      <div id="otamatone-stick">
        <div id="otamatone-chord-slider">
        ${audioIds
          .map(
            (id) => `
              <audio id=${'audio' + id}>
              <source src=${[ROOT, '/assets/', id, '.wav'].join('')} type="audio/wav">
              브라우저에서 음성을 재생할 수 없습니다.
              </audio>
            `
          )
          .join('')}
          <label id="chord-label">
            <input type="range" id="chord" name="chord" min="0" max='${audioIds.length}' />
          </label>
        </div>
      </div>
      <div id="otamatone-head">
        <div id="otamatone-eyes">
          <div class="otamatone-eye">
          </div>
          <div class="otamatone-eye">
          </div>
        </div>
        <div id="otamatone-mouth">
        </div>
        <button type="button" id="mouth-button"></button>
      </div>
      </div>
      <div>
        <ol>
        <li>회색 부분을 누르면 소리가 나옵니다</li>
        <li>입 오른쪽 혹은 스페이스키를 누르면 입이 열립니다.</li>
        (음량조절은 추후에 생길 예정입니다.)
        </ol>
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

      document.querySelector(`#${'audio' + audioId}`).play();
    });

    document.querySelector('#mouth-button').addEventListener('mousedown', () => {
      document.querySelector('#otamatone-mouth').classList.add('mouth-animate');
    });

    document.querySelector('#mouth-button').addEventListener('mouseup', () => {
      document.querySelector('#otamatone-mouth').classList.remove('mouth-animate');
    });

    document.querySelector('#mouth-button').addEventListener('touchstart', () => {
      document.querySelector('#otamatone-mouth').classList.add('mouth-animate');
    });

    document.querySelector('#mouth-button').addEventListener('touchend', () => {
      document.querySelector('#otamatone-mouth').classList.remove('mouth-animate');
    });

    document.querySelector('#mouth-button').addEventListener('touchcancel', () => {
      document.querySelector('#otamatone-mouth').classList.remove('mouth-animate');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        document.querySelector('#otamatone-mouth').classList.add('mouth-animate');
      }
    });

    document.addEventListener('keyup', () => {
      document.querySelector('#otamatone-mouth').classList.remove('mouth-animate');
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
