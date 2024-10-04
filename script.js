
let formElements = JSON.parse(localStorage.getItem('formElements')) || [
    {
        id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
        type: "input",
        label: "Sample Input",
        placeholder: "Sample placeholder"
    },
    {
        id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        type: "select",
        label: "Sample Select",
        options: ["Sample Option 1", "Sample Option 2"]
    },
    {
        id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
        type: "textarea",
        label: "Sample Textarea",
        placeholder: "Sample placeholder"
    }
];


const formContainer = document.getElementById('form-container');
const addInputButton = document.getElementById('add-input');
const addSelectButton = document.getElementById('add-select');
const addTextareaButton = document.getElementById('add-textarea');
const saveButton = document.getElementById('save-form');

// function to create a unique ID
const createUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);


function renderForm() {
    formContainer.innerHTML = '';
    formElements.forEach((element, index) => {
        const formElement = document.createElement('div');
        formElement.classList.add('form-element');
        formElement.setAttribute('draggable', true);
        formElement.setAttribute('data-id', element.id);

        formElement.innerHTML = `
            <label contenteditable="true">${element.label}</label>
            ${getFormField(element, index)}
            <button class="delete-btn">Delete</button>
        `;

        // Drag and drop 
        formElement.addEventListener('dragstart', (e) => onDragStart(e, index));
        formElement.addEventListener('dragover', (e) => e.preventDefault());
        formElement.addEventListener('drop', (e) => onDrop(e, index));

        // Delete button
        formElement.querySelector('.delete-btn').addEventListener('click', () => {
            deleteElement(index);
        });

        formContainer.appendChild(formElement);
    });
}


function getFormField(element, index) {
    switch (element.type) {
        case 'input':
            return `<input type="text" placeholder="${element.placeholder}" oninput="updatePlaceholder(${index}, this.value)" />`;
        case 'select':
            return `
                <select>
                    ${element.options.map(option => `<option>${option}</option>`).join('')}
                </select>
            `;
        case 'textarea':
            return `<textarea placeholder="${element.placeholder}" oninput="updatePlaceholder(${index}, this.value)"></textarea>`;
        default:
            return '';
    }
}

// Update placeholder 
function updatePlaceholder(index, value) {
    formElements[index].placeholder = value;
}


addInputButton.addEventListener('click', () => {
    formElements.push({
        id: createUniqueId(),
        type: 'input',
        label: 'New Input',
        placeholder: 'Enter text'
    });
    renderForm();
    saveToLocalStorage();
    showToast('New input added successfully');
});

// Add Select
addSelectButton.addEventListener('click', () => {
    formElements.push({
        id: createUniqueId(),
        type: 'select',
        label: 'New Select',
        options: ['Option 1', 'Option 2']
    });
    renderForm();
    saveToLocalStorage();
    showToast('New select added successfully');
});

// Add Textarea
addTextareaButton.addEventListener('click', () => {
    formElements.push({
        id: createUniqueId(),
        type: 'textarea',
        label: 'New Textarea',
        placeholder: 'Enter text'
    });
    renderForm();
    saveToLocalStorage();
    showToast('New textarea added successfully');
});

// Delete an element
function deleteElement(index) {
    formElements.splice(index, 1);
    renderForm();
    saveToLocalStorage();
    showToast('Element deleted successfully');
}

// Drag and drop functionality
let draggedElementIndex = null;

function onDragStart(e, index) {
    draggedElementIndex = index;
}

function onDrop(e, index) {
    const draggedElement = formElements[draggedElementIndex];
    formElements.splice(draggedElementIndex, 1);
    formElements.splice(index, 0, draggedElement);
    renderForm();
    saveToLocalStorage();
}

// Save the form 
saveButton.addEventListener('click', () => {
    saveToLocalStorage();
    showToast('Form saved successfully');
});

// Save formElements to localStorage
function saveToLocalStorage() {
    localStorage.setItem('formElements', JSON.stringify(formElements));
    console.log(JSON.stringify(formElements, null, 2));
}

// Toast 
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


renderForm();


