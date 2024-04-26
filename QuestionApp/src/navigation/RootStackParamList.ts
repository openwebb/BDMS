import IScore from "../entities/Score"

export type RootStackParamList = {
    Leaderboard: {
        playerName: string,
        scores: IScore[]
    },
    Questions: {
        playerName: string
    }
}