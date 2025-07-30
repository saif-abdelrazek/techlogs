import {defineField,defineType} from 'sanity'
import { UserIcon } from 'lucide-react'

export const project = defineType({
    name:"project",
    title:"Project",
    type:"document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "id",
            type: "number",
            readOnly: true,
        }),
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "name",
            }
        }),
        defineField({
            name: "author",
            type: "reference",
            to: [{ type: "author" }]
        }),
        defineField({
            name: "views",
            type: "number"
        }),
        defineField({
            name: "description",
            type: "text",
            validation: (Rule) => Rule.min(10).max(200).error("Description must be between 10 and 200 characters long.").required().error("Description is required."),
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(30).error("Category must be between 1 and 30 characters long.").required().error("Category is required."),
        }),
        defineField({
            name: "pitch",
            type: "markdown",
        }),
        
    ],
    preview: {
        select: {
            title: 'name',
        }
    }
})