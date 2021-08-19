class Square extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  // Invoked each time the custom element is 
  // appended into a document-connected element.
  connectedCallback() {
    console.log('Custom square element added to page.');
    updateStyle(this);
  }

  // Invoked when one of the custom element's
  // attributes is added, removed, or changed.
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    console.log('Custom square element attributes changed.');
    updateStyle(this);
  }

  // Invoked each time the custom element is
  // disconnected from the document's DOM.
  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  // Invoked each time the custom element is moved to a new document.
  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }
}

customElements.define('custom-square', Square);

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let square;

update.disabled = true;
remove.disabled = true;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

add.onclick = function() {
  // Create a custom square element
  square = document.createElement('custom-square');
  square.setAttribute('l', 100);
  square.setAttribute('c', 'red');
  document.body.appendChild(square);

  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};

update.onclick = function() {
  square.setAttribute('l', random(50, 200));
  square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
};

remove.onclick = function() {
  document.body.removeChild(square);

  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
};