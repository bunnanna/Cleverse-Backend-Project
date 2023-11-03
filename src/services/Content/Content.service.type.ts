import { TContentDTO, TCreateContentDTO, TUpdateContentDTO } from '../../dto'
import { TCredential } from '../../types'

export type TContentService = {
  getAll: () => Promise<TContentDTO[]>
  getOne: (contentId: string) => Promise<TContentDTO>
  create: (createBody: TCreateContentDTO, credential: TCredential) => Promise<TContentDTO>
  update: (contentId: string, updateBody: TUpdateContentDTO, credential: TCredential) => Promise<TContentDTO>
  delete: (contentId: string, credential: TCredential) => Promise<TContentDTO>
}
