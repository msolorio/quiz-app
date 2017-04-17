// TODO: render score card on bottom
// TODO: add question counter on top

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
      correctResponseIndex: '0'
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
      correctResponseIndex: '0'
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
      correctResponseIndex: '0'
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
      correctResponseIndex: '0'
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
      correctResponseIndex: '0'
    },

    {
      stepType: 'end',
      content: {
        stepName: 'end',
        headline: 'Overall Score:',
        button: 'Start New Quiz'
      },
      lastStep: true
    }   
  ]
};

var state = {
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

// UPDATING STATE ///////////////////////////////////////////////////////

// if response not chosen update state to show alert to choose response
function updateStateAlertToChooseResponse(state) {
  if (!state.responseChosen) state.alertToChooseResponse = true;
  else state.alertToChooseResponse = false;
}

function incrementScoreCard(state, data) {
  var correctResponseIndex = data.steps[state.currentStepNum].correctResponseIndex;
  
  if (state.chosenResponse === correctResponseIndex.toString()) state.numOfCorrect++;
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
  // if current step is not last step
  // increment step
  if (state.currentStepNum < data.steps.length - 1) {
    state.currentStepNum++;
  // if it is last step set currentStepNum to 0 and reset state
  } else {
    state.currentStepNum = 0;
    state.currentQuestionNum = 0;
    state.numOfCorrect = 0;
    state.numOfIncorrect = 0;
  }
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
    state.currentQuestionNum++;
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
  }
  else {
    updateStateNextStep(state);
  }
};

// RENDERING STATE ///////////////////////////////////////////////////////
function handleLayout(state, data, dom) {
  var stepType = data.steps[state.currentStepNum].stepType;
  if (stepType === 'question') {
    $(dom.responseChoices).show();
    $(dom.scoreCard).show();
    $(dom.questionCounter).show();
  } else {
    $(dom.responseChoices).hide();
    $(dom.scoreCard).hide();
    $(dom.questionCounter).hide();
  }
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

function renderMessage(state, data, dom) {
  var correctResponseIndex = data.steps[state.currentStepNum].correctResponseIndex || '';
  var chosenResponseCorrect = state.chosenResponse === correctResponseIndex.toString();
  switch(true) {
    case (state.alertToChooseResponse):
      $(dom.message).html('Please Choose a Response');
      break;
    case (state.responseChosen && chosenResponseCorrect):
      $(dom.message).html('Response Correct');
      break;
    case (state.responseChosen && !chosenResponseCorrect):
      $(dom.message).html('Response Incorrect');
      break;
    default:
      $(dom.message).html('');
  }
};

function renderCorrectResponse(state, data, dom) {
  var correctResponseIndex = data.steps[state.currentStepNum].correctResponseIndex;
  if (state.showCorrectResponse) {
    $('.js-inputGroup[data-input-group="' + correctResponseIndex + '"]')
      .addClass('correctResponse');
  } else {
    $('.correctResponse').removeClass('correctResponse');
  }
};

function renderChosenResponse(state, data, dom) {
  var chosenResponseIndex = parseInt(state.chosenResponse);
  if (state.showCorrectResponse) {
    $('.js-inputGroup[data-input-group="' + chosenResponseIndex + '"]')
      .addClass('chosenResponse');
  } else {
    $('.chosenResponse').removeClass('chosenResponse');
  }
}

function renderCorrectResponseMessages(state, data, dom) {
  var correctResponseIndex = data.steps[state.currentStepNum].correctResponseIndex;
  if (state.showCorrectResponse) {
    $('.js-responseMessage[data-response-message="' + correctResponseIndex + '"]')
      .html('Correct Response');
  } else {
    $('.js-responseMessage').html('');
  }
};

function renderChosenResponseMessage(state, data, dom) {
  var chosenResponseIndex = parseInt(state.chosenResponse);
  if (state.showCorrectResponse) {
    $('.js-responseMessage[data-response-message="' + chosenResponseIndex + '"]')
      .html('Chosen Response');
  } else {
    $('.js-responseMessage').html('');
  }
};

function checkToRemoveRadioCheck(state, dom) {
  if (!state.responseChosen) $(dom.checkedRadioButton).prop('checked', false);
};

function renderQuestionCounter(state, data, dom) {
  // we add 1 b/c currentQuestionNum is indexed with zero index
  $(dom.currentQuestionNum).html(state.currentQuestionNum + 1);
  $(dom.totalQuestionNum).html(data.numOfQuestions);
};

function renderScoreCard(state, data, dom) {
  $(dom.numOfCorrect).html(state.numOfCorrect);
  $(dom.numOfIncorrect).html(state.numOfIncorrect);
};

function renderOverallScore(state, data, dom) {
  
  $(dom.domContent.headline)
    .append('<div class="overallScore">' + state.numOfCorrect +  '/' + data.numOfQuestions + '</div>');
};

function renderStateOnQuestion(state, data, dom) {
    renderChosenResponseMessage(state, data, dom);
    renderCorrectResponseMessages(state, data, dom);
    renderChosenResponse(state, data, dom);
    renderCorrectResponse(state, data, dom);
    checkToRemoveRadioCheck(state, dom);
    renderQuestionCounter(state, data, dom);
    renderScoreCard(state, data, dom);
};

function renderState(state, data, dom) {
  var step = data.steps[state.currentStepNum];
  var stepContent = step.content;
  renderStepContent(dom, stepContent);
  if (step.stepType === 'question') {
    renderStateOnQuestion(state, data, dom);
  } else if (step.stepType === 'end') {
    renderOverallScore(state, data, dom);
  }
  renderMessage(state, data, dom);
};


// EVENT LISTENERS /////////////////////////////////////////////////////////
function handleButtonClick(dom) {
  $(dom.domContent.button).click(function(event) {
    event.preventDefault();
    
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
  dom.responseMessage = '.js-responseMessage';
  dom.responseChoices = '.js-responseChoices';

  // score card
  dom.scoreCard = '.js-scoreCard';
  dom.numOfCorrect = '.js-numOfCorrect';
  dom.numOfIncorrect = '.js-numOfIncorrect';

  // question counter
  dom.questionCounter = '.js-questionCounter';
  dom.currentQuestionNum = '.js-currentQuestionNum';
  dom.totalQuestionNum = '.js-totalQuestionNum';

  // content that switches out from step to step
  dom.domContent.headline = '.js-headline';
  dom.domContent.button = '.js-button';
  dom.domContent.question = '.js-question';
  dom.domContent.responseChoice1 = '.js-responseChoice1';
  dom.domContent.responseChoice2 = '.js-responseChoice2';
  dom.domContent.responseChoice3 = '.js-responseChoice3';
  dom.domContent.responseChoice4 = '.js-responseChoice4';

  handleButtonClick(dom);
});