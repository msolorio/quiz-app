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
        responseChoices: [
          'response1',
          'response2',
          'response3',
          'response4'
        ],
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
        responseChoices: [
          'response1',
          'response2',
          'response3',
          'response4'
        ],
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
        responseChoices: [
          'response1',
          'response2',
          'response3',
          'response4'
        ],
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
        responseChoices: [
          'response1',
          'response2',
          'response3',
          'response4'
        ],
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
        responseChoices: [
          'response1',
          'response2',
          'response3',
          'response4'
        ],
        button: 'Submit'
      },
      correctResponse: 'response1'
    },

    {
      stepType: 'end',
      content: {
        stepName: 'end',
        headline: 'Overall Score',
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
  console.log(state);
};

// RENDERING STATE ///////////////////////////////////////////////////////
function renderState(state, data, dom) {
  var stepContent = data.steps[state.currentStepNum].content;
  var stepName = stepContent.stepName;
  var button = stepContent.button;

  dom.stepName.text(stepName);
  dom.button.html(button);
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
  dom.button = $('.js-button');

  handleButtonClick(dom);
});