/// <reference path="src/models/drag-and-drop-interface.ts"/>
/// <reference path="src/models/project-model.ts"/>
/// <reference path="src/state/project-state.ts"/>
/// <reference path="src/utility/validation.ts"/>
/// <reference path="src/decorators/autobind-decorator.ts"/>
/// <reference path="src/components/project-input.ts"/>
/// <reference path="src/components/project-list.ts"/>



namespace App{



new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
}