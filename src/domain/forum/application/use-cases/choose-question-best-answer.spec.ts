import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer"
import { makeAnswer } from "test/factories/make-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)
    })

    it('Should be able to choose the question best answer', async () => {
        const question = makeQuestion()

        const answer = makeAnswer({
            questionId: question.id,
        })
        
        await inMemoryAnswersRepository.create(answer)
        await inMemoryQuestionsRepository.create(question)

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString(),
        })

        expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
    })

    it('Should not be able to choose another user best answer', async () => {
        
        const question = makeQuestion()

        const answer = makeAnswer({
            questionId: question.id,
        })
        
        await inMemoryAnswersRepository.create(answer)
        await inMemoryQuestionsRepository.create(question)

        expect(() => {
            return sut.execute({
                answerId: answer.id.toString(),
                authorId: 'author-2',
            })
        }).rejects.toBeInstanceOf(Error)
    })

    
})