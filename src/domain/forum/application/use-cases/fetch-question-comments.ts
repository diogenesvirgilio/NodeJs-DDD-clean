import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>
export class FetchQuestionCommentsUseCase {
  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentUseCaseRequest): Promise<FetchQuestionCommentUseCaseResponse> {
    const questionComments =
      await this.questionsCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
