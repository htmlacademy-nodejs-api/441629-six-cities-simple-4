import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import CommentService from './comment.service.js';
import { CommentEntity, CommentModel } from './comment.entity.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<CommentServiceInterface>(AppComponentEnum.CommentServiceInterface)
    .to(CommentService)
    .inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(AppComponentEnum.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
