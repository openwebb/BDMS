import React, { Component } from 'react'
import { Text, View, Button, FlatList, RefreshControl, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import IQuestion from '../entities/Question'
import ILoadQuestionUsecase from '../usecases/LoadQuestionUsecase'
import LoadQuestionUsecase from '../usecases/LoadQuestionUsecase'
import IStoreScoreUsecase from '../usecases/StoreScoreUsecase'
import StoreScoreUsecase from '../usecases/StoreScoreUsecase'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/RootStackParamList'

type QuestionScreenProps = NativeStackScreenProps<RootStackParamList, "Questions">

type QuestionScreenState = {
    questions: IQuestion[]
    selectedOptions: number[]
}

export default class QuestionScreen extends Component<QuestionScreenProps, QuestionScreenState> {
    private loadQuestionUsecase: ILoadQuestionUsecase
    private storeScoreUsecase: IStoreScoreUsecase

    constructor(props: QuestionScreenProps) {
        super(props)
        this.state = {
            questions: [],
            selectedOptions: []
        }

        this.loadQuestionUsecase = new LoadQuestionUsecase()
        this.storeScoreUsecase = new StoreScoreUsecase()
    }

    componentDidMount() {
        this.loadQuestions()
    }

    private loadQuestions() {
        this.loadQuestionUsecase.execute()
        this.setState({
            questions: this.loadQuestionUsecase.questions
        })
    }

    private handleOptionSelect(index: number, questionIndex: number) {
        const { selectedOptions } = this.state
        const newSelectedOptions = [...selectedOptions]
        newSelectedOptions[questionIndex] = index
        this.setState({ selectedOptions: newSelectedOptions })
    }

    private async handleSubmit() {
        const { questions, selectedOptions } = this.state

        if (selectedOptions.length < questions.length) { return }

        const totalQuestions = questions.length
        let correctCount = 0

        for (let i = 0; i < totalQuestions; i++) {
            if (selectedOptions[i] === questions[i].correctOptionIndex) {
                correctCount++
            }
        }

        await this.storeScoreUsecase.storeScores(this.props.route.params.playerName, correctCount)

        Alert.alert(
            'Result',
            `Your score: ${correctCount} / ${totalQuestions}%`,
            [
                { text: 'OK', onPress: () => this.props.navigation.goBack() }
            ]
        )
    }

    private renderQuestionItem = ({ item, index }: { item: IQuestion; index: number }) => {
        const { selectedOptions } = this.state
    
        return (
          <View key={item.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            {item.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                style={[styles.optionButton, selectedOptions[index] === optionIndex ? styles.selectedOption : null]}
                onPress={() => this.handleOptionSelect(optionIndex, index)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )
      }
    
      render() {
        const { questions } = this.state
    
        return (
          <View style={styles.container}>
            <FlatList
              data={questions}
              renderItem={this.renderQuestionItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.contentContainer}
            />
            <View style={styles.submitButtonContainer}>
              <Button title="Submit" onPress={() => this.handleSubmit()} />
            </View>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: 60,
    },
    questionContainer: {
      marginBottom: 20,
    },
    questionText: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    optionButton: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 5,
      padding: 10,
      marginBottom: 5,
    },
    selectedOption: {
      backgroundColor: '#B2EBF2',
    },
    submitButtonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#CCCCCC',
    },
  })