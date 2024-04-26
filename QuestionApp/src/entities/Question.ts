export default interface IQuestion {
    id: number
    question: string
    options: string[]
    correctOptionIndex: number
}

export default class Question implements IQuestion {
    id: number
    question: string
    options: string[]
    correctOptionIndex: number

    constructor(
        id: number,
        question: string,
        options: string[],
        correctOptionIndex: number
    ) {
        this.id = id
        this.question = question
        this.options = options
        this.correctOptionIndex = correctOptionIndex
    }
}