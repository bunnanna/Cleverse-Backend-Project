import { TNoembedDTO } from '../../dto'
import { TContentRepository } from '../../repositories/Content'
import { TCreateContentData } from '../../types'
import { BadRequest400Error, Forbidden403Error, NotFound404Error } from '../../utils/error'
import { Validatenum, Validatestr } from '../../utils/validator'
import { TContentService } from './Content.service.type'

export default class ContentService implements TContentService {
  constructor(private repo: TContentRepository) {}

  getAll: TContentService['getAll'] = () => {
    return this.repo.getAll()
  }

  getOne: TContentService['getOne'] = async (contentId) => {
    const content = await this.repo.getOne(new Validatenum(contentId, 'contentId').value())
    if (!content) throw new NotFound404Error('Content Not Found')
    return content
  }

  private getVideoData = async (videoUrl: string) => {
    const videoData: TNoembedDTO = await fetch(`https://noembed.com/embed?url=${videoUrl}`)
      .then((res) => res.json())
      .catch(() => {
        throw new BadRequest400Error('Can not find video.')
      })
    const { thumbnail_url, author_name, author_url, title } = videoData
    return {
      videoTitle: new Validatestr(title, 'videoTitle').notEmpty().value(),
      thumbnailUrl: new Validatestr(thumbnail_url, 'thumbnailUrl').notEmpty().value(),
      creatorName: new Validatestr(author_name, 'creatorName').notEmpty().value(),
      creatorUrl: new Validatestr(author_url, 'creatorUrl').notEmpty().value(),
    }
  }
  create: TContentService['create'] = async (createBody, credential) => {
    const { comment, rating, videoUrl } = createBody

    const validatedCreateBody = {
      comment: new Validatestr(comment, 'comment').value(),
      rating: new Validatenum(rating, 'rating').between(0, 5).value(),
      videoUrl: new Validatestr(videoUrl, 'videoUrl').notEmpty().value(),
    }
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
    const contentIdNum = new Validatenum(contentId).value()
    const content = await this.repo.getOne(contentIdNum)
    if (!content) throw new NotFound404Error('content not found')
    if (content.postBy.id !== credential.id) throw new Forbidden403Error('The content is not yours')
    const { comment, rating } = updateBody
    const updatedContent = await this.repo.update(contentIdNum, {
      comment: new Validatestr(comment, 'comment').value(),
      rating: new Validatenum(rating, 'rating').between(0, 5).value(),
    })
    return updatedContent
  }
  delete: TContentService['delete'] = async (contentId, credential) => {
    const validatedContentId = new Validatestr(contentId).length(1).toNum()
    const content = await this.repo.getOne(validatedContentId)
    if (!content) throw new NotFound404Error('content not found')
    if (content.postBy.id !== credential.id) throw new Forbidden403Error('The content is not yours')
    const deletedContent = await this.repo.delete(validatedContentId)
    return deletedContent
  }
}
