import { enumType, objectType } from "nexus";

const User = objectType({
    name: 'User',
    definition(t){
        t.int('id', {description:'Id of the user'})
        t.string('fullname',{description:'Full name of the user'})
        t.field('status', {type: StatusEnum})
    }
})

const Post = objectType({
    name: 'Post',
    definition(t){
        t.int('id')
        t.string('title')
    }
})

const StatusEnum = enumType({
    name: 'StatusEnum',
    members:{
        ACTIVE: 1,
        DISABLED: 2,
    }
})