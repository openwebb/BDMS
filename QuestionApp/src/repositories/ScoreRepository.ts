import AsyncStorage from '@react-native-async-storage/async-storage'
import IScore from '../entities/Score'

const SCORES_KEY = 'SCORES_KEY'

export default interface IScoreRepository {
    loadScores(): Promise<IScore[]>
    storeScores(score: IScore): Promise<void>
}

export default class ScoreRepository implements IScoreRepository {
    async loadScores(): Promise<IScore[]> {
        const currentScores = await AsyncStorage.getItem(SCORES_KEY) ?? ''

        if (currentScores === '') { return [] }

        const parsedScores: IScore[] = JSON.parse(currentScores) ?? []

        return parsedScores
    }

    async storeScores(score: IScore): Promise<void> {
        const currentScores = await AsyncStorage.getItem(SCORES_KEY) ?? ''

        const parsedScores: IScore[] = JSON.parse(currentScores) ?? []
        parsedScores.push(score)

        const scores = JSON.stringify(parsedScores)

        await AsyncStorage.setItem(SCORES_KEY, scores)
    }
}