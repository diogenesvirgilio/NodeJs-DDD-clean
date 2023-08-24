import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
    })

    it('Should be able to fetch paginated recent questions', async () => {
        for (let i =1; i<= 22; i++) {
            await inMemoryQuestionsRepository.create(makeQuestion())
    }
       const { questions } = await sut.execute({
        page: 2,
       })

        expect(questions).toHaveLength(2)
    })
 })
    
