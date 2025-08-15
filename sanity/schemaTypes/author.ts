import {defineField,defineType} from 'sanity'
import { UserIcon } from 'lucide-react'

import {client} from '@/sanity/lib/client'

export const author = defineType({
    name:"author",
    title:"Author",
    type:"document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "id",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "email",
            type: "string",
            validation: (Rule) => Rule.email().required(),
        }),
        defineField({
            name: "image",
            type: "url"
        }),
        defineField({
            name: "bio",
            type: "text",
        }),
    ],
})