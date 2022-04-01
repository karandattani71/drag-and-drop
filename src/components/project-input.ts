/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind-decorator.ts" />
/// <reference path="../utility/validation.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
  // ProjectInput Class//
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };
    const modal =document.getElementById('error')! as HTMLElement

    if(!validate(titleValidatable)){
      modal.classList.remove('hide')
      modal.innerHTML='Invalid Title Input. Title field should not be empty!'
      modal.classList.add('alert')
      modal.classList.add('alert-danger')
            // alert('Invalid Title Input. Title field should not be empty!')
    }
    else if(!validate(descriptionValidatable))
    {
      modal.classList.remove('hide')
      modal.innerHTML='Invalid Description Input. Description field should not be empty and should contain minimum 5 characters.'
      modal.classList.add('alert')
      modal.classList.add('alert-danger')
      // alert('Invalid Description Input. Description field should not be empty and should contain minimum 5 characters.')

    }
    else if(!validate(peopleValidatable))
    {
      modal.classList.remove('hide')
      modal.innerHTML='Invalid People Input, No. of People should be in range of 1 to 5'
      modal.classList.add('alert')
      modal.classList.add('alert-danger')
      // alert('Invalid People Input, No. of People should be in range of 1 to 5');
    }
    // if (
    //   !validate(titleValidatable) ||
    //   !validate(descriptionValidatable) ||
    //   !validate(peopleValidatable)
    // ) {
    //   alert('Invalid input, please try again!');
    //   return;
    else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const modal =document.getElementById('error')! as HTMLElement
    modal.classList.add('hide')
    modal.classList.remove('alert')
    modal.classList.remove('alert-danger')
      
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}

}