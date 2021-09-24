import { enumType, objectType } from "nexus";

export const User = objectType({
    name: 'User',
    definition(t){
        t.int('id', {description:'Id of the user'})
        t.string('fullname',{description:'Full name of the user'})
        t.field('status', {type: StatusEnum})
    }
})

export const userPost = objectType({
    name: 'userPost',
    definition(t){
        t.int('id')
        t.string('title')
    }
})

export const StatusEnum = enumType({
    name: 'StatusEnum',
    members:{
        ACTIVE: 1,
        DISABLED: 2,
    }
})