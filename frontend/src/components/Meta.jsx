import React from 'react'
import { Helmet } from 'react-helmet-async'
const Meta = ({title,description,keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps={
    title:'Injury Management System',
    description:'Injury Sports Management System',
    keywords:'injury, sports, ',
}

export default Meta