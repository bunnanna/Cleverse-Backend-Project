import { Validatenum, Validatestr } from '../../configs/validator'
import { TCreateContentDTO, TNoembedDTO, TUpdateContentDTO } from '../../dto'

export const videoDataValidator = (videoData: TNoembedDTO) => {
  const { thumbnail_url, author_name, author_url, title } = videoData
  return {
    videoTitle: new Validatestr(title, 'videoTitle').notEmpty().value(),
    thumbnailUrl: new Validatestr(thumbnail_url, 'thumbnailUrl').notEmpty().value(),
    creatorName: new Validatestr(author_name, 'creatorName').notEmpty().value(),
    creatorUrl: new Validatestr(author_url, 'creatorUrl').notEmpty().value(),
  }
}

export const createContentValidator = (createContentBody: TCreateContentDTO) => {
  const { comment, rating, videoUrl } = createContentBody
  return {
    comment: new Validatestr(comment, 'comment').value(),
    rating: new Validatenum(rating, 'rating').between(0, 5).value(),
    videoUrl: new Validatestr(videoUrl, 'videoUrl').notEmpty().value(),
  }
}

export const contentIdValidator = (contentId: string): number => new Validatenum(contentId, 'contentId').value()

export const updateContentValidator = (updateContentBody: TUpdateContentDTO) => {
  const { comment, rating } = updateContentBody
  return {
    comment: new Validatestr(comment, 'comment').value(),
    rating: new Validatenum(rating, 'rating').between(0, 5).value(),
  }
}
