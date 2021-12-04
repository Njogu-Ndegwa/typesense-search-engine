import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter'
import styles from '../styles/Home.module.css'
import {Hits, InstantSearch, SearchBox, Configure, Pagination, RefinementList, SortBy} from 'react-instantsearch-dom'

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: "T7TYEd2uSGfCwbuuZMbOzwwAau4xDFWB", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "zi70q1jl28rvwfebp-1.a1.typesense.net",
        port: "443",
        protocol: "https"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: "title,authors",
    queryByWeights: "4,1"
  }
});

interface Props {
  hit: any
}

export const Hit = ({hit}: Props) => {
  return (
    <div className="border" >
      <div className="p-4" >
      <Image src={hit.image_url} height={148} width={96} layout="responsive" />
      </div>
      <div className="bg-gray-50 border-t p-4" >
      <h3 className="truncate" >{hit.title}</h3>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div>
<InstantSearch indexName="books" searchClient={typesenseInstantsearchAdapter.searchClient} >
  <Configure hitsPerPage={9}/>
<div className="flex">
  <aside className="w-1/3 bg-gray-58 h-screen">
    <RefinementList 
    attribute = "authors"/>
  </aside>
  <main>
    <SearchBox/>
    <SortBy defaultRefinement="books"
    items={[
      {label:'Default', value:'books'},
      {label: 'Publication Year', value: 'books/sort/publication_year:asc'}
    ]}
    />
    <Hits hitComponent={Hit}/>
    <Pagination/>
  </main>
</div>
</InstantSearch>
    </div>
  )
}

export default Home
