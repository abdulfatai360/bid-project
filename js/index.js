const projectViewsToggle = document.querySelectorAll(
  '.project-details__reqbun--titlebar > span'
);
const projectViews = document.querySelectorAll('.project-details--top > div');
const requirementsAndBundle = document.querySelectorAll(
  '.project-details__req__tasks div'
);

const handleProjectViewsToggle = idx => {
  projectViewsToggle.forEach(elem => elem.classList.remove('active'));
  projectViewsToggle[idx].classList.add('active');

  projectViews.forEach(elem => elem.classList.remove('visible'));
  projectViews[idx].classList.add('visible');

  requirementsAndBundle.forEach(elem => elem.classList.remove('visible'));
  requirementsAndBundle[idx].classList.add('visible');
};

projectViewsToggle.forEach((elem, idx) =>
  elem.addEventListener('click', () => handleProjectViewsToggle(idx))
);

const formatCost = cost => {
  const commaPos = cost.length - 3;
  return `$${cost.slice(0, commaPos)},${cost.slice(commaPos)}`;
};

const sliderInput = document.querySelector('.cost-est__slider input');
const handleProjectCostChange = () => {
  const sliderIndicator = document.querySelector('.indicator');
  const currentCost = document.querySelector('.current-cost');
  const valuePercent =
    ((sliderInput.value - sliderInput.min) /
      (sliderInput.max - sliderInput.min)) *
    100;

  sliderIndicator.style.width = `${valuePercent}%`;
  currentCost.textContent = formatCost(sliderInput.value);
  currentCost.style.left = `${valuePercent}%`;
};

sliderInput.addEventListener('input', handleProjectCostChange);

const newRequirementForm = document.querySelector('.project-details__new-req');
const handleNewRequirementSubmit = e => {
  e.preventDefault();
};

newRequirementForm.addEventListener('submit', handleNewRequirementSubmit);

const dragStart = e => {
  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.setData('tagValue', e.target.dataset.value);
};

const dragOver = e => e.preventDefault();

const dragEnter = e => {
  if (e.toElement.nodeName !== 'DIV') return false;
  e.target.querySelector('p').style.display = 'none';
  e.target.querySelector('.plus-icon').style.display = 'flex';
};

const dragLeave = e => {
  if (e.fromElement.nodeName === 'DIV' && e.toElement.nodeName === 'SPAN')
    return false;
  if (e.fromElement.nodeName === 'SPAN') return false;

  e.target.querySelector('p').style.display = 'flex';
  e.target.querySelector('.plus-icon').style.display = 'none';
};

const dropTag = e => {
  e.preventDefault();

  if (e.target.nodeName === 'DIV') {
    e.target.querySelector('p').style.display = 'flex';
    e.target.querySelector('.plus-icon').style.display = 'none';
  }

  const tag = e.dataTransfer.getData('tagValue');
  const tagElem = document.querySelector(`[data-value=${tag}]`);
  tagElem.parentNode.removeChild(tagElem);

  e.target.querySelector(
    '.no-of-tasks'
  ).textContent = `${e.target.dataset.taskcount} Tasks`;
  e.target.setAttribute(
    'data-taskcount',
    Number(e.target.dataset.taskcount) + 1
  );
};

const tagListItems = document.querySelectorAll('.project-tags__list li');
tagListItems.forEach(elem => elem.addEventListener('dragstart', dragStart));

const taskListItems = document.querySelectorAll('.dev-tasks__item div');
taskListItems.forEach(el => el.addEventListener('dragenter', dragEnter));
taskListItems.forEach(el => el.addEventListener('dragover', dragOver));
taskListItems.forEach(el => el.addEventListener('dragleave', dragLeave));
taskListItems.forEach(el => el.addEventListener('drop', dropTag));
