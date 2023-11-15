import { BadRequest400Error, Forbidden403Error, NotFound404Error } from '../../configs/error'
import { TNoembedDTO } from '../../dto'
import { TContentRepository } from '../../repositories/Content'
import { TCreateContentData } from '../../types'
import { ContentValidator } from '../../utils/Validator'

import { TContentService } from './Content.service.type'

export default class ContentService implements TContentService {
  private validator = new ContentValidator()
  constructor(private repo: TContentRepository) {}

  getAll: TContentService['getAll'] = () => {
    return this.repo.getAll()
  }

  getOne: TContentService['getOne'] = async (contentId) => {
    const content = await this.repo.getOne(this.validator.contentIdValidator(contentId))
    if (!content) throw new NotFound404Error('Content Not Found')
    return content
  }

  private getVideoData = async (videoUrl: string) => {
    const videoData: TNoembedDTO = await fetch(`https://noembed.com/embed?url=${videoUrl}`)
      .then((result) => result.json())
      .catch(() => {
        throw new BadRequest400Error('Can not find video.')
      })

    return this.validator.videoDataValidator(videoData)
  }

  create: TContentService['create'] = async (createBody, credential) => {
    const validatedCreateBody = this.validator.createContentValidator(createBody)
    const videoData = await this.getVideoData(validatedCreateBody.videoUrl).catch(() => {
      throw new NotFound404Error('Cannot get Video Data')
    })
    const CreateContentData: TCreateContentData = {
      ...validatedCreateBody,
      ownerId: credential.id,
      ...videoData,
    }

    const newContent = await this.repo.create(CreateContentData)
    return newContent
  }
  update: TContentService['update'] = async (contentId, updateBody, credential) => {
    const contentIdNum = this.validator.contentIdValidator(contentId)

    const content = await this.repo.getOne(contentIdNum)

    if (!content) throw new NotFound404Error('content not found')

    if (content.postedBy.id !== credential.id) throw new Forbidden403Error('The content is not yours')

    const updatedContent = await this.repo
      .update(contentIdNum, this.validator.updateContentValidator(updateBody))
      .catch(() => {
        throw new NotFound404Error('Can not update data')
      })
    return updatedContent
  }
  delete: TContentService['delete'] = async (contentId, credential) => {
    const validatedContentId = this.validator.contentIdValidator(contentId)
    const content = await this.repo.getOne(validatedContentId)
    if (!content) throw new NotFound404Error('content not found')
    if (content.postedBy.id !== credential.id) throw new Forbidden403Error('The content is not yours')
    const deletedContent = await this.repo.delete(validatedContentId).catch(() => {
      throw new NotFound404Error('Can not delete data')
    })
    return deletedContent
  }
}
