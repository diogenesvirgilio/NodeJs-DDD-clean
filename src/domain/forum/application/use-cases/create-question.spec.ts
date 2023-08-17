import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('Should be able to Create a question', async () => {
        const { question } = await sut.execute({
            authorId: '1',
            title: 'New answer',
            content: 'Conteúdo da pergunta'
        })

        expect(question.id).toBeTruthy()
        expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
    })
})
    
