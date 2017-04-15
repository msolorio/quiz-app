// TODO: add increment score card functionality on state DONE
// TODO: on render if response chosen disable radio buttons

// can get rid of stepName later - using for wiring up basic flow
var data = {
  numOfQuestions: 5,
  steps: [
    {
      stepType: 'intro',
      content: {
        stepName: 'intro',
        headline: 'Take a Quiz on Circuits',
        button: 'Start Quiz'
      }
    },

    {
      stepType: 'question',
      questionNum: 1,
      content: {
        stepName: 'question1',
        question: 'question1?',
        responseChoice1: 'responseChoice1',
        responseChoice2: 'responseChoice2',
        responseChoice3: 'responseChoice3',
        responseChoice4: 'responseChoice4',
        button: 'Submit'
      },
      correctResponse: '0'
    },

    {
      stepType: 'question',
      questionNum: 2,
      content: {
        stepName: 'question2',
        question: 'question2?',
        responseChoice1: 'responseChoice1',
        responseChoice2: 'responseChoice2',
        responseChoice3: 'responseChoice3',
        responseChoice4: 'responseChoice4',
        button: 'Submit'
      },
      correctResponse: '0'
    },

    {
      stepType: 'question',
      questionNum: 3,
      content: {
        stepName: 'question3',
        question: 'question3?',
        responseChoice1: 'responseChoice1',
        responseChoice2: 'responseChoice2',
        responseChoice3: 'responseChoice3',
        responseChoice4: 'responseChoice4',
        button: 'Submit'
      },
      correctResponse: '0'
    },

    {
      stepType: 'question',
      questionNum: 4,
      content: {
        stepName: 'question4',
        question: 'question4?',
        responseChoice1: 'responseChoice1',
        responseChoice2: 'responseChoice2',
        responseChoice3: 'responseChoice3',
        responseChoice4: 'responseChoice4',
        button: 'Submit'
      },
      correctResponse: '0'
    },

    {
      stepType: 'question',
      questionNum: 5,
      content: {
        stepName: 'question5',
        question: 'question5?',
        responseChoice1: 'responseChoice1',
        responseChoice2: 'responseChoice2',
        responseChoice3: 'responseChoice3',
        responseChoice4: 'responseChoice4',
        button: 'Submit'
      },
      correctResponse: '0'
    },

    {
      stepType: 'end',
      content: {
        stepName: 'end',
        headline: 'Overall Score:',
        button: 'Start New Quiz'
      }
    }   
  ]
};

window.state = {
  currentStepNum: 0,
  currentQuestionNum: 0,
  chosenResponse: null,
  responseChosen: false,
  showCorrectResponse: false,
  alertToChooseResponse: false,
  numOfCorrect: 0,
  numOfIncorrect: 0
}

// RETRIEVING INFORMATON FROM DOM ///////////////////////////////////////
function getChosenResponse(state, dom) {
  return $('input[type=radio]:checked').val();
};

// CHECKING STATE ///////////////////////////////////////////////////////

// UPDATING STATE ///////////////////////////////////////////////////////

// if response not chosen update state to show alert to choose response
function updateStateAlertToChooseResponse(state) {
  if (!state.responseChosen) state.alertToChooseResponse = true;
  else state.alertToChooseResponse = false;
}

function incrementScoreCard(state, data) {
  var correctResponse = data.steps[state.currentStepNum].correctResponse;
  
  if (state.chosenResponse === correctResponse.toString()) state.numOfCorrect++;
  else state.numOfIncorrect++;
}

function updateStateShowCorrectResponse(state, data) {
  state.showCorrectResponse = true;
  incrementScoreCard(state, data);
}

function updateStateNextStep(state) {
  state.chosenResponse = null;
  state.responseChosen = false;
  state.showCorrectResponse = false;
  state.currentQuestionNum++;
  state.currentStepNum++;
}

function handleStateCorrectResponse(state, data) {
  // if chosen response and correct response not shown
  // update state to show correct response
  if (state.chosenResponse && !state.showCorrectResponse) {
    updateStateShowCorrectResponse(state, data);

  // if chosen response and correct response shown
  // update state for next step
  } else if (state.chosenResponse && state.showCorrectResponse) {
    updateStateNextStep(state);
  }
}

function updateStateOnQuestion(state, data, dom) {
  state.chosenResponse = getChosenResponse(state, dom) || null;
  state.responseChosen = state.chosenResponse !== null ? true : false;
  updateStateAlertToChooseResponse(state);
  handleStateCorrectResponse(state, data);
}

function updateState(state, data, dom) {
  var stepType = data.steps[state.currentStepNum].stepType;
  if (stepType === 'question') {
    updateStateOnQuestion(state, data, dom);
  } else {
    state.currentStepNum++;
  }
  console.log('state after update state:', state);
};

// RENDERING STATE ///////////////////////////////////////////////////////
function handleLayout(state, data, dom) {
  var stepType = data.steps[state.currentStepNum].stepType;
  var responseChoices = $('.js-responseChoices');
  if (stepType === 'question') responseChoices.show();
  else responseChoices.hide();
};

// allElements is all possible dom elements
// if content exists for that element fill it in
// if not remove the element
function renderStepContent(dom, stepContent) {
  var domContent = dom.domContent;
  var allElements = Object.keys(domContent);
  allElements.forEach(function(domElement) {
    if (stepContent[domElement]) {
      $(domContent[domElement]).html(stepContent[domElement]).show();
    } else {
      $(domContent[domElement]).html('').hide();
    }
  });
};

function renderChooseAlertResponse(state, data, dom) {
  if (state.alertToChooseResponse) {
    $(dom.message).html('Please Choose a Response');
  } else {
    $(dom.message).html('');
  }
};

function renderShowCorrectResponse() {
  //
};

function renderNextStep() {
  //
};

function handleRenderCorrectResponse() {
  
  renderNextStep();

  renderShowCorrectResponse();
};

function renderStateOnQuestion(state, data, dom) {
    // if a response has not been chosen
    // TODO: will be moved to proper place
    if (!state.responseChosen) $(dom.checkedRadioButton).prop('checked', false);

    renderChooseAlertResponse(state, data, dom);
    handleRenderCorrectResponse();
};

function renderState(state, data, dom) {
  console.log('in renderState');
  var step = data.steps[state.currentStepNum];
  var stepContent = step.content;
  if (step.stepType === 'question') {
    renderStateOnQuestion(state, data, dom);
  }
  renderStepContent(dom, stepContent);
};


// EVENT LISTENERS /////////////////////////////////////////////////////////
function handleButtonClick(dom) {
  $(dom.domContent.button).click(function(event) {
    event.preventDefault();
    console.log('state after button click:', state);

    updateState(state, data, dom);
    handleLayout(state, data, dom);
    renderState(state, data, dom);
  });
};

// keep event listeners and jquery object variables in jQuery ready function
$(function() {
  var dom = {
    domContent: {}
  };
  dom.checkedRadioButton = 'input[type=radio]:checked';
  dom.message = '.js-message';

  dom.domContent.stepName = '.js-stepName';
  dom.domContent.headline = '.js-headline';
  dom.domContent.button = '.js-button';
  dom.domContent.question = '.js-question';
  dom.domContent.responseChoice1 = '.js-responseChoice1';
  dom.domContent.responseChoice2 = '.js-responseChoice2';
  dom.domContent.responseChoice3 = '.js-responseChoice3';
  dom.domContent.responseChoice4 = '.js-responseChoice4';
  handleButtonClick(dom);
});