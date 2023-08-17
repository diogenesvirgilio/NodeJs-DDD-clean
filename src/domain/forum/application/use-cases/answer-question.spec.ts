
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repositories";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
    })

    it('Should be able to Create an answer', async () => {
        const { answer } = await sut.execute({
            questionId: '1',
            instructorId: '1',
            content: 'Conteúdo da resposta'
        })

        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
    })
})
    