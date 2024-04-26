export default interface IScore {
    player: string
    score: number
}

export default class Score implements IScore {
    player: string
    score: number

    constructor(player: string, score: number) {
        this.player = player
        this.score = score
    }
}