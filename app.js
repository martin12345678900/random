function solve() {
    let taskField = document.getElementById('task');
    let descriptionField = document.getElementById('description');
    let dateField = document.getElementById('date');
    let button = document.getElementById('add');
    let [addTaskSection, openSection, inProgressSection, completeSection] = document.querySelector('.wrapper').children;


    button.addEventListener('click', addToOpenSection);

    function addToOpenSection(event) {
        event.preventDefault();
        if (taskField.value === '' || descriptionField.value === '' || dateField.value === '') { return };
        let openSectionDiv = openSection.querySelectorAll('div')[1];
        let startButton = createElements('button', 'green', 'Start');
        let deleteButton = createElements('button' , 'red', 'Delete');
        let div = createElements('div', 'flex', null);
        let dueDate = createElements('p', null, `Due Date: ${dateField.value}`);
        let description = createElements('p', null, `Description: ${descriptionField.value}`);
        let task = createElements('h3', null, taskField.value);
        let article = createElements('article', null, null);
        startButton.addEventListener('click', addToInProgressSection);
        deleteButton.addEventListener('click', deleteTheArticle);

        div.appendChild(startButton);
        div.appendChild(deleteButton);
        article.appendChild(task);
        article.appendChild(description);
        article.appendChild(dueDate);
        article.appendChild(div);
        openSectionDiv.appendChild(article);

        taskField.value = '';
        descriptionField.value = '';
        dateField.value = '';
    }

    function createElements(tagName, className, textContent) {
        let newElement = document.createElement(tagName);

        if (className) {
            newElement.classList.add(className);
        }
        
        if (textContent) {
            newElement.textContent = textContent;
        }
        return newElement
    }

    function addToInProgressSection(event) {
        let inProgressDiv = inProgressSection.querySelectorAll('div')[1];
        let inProgressArticle = event.target.parentNode.parentNode;
        let [firstButton, secondButton] = event.target.parentNode.querySelectorAll('button');
        firstButton.className = 'red';
        firstButton.textContent = 'Delete';
        secondButton.className = 'orange';
        secondButton.textContent = 'Finish';

        firstButton.addEventListener('click', deleteTheArticle);
        secondButton.addEventListener('click', moveToCompleteSection);

        inProgressDiv.appendChild(inProgressArticle);
    }

    function deleteTheArticle(event) {
        event.target.parentNode.parentNode.remove();
    }

    function moveToCompleteSection(event) {
        let completeSectionDiv = completeSection.querySelectorAll('div')[1];
        let completeSectionArticle = event.target.parentNode.parentNode;
        event.target.parentNode.remove();

        completeSectionDiv.appendChild(completeSectionArticle);
    }
}