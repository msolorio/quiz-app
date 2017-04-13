// can get rid of stepName later - using for wiring up basic flow
var data = {
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
      correctResponse: 'response1'
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
      correctResponse: 'response1'
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
      correctResponse: 'response1'
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
      correctResponse: 'response1'
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
      correctResponse: 'response1'
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

var state = {
  currentStepNum: 0,
  chosenResponse: null,
  chosenResponseCorrect: null,
  numOfCorrect: 0,
  numOfIncorrect: 0
}

// CHECKING STATE ///////////////////////////////////////////////////////
function checkResponseValidity(state, stepData) {

}

function responseChosen(state) {
  return true;
}

// UPDATING STATE ///////////////////////////////////////////////////////
function updateState(state, data) {

  state.currentStepNum++;
  
};



// // RENDERING STATE ///////////////////////////////////////////////////////

// allElements is all possible dom elements
// if content exists for that element fill it in
// if not remove the element
function renderStepContent(dom, stepContent) {
  var allElements = Object.keys(dom);
  allElements.forEach(function(domElement) {
    if (stepContent[domElement]) {
      $(dom[domElement]).html(stepContent[domElement]).show();
    } else {
      $(dom[domElement]).html('').hide();
    }
  });
}

function renderState(state, data, dom) {
  var stepContent = data.steps[state.currentStepNum].content;
  renderStepContent(dom, stepContent);
};


// EVENT LISTENERS /////////////////////////////////////////////////////////
function handleButtonClick(dom) {
  dom.button.click(function(event) {
    event.preventDefault();
    console.log(state);

    updateState(state, data);
    renderState(state, data, dom);
  });
};

// keep event listeners and jquery object variables in jQuery ready function
$(function() {
  var dom = {};
  dom.stepName = $('.js-stepName');
  dom.headline = $('.js-headline');
  dom.button = $('.js-button');
  dom.question = $('.js-question');
  dom.responseChoice1 = $('.js-responseChoice1');
  dom.responseChoice2 = $('.js-responseChoice2');
  dom.responseChoice3 = $('.js-responseChoice3');
  dom.responseChoice4 = $('.js-responseChoice4');
  handleButtonClick(dom);
});