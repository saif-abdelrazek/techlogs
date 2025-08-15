import {defineField, defineType} from 'sanity'
import { UserIcon } from 'lucide-react'

export const project = defineType({
    name: "project",
    title: "Project",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required().min(3).max(100).error("Title must be between 3 and 100 characters long."),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "views",
            title: "Views",
            type: "number",
            initialValue: 0,
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: (Rule) => Rule.required().min(10).max(200).error("Description must be between 10 and 200 characters long."),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            validation: (Rule) => Rule.required().min(1).max(30).error("Category must be between 1 and 30 characters long."),
        }),
        defineField({
            name: "image",
            title: "Project Image",
            type: "url",
            validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }).error("Please provide a valid image URL"),
        }),
        defineField({
            name: "link",
            title: "Live Demo URL",
            type: "url",
            validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }).error("Please provide a valid demo URL"),
        }),
        defineField({
            name: "repository",
            title: "Repository URL",
            type: "url",
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).error("Please provide a valid repository URL"),
            description: "Link to the project's repository (optional)",
        }),
        defineField({
            name: "pitch",
            title: "Project Details",
            type: "markdown",
            description: "Detailed information about the project (optional)",
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category',
            media: 'image',
        }
    }
})