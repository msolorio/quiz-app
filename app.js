// can get rid of stepName later - using for wiring up basic flow
var data = {
  steps: [
    {
      stepName: 'intro',
      stepType: 'intro',
      content: {
        headline: 'Take a Quiz on Circuits',
        button: 'Start Quiz'
      }
    },

    {
      stepName: 'question1',
      stepType: 'question',
      questionNum: 1,
      content: {
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
      stepName: 'question2',
      stepType: 'question',
      questionNum: 2,
      content: {
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
      stepName: 'question3',
      stepType: 'question',
      questionNum: 3,
      content: {
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
      stepName: 'question4',
      stepType: 'question',
      questionNum: 4,
      content: {
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
      stepName: 'question5',
      stepType: 'question',
      questionNum: 5,
      content: {
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
      stepName: 'end',
      stepType: 'end',
      content: {
        headline: 'Overall Score',
        button: 'Start New Quiz'
      }
    }   
  ]
}

var state = {
  currentStep: 0,
  chosenResponse: null,
  chosenResponseCorrect: null,
  numOfCorrect: 0,
  numOfIncorrect: 0,
  correctResponseShow: false
}
