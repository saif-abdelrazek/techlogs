import "server-only";

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || 'bx';


import { defineLive } from "next-sanity";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({
    apiVersion
  }) 
});
