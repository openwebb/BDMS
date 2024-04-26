import React, { Component } from 'react'
import {
    Button,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import ILoadScoreUsecase from '../usecases/LoadScoreUsecase'
import LoadScoreUsecase from '../usecases/LoadScoreUsecase'
import IScore from '../entities/Score'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/RootStackParamList'

type LeaderboardScreenProps = NativeStackScreenProps<RootStackParamList, "Leaderboard">

type LeaderboardScreenState = {
    playerName: string
    scores: IScore[]
    refreshing: boolean
}

export interface LeaderboardScreenDelegate {
    refresh(): void
}

class LeaderboardScreen extends Component<LeaderboardScreenProps, LeaderboardScreenState> {
    private loadScoreUsecase: ILoadScoreUsecase
    
    constructor(props: LeaderboardScreenProps) {
        super(props)
        this.state = {
            playerName: '',
            scores: [],
            refreshing: false
        }

        this.loadScoreUsecase = new LoadScoreUsecase()
    }

    async componentDidMount(): Promise<void> {
        try {
            await this.fetchScores()
        } catch (error) {
            console.log(error)
        }
    }

    private async fetchScores() {
        this.setState({
            scores: await this.loadScoreUsecase.loadScores()
        })
    }

    private handlePlay() {
        const { playerName } = this.state
        this.props.navigation.push('Questions', { playerName })
    }

    private refresh() {
        this.setState({ refreshing: true }, async () => {
            try {
                await this.fetchScores()
            } catch (error) {
                console.log(error)
            } finally {
                this.setState({ refreshing: false })
            }
        })
    }

    render() {
        let { playerName, scores, refreshing } = this.state

        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => this.refresh()} />}
                >
                    <Text style={styles.title}>Pull to update scores!!!</Text>
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        data={scores}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text>{item.player}: {item.score}</Text>
                            </View>
                        )}
                    />
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={playerName}
                        onChangeText={(text) => this.setState({ playerName: text })}
                    />
                    <Button title="Play" onPress={() => this.handlePlay()} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    title: {
        fontSize: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    list: {
        width: '100%',
        marginBottom: 20,
    },
    listContent: {
        flexGrow: 1,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        marginBottom: 10,
    },
})

export default LeaderboardScreen
