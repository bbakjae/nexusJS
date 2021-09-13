// api/graphql/Post.ts
import { objectType, extendType, stringArg, nonNull, intArg } from 'nexus'

export const Post = objectType({
  name: 'Post',            // <- Name of your type
  definition(t) {
    t.int('id')            // <- Field named `id` of type `Int`
    t.string('title')      // <- Field named `title` of type `String`
    t.string('body')       // <- Field named `body` of type `String`
    t.boolean('published') // <- Field named `published` of type `Boolean`
  },
})
export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('drafts', {
      type: 'Post',
      resolve(_root, _args, ctx) {
        return ctx.db.post.findMany({ where: { published: false } })
      },
    })
    t.list.field('posts', {
      type: 'Post',
      resolve(_root, _args, ctx) {
        return ctx.db.post.findMany({ where: { published: true } })
      },
    })
  },
})
export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateTitle',{
      type: 'Post',
      args:{
        id: nonNull(intArg()),
        title: nonNull(stringArg()),
      },
      resolve(_root, _args, ctx) {
        return ctx.db.post.update({
           where: { 
             id: _args.id 
           },
           data:{
             title: _args.title 
           }
        })
      }
    })
    t.field('deleteDraft',{
      type: 'Post',
      args:{
        draftId: nonNull(intArg())
      },
      resolve(_root, _args, ctx) {
        return ctx.db.post.delete({
          where:{
            id: _args.draftId,
          }
        })
      }
    })
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        const draft = {
          title: args.title,
          body: args.body,
          published: false,
        }
        return ctx.db.post.create({ data: draft })
      },
    })
    t.field('publish', {
      type: 'Post',
      args: {
        draftId: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.post.update({
          where: {
            id: args.draftId
          },
          data: {
            published: true,
          },
        })
      },
    })
  },
})