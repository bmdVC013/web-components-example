const template = document.createElement('template');
template.innerHTML = `
  <style>
    div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
    h2 { margin: 0 0 10px; }
    ul { margin: 0; }
    p { margin: 10px 0; }
  </style>
  <div>
    <h2>Personal ID Card</h2>
    <slot name="person-name">NAME MISSING</slot>
    <ul>
      <li><slot name="person-age">AGE MISSING</slot></li>
      <li><slot name="person-occupation">OCCUPATION MISSING</slot></li>
    </ul>
  </div>
`;

class PersonDetails extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

class EditWord extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    
    const form = document.createElement('form');
    const input = document.createElement('input');
    const span = document.createElement('span');

    const style = document.createElement('style');
    style.textContent = 'span { background-color: #eef; padding: 0 2px }';

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(form);
    this.shadowRoot.appendChild(span);

    span.textContent = this.textContent;
    input.value = this.textContent;

    form.appendChild(input);
    form.style.display = 'none';
    span.style.display = 'inline-block';
    input.style.width = span.clientWidth + 'px';

    this.setAttribute('tabindex', '0');
    input.setAttribute('required', 'required');
    this.style.display = 'inline-block';

    this.addEventListener('click', () => {
      span.style.display = 'none';
      form.style.display = 'inline-block';
      input.focus();
      input.setSelectionRange(0, input.value.length);
    });

    form.addEventListener('submit', e => {
      updateDisplay();
      e.preventDefault();
    });

    input.addEventListener('blur', updateDisplay);

    function updateDisplay() {
      span.style.display = 'inline-block';
      form.style.display = 'none';
      span.textContent = input.value;
      input.style.width = span.clientWidth + 'px';
    }
  }
}

customElements.define('person-details', PersonDetails);
customElements.define('edit-word', EditWord);
