import IQuestion from '../entities/Question'

export default interface ILoadQuestionUsecase {
  questions: IQuestion[]
  execute(): void
}

export default class LoadQuestionUsecase implements ILoadQuestionUsecase {
  questions: IQuestion[] = []

  execute() {
    this.questions = this.generateQuestions().slice(1, 4)
  }

  private generateQuestions(): IQuestion[] {
    const questions: IQuestion[] = []

    for (let i = 1; i <= 20; i++) {
      const num1 = this.getRandomInt(1, 10)
      const num2 = this.getRandomInt(1, 10)
      const correctAnswer = num1 + num2

      const question: IQuestion = {
        id: i,
        question: `Question ${i}: What is ${num1} + ${num2}?`,
        options: [],
        correctOptionIndex: this.getRandomInt(0, 3)
      };

      // Generate options
      for (let j = 0; j < 4; j++) {
        if (j === question.correctOptionIndex) {
          question.options.push(correctAnswer.toString())
        } else {
          let incorrectAnswer
          do {
            incorrectAnswer = this.getRandomInt(1, 20) + this.getRandomInt(1, 20)
          } while (incorrectAnswer === correctAnswer)
          question.options.push(incorrectAnswer.toString())
        }
      }

      questions.push(question)
    }

    return questions;

  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}