import {defineQuery} from "next-sanity"

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(_createdAt desc, _updatedAt desc, views desc) {
  _id,
  id,
  title,
  slug,
  author-> {
    name,
    image
  },
  views,
  description,
  image,
  category,
  pitch
}`)

export const MOST_VIEWED_PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(views desc) [0...5] {
  _id,
  id,
  title,
  slug,
  author-> {
    name,
    image
  },
  views,
  description,
  image,
  category,
  pitch
}`)




export const PROJECT_BY_ID_QUERY =
  defineQuery(`*[_type == "project" && id == $id][0]{
  _id,
  id, 
  title, 
  slug,
  _createdAt,
  author -> {
    id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  pitch,
}`);

export const PROJECT_VIEWS_QUERY = defineQuery(`
    *[_type == "project" && id == $id][0]{
      _id,
        id, views
    }
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const PROJECTS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "project" && author._ref == $id] | order(_createdAt desc) {
  _id,
  id, 
  title, 
  slug,
  _createdAt,
  author -> {
    id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  id,
  title,
  slug,
  select[]->{
    id,
    _createdAt,
    title,
    slug,
    author->{
      id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);