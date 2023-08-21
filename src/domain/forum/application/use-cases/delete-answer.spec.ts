import { makeAnswer } from "test/factories/make-answer"
import { DeleteAnswerUseCase } from "./delete-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repositories"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
    })

    it('Should be able to delete a Answer', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('Answer-1'))

        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            authorId: 'author-1',
            answerId: 'answer-1',
        })

        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })

    it('Should not be able to delete a Answer from another user', async () => {
        const newAnswer = makeAnswer(
          {
            authorId: new UniqueEntityID('author-1')
        }, 
        new UniqueEntityID('Answer-1'))

        await inMemoryAnswersRepository.create(newAnswer)

        expect(() => {
            return sut.execute({
                authorId: 'author-2',
                answerId: 'answer-1',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})