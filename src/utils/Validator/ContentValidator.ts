import { Validatenum, Validatestr } from '../../configs/validator'
import { TCreateContentDTO, TNoembedDTO, TUpdateContentDTO } from '../../dto'
export class ContentValidator {
  private contentId = new Validatenum('contentId').notZero()
  private comment = new Validatestr('comment')
  private rating = new Validatenum('rating').between(0, 5)
  private videoUrl = new Validatestr('videoUrl').notEmpty()
  private videoTitle = new Validatestr('videoTitle').notEmpty()
  private thumbnailUrl = new Validatestr('thumbnailUrl').notEmpty()
  private creatorName = new Validatestr('creatorName').notEmpty()
  private creatorUrl = new Validatestr('creatorUrl').notEmpty()

  videoDataValidator = (videoData: TNoembedDTO) => {
    const { thumbnail_url, author_name, author_url, title } = videoData
    return {
      videoTitle: this.videoTitle.apply(title),
      thumbnailUrl: this.thumbnailUrl.apply(thumbnail_url),
      creatorName: this.creatorName.apply(author_name),
      creatorUrl: this.creatorUrl.apply(author_url),
    }
  }

  createContentValidator = (createContentBody: TCreateContentDTO) => {
    const { comment, rating, videoUrl } = createContentBody
    return {
      comment: this.comment.apply(comment),
      rating: this.rating.apply(rating),
      videoUrl: this.videoUrl.apply(videoUrl),
    }
  }

  contentIdValidator = (contentId: string): number => this.contentId.apply(contentId)

  updateContentValidator = (updateContentBody: TUpdateContentDTO) => {
    const { comment, rating } = updateContentBody
    return {
      comment: this.comment.apply(comment),
      rating: this.rating.apply(rating),
    }
  }
}
