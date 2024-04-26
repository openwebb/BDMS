import Score from "../entities/Score"
import IScoreRepository from "../repositories/ScoreRepository"
import ScoreRepository from "../repositories/ScoreRepository"

export default interface IStoreScoreUsecase {
    storeScores(playerName: string, scores: number): void
}

export default class StoreScoreUsecase implements IStoreScoreUsecase {
    private scoreRepository: IScoreRepository

    constructor(scoreRepository: IScoreRepository = new ScoreRepository()) {
        this.scoreRepository = scoreRepository
    }

    async storeScores(player: string, scores: number) {
        const score = new Score(player, scores)
        await this.scoreRepository.storeScores(score)
    }
}