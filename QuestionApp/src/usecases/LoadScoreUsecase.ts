import IScore from "../entities/Score"
import IScoreRepository from "../repositories/ScoreRepository"
import ScoreRepository from "../repositories/ScoreRepository"

export default interface ILoadScoreUsecase {
    loadScores(): Promise<IScore[]>
}

export default class LoadScoreUsecase implements ILoadScoreUsecase {
    private scoreRepository: IScoreRepository

    constructor(scoreRepository: IScoreRepository = new ScoreRepository()) {
        this.scoreRepository = scoreRepository
    }

    async loadScores(): Promise<IScore[]> {
        const finalScores: IScore[] = [
            {
                player: 'John Doe',
                score: 10
            },
            {
                player: 'John Mock',
                score: 7
            }
        ].concat(
            await this.scoreRepository.loadScores()
        ).sort((a, b) => 
            b.score - a.score
        ).slice(0, 10)
        
        return finalScores
    }
}